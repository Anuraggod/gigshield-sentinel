/* ════════════════════════════════════════
   ParaProtect — GigShield Sentinel Phase 2
   Full Application Logic
════════════════════════════════════════ */

let worker = {};
let policy = {};
let claims = [];
let premiumHistory = [];
let policyPaused = false;

/* ── NAVIGATION ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById('page-' + id).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // show how section inside home
  if (id === 'how') {
    document.getElementById('page-home').classList.remove('hidden');
    document.getElementById('page-how').style.display = 'block';
  } else if (id === 'home') {
    document.getElementById('page-how').style.display = 'none';
  }
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(tabId).classList.remove('hidden');
  const idx = ['tab-policy','tab-triggers','tab-claims','tab-premium'].indexOf(tabId);
  document.querySelectorAll('.tab')[idx].classList.add('active');

  if (tabId === 'tab-triggers') renderTriggerCards();
  if (tabId === 'tab-premium') renderPremiumHistory();
}

/* ── CITY / ZONE DATA ── */
const cityData = {
  Chennai:   { risk: 'High',     riskPct: 84, riskScore: 1.8, season: 'Cyclone Season (Oct–Dec)' },
  Delhi:     { risk: 'High',     riskPct: 76, riskScore: 1.6, season: 'Smog Season (Nov–Jan)' },
  Bengaluru: { risk: 'Moderate', riskPct: 48, riskScore: 1.2, season: 'Stable Year-Round' },
  Mumbai:    { risk: 'High',     riskPct: 70, riskScore: 1.5, season: 'Monsoon Season (Jun–Sep)' },
  Hyderabad: { risk: 'Moderate', riskPct: 55, riskScore: 1.3, season: 'Hot Season (Mar–Jun)' }
};

const platformFactors = { Zomato:55, Swiggy:55, Zepto:45, Amazon:40, Dunzo:40 };

const zoneHistory = {
  North:   { flood:'Moderate', bandh:'Low',    pollution:'Low' },
  South:   { flood:'High',     bandh:'Low',    pollution:'Moderate' },
  East:    { flood:'High',     bandh:'Moderate',pollution:'High' },
  West:    { flood:'Low',      bandh:'Low',    pollution:'Moderate' },
  Central: { flood:'Moderate', bandh:'High',   pollution:'High' }
};

function badgeClass(level) {
  if (level === 'High') return 'high';
  if (level === 'Moderate') return 'med';
  return 'low';
}

/* ── REGISTRATION ── */
function registerWorker() {
  const name    = document.getElementById('r-name').value.trim();
  const mobile  = document.getElementById('r-mobile').value.trim();
  const upi     = document.getElementById('r-upi').value.trim();
  const aadhaar = document.getElementById('r-aadhaar').value.trim();
  const platform= document.getElementById('r-platform').value;
  const city    = document.getElementById('r-city').value;
  const zone    = document.getElementById('r-zone').value;
  const vehicle = document.getElementById('r-vehicle').value;
  const income  = parseFloat(document.getElementById('r-income').value);
  const days    = document.getElementById('r-days').value;
  const consent = document.getElementById('r-consent').checked;

  if (!name||!mobile||!upi||!aadhaar||!platform||!city||!zone||!vehicle||!income||!days) {
    alert('Please fill in all fields before continuing.'); return;
  }
  if (aadhaar.length !== 4 || isNaN(Number(aadhaar))) {
    alert('Please enter the last 4 digits of your Aadhaar.'); return;
  }
  if (!consent) {
    alert('Please accept the terms to continue.'); return;
  }

  worker = { name, mobile, upi, aadhaar, platform, city, zone, vehicle, income, days: parseInt(days) };
  buildPremiumQuote();
  showPage('premium');
}

/* ── PREMIUM CALCULATION (ML Model) ── */
function buildPremiumQuote() {
  const cd = cityData[worker.city];
  const pf = platformFactors[worker.platform] || 40;
  const zh = zoneHistory[worker.zone] || { flood:'Moderate', bandh:'Moderate', pollution:'Moderate' };

  // ML hyper-local adjustments
  let mlAdj = 0;
  let mlNotes = [];

  if (zh.flood === 'Low') { mlAdj -= 2; mlNotes.push('₹2 reduction — zone has low historical flood risk'); }
  if (zh.flood === 'High') { mlAdj += 3; mlNotes.push('₹3 increase — zone has high flood history'); }
  if (zh.pollution === 'High') { mlAdj += 2; mlNotes.push('₹2 increase — zone has high pollution exposure'); }
  if (zh.bandh === 'High') { mlAdj += 2; mlNotes.push('₹2 increase — zone has high bandh frequency'); }
  if (worker.days <= 4) { mlAdj -= 3; mlNotes.push('₹3 reduction — part-time worker adjustment'); }
  if (worker.vehicle === 'Bicycle' || worker.vehicle === 'E-Bike') { mlAdj -= 2; mlNotes.push('₹2 reduction — low-emission vehicle discount'); }

  const baseCalc = Math.round((worker.income * cd.riskScore * 0.02) + pf);
  const premium = Math.max(baseCalc + mlAdj, 30);
  const maxPayout = Math.round((worker.income / 7) * 0.8 * 5);
  const pct = ((premium / worker.income) * 100).toFixed(1);

  worker.premium = premium;
  worker.maxPayout = maxPayout;
  worker.mlNotes = mlNotes;
  worker.mlAdj = mlAdj;
  worker.baseCalc = baseCalc;

  // Render quote
  document.getElementById('q-amount').textContent = `₹${premium}`;
  document.getElementById('q-pct').textContent = `${pct}% of your weekly income`;

  document.getElementById('q-summary').textContent =
    `${worker.name} — ${worker.platform} delivery partner in ${worker.city} (${worker.zone} zone) — ${worker.days} days/week — ${worker.vehicle}`;

  document.getElementById('q-coverage').textContent =
    `Maximum payout: ₹${maxPayout} per trigger event (80% of daily income × up to 5 days). Payouts go instantly to ${worker.upi}.`;

  document.getElementById('q-ml').textContent =
    mlNotes.length > 0 ? mlNotes.join(' · ') : 'No hyper-local adjustments applied for this profile.';

  // Risk meter
  document.getElementById('q-risk-meter').innerHTML = `
    <div class="risk-row"><span>City Risk Level</span><span style="color:var(--accent);font-weight:600">${cd.risk}</span></div>
    <div class="risk-bar-wrap"><div class="risk-bar-fill" style="width:${cd.riskPct}%"></div></div>
    <div class="risk-row"><span>Season</span><span>${cd.season}</span></div>
    <div class="risk-row"><span>Risk Score</span><span>${cd.riskScore}×</span></div>
    <div class="risk-row"><span>Platform</span><span>${worker.platform}</span></div>
  `;

  // Breakdown
  document.getElementById('q-breakdown').innerHTML = `
    <div class="brow"><span>Base income rate (2%)</span><span>₹${Math.round(worker.income * 0.02)}</span></div>
    <div class="brow"><span>City risk multiplier (${cd.riskScore}×)</span><span>₹${Math.round(worker.income * 0.02 * cd.riskScore)}</span></div>
    <div class="brow"><span>Platform adjustment</span><span>₹${pf}</span></div>
    <div class="brow"><span>ML hyper-local adjustment</span><span>${mlAdj >= 0 ? '+' : ''}₹${mlAdj}</span></div>
    <div class="brow"><span>Final weekly premium</span><span>₹${premium}</span></div>
  `;

  // Zone history
  const zh2 = zoneHistory[worker.zone];
  document.getElementById('q-zone-history').innerHTML = `
    <div class="zone-row"><span>Flood history</span><span class="zbadge ${badgeClass(zh2.flood)}">${zh2.flood}</span></div>
    <div class="zone-row"><span>Bandh frequency</span><span class="zbadge ${badgeClass(zh2.bandh)}">${zh2.bandh}</span></div>
    <div class="zone-row"><span>Pollution exposure</span><span class="zbadge ${badgeClass(zh2.pollution)}">${zh2.pollution}</span></div>
  `;
}

/* ── POLICY ACTIVATION ── */
function activatePolicy() {
  const now = new Date();
  const policyId = 'PP-' + Math.random().toString(36).substr(2,8).toUpperCase();

  policy = {
    id: policyId,
    status: 'Active',
    start: now.toLocaleDateString('en-IN'),
    nextBilling: new Date(now.getTime() + 7*24*60*60*1000).toLocaleDateString('en-IN'),
    premium: worker.premium,
    maxPayout: worker.maxPayout
  };

  // Generate 4 weeks of premium history
  premiumHistory = [];
  for (let i = 3; i >= 0; i--) {
    const d = new Date(now.getTime() - i*7*24*60*60*1000);
    const adj = i === 0 ? worker.mlAdj : Math.round((Math.random() - 0.5) * 4);
    const base = worker.baseCalc;
    const final = Math.max(base + adj, 30);
    premiumHistory.push({
      week: `Week of ${d.toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}`,
      base: base,
      adj: adj,
      final: final,
      status: 'Paid'
    });
  }

  renderDashboard();
  document.getElementById('nav-dashboard').style.display = 'block';
  showPage('dashboard');
  switchTab('tab-policy');
}

/* ── DASHBOARD RENDER ── */
function renderDashboard() {
  document.getElementById('dash-welcome').textContent =
    `Welcome, ${worker.name} — ${worker.platform} partner in ${worker.city} (${worker.zone} zone)`;

  document.getElementById('dash-stats').innerHTML = `
    <div class="stat-card green">
      <div class="sc-top"><span>Policy Status</span><span class="badge-active">Active</span></div>
      <div class="sc-val">${policy.id}</div>
      <div class="sc-sub">Since ${policy.start}</div>
    </div>
    <div class="stat-card">
      <div class="sc-top"><span>Weekly Premium</span></div>
      <div class="sc-val">₹${worker.premium}</div>
      <div class="sc-sub">Next billing: ${policy.nextBilling}</div>
    </div>
    <div class="stat-card">
      <div class="sc-top"><span>Max Payout / Event</span></div>
      <div class="sc-val">₹${worker.maxPayout}</div>
      <div class="sc-sub">80% income × 5 days</div>
    </div>
    <div class="stat-card">
      <div class="sc-top"><span>Claims Paid</span></div>
      <div class="sc-val">${claims.length}</div>
      <div class="sc-sub">Total: ₹${claims.reduce((s,c)=>s+c.amount,0)}</div>
    </div>
  `;

  document.getElementById('policy-details').innerHTML = `
    <div class="pd-row"><span>Policy ID</span><span>${policy.id}</span></div>
    <div class="pd-row"><span>Worker</span><span>${worker.name}</span></div>
    <div class="pd-row"><span>Platform</span><span>${worker.platform}</span></div>
    <div class="pd-row"><span>City & Zone</span><span>${worker.city} — ${worker.zone}</span></div>
    <div class="pd-row"><span>UPI Account</span><span>${worker.upi}</span></div>
    <div class="pd-row"><span>Weekly Premium</span><span>₹${worker.premium}</span></div>
    <div class="pd-row"><span>Max Payout/Event</span><span>₹${worker.maxPayout}</span></div>
    <div class="pd-row"><span>Policy Start</span><span>${policy.start}</span></div>
    <div class="pd-row"><span>Next Billing</span><span>${policy.nextBilling}</span></div>
    <div class="pd-row"><span>Status</span><span style="color:var(--green);font-weight:700">${policy.status}</span></div>
  `;
}

/* ── TRIGGER MONITOR ── */
const triggerDefs = [
  { id:'rain',   icon:'&#9928;', name:'Cyclone/Rain',  desc:'Rainfall > 60mm/hr',  source:'IMD + OpenWeatherMap' },
  { id:'aqi',    icon:'&#9729;', name:'Air Pollution', desc:'AQI > 400 for 6hrs',  source:'CPCB AQI API' },
  { id:'bandh',  icon:'&#128683;',name:'Govt Shutdown', desc:'Confirmed bandh/curfew',source:'State Govt + News NLP' },
  { id:'flood',  icon:'&#127754;',name:'Flooding',      desc:'Alert Level 3+',      source:'IMD + Satellite' },
  { id:'heat',   icon:'&#9728;', name:'Heatwave',      desc:'45°C+ for 2 days',    source:'IMD API' }
];

let activeTrigger = null;

function renderTriggerCards(active) {
  document.getElementById('trigger-city-msg').textContent =
    `Monitoring ${worker.city || 'your city'} — ${worker.zone || ''} zone — across 5 independent data sources`;

  document.getElementById('trigger-cards').innerHTML = triggerDefs.map(t => `
    <div class="tc ${active === t.id ? 'active-trigger' : ''}">
      <div class="tc-icon">${t.icon}</div>
      <div class="tc-name">${t.name}</div>
      <div class="tc-status ${active === t.id ? 'alert' : ''}">${active === t.id ? '⚠ TRIGGERED' : 'Monitoring'}</div>
      <div class="tc-val">${t.source}</div>
    </div>
  `).join('');
}

/* ── SIMULATE TRIGGER ── */
function simulateTrigger() {
  if (policyPaused) { alert('Your policy is currently paused. Resume it to receive payouts.'); return; }

  const triggers = [
    {
      id:'rain', type:'Cyclone Warning',
      detail:`Sustained rainfall above 60mm/hr detected in ${worker.city}. Validated across IMD API and OpenWeatherMap. Multi-source confidence: 94%.`,
      days:2
    },
    {
      id:'aqi', type:'Severe Air Pollution',
      detail:`AQI in ${worker.city} exceeded 400 for more than 6 consecutive hours. Validated via CPCB AQI API and state pollution board. Confidence: 97%.`,
      days:1
    },
    {
      id:'bandh', type:'Government Shutdown — Bandh',
      detail:`Bandh declared in ${worker.city}. Validated via state govt feed and NLP scan of verified news sources and official social media. Confidence: 91%.`,
      days:1
    },
    {
      id:'flood', type:'Flood Alert Level 3',
      detail:`Flood alert Level 3 issued for ${worker.city}. Validated via IMD flood bulletin and satellite inundation data. Confidence: 96%.`,
      days:2
    },
    {
      id:'heat', type:'Heatwave',
      detail:`Temperature exceeded 45°C for 2 consecutive days in ${worker.city}. Validated via IMD API and regional weather stations. Confidence: 99%.`,
      days:1
    }
  ];

  const t = triggers[Math.floor(Math.random() * triggers.length)];
  const dailyIncome = Math.round(worker.income / 7);
  const payout = Math.round(dailyIncome * t.days * 0.8);

  activeTrigger = t.id;
  switchTab('tab-triggers');
  renderTriggerCards(t.id);

  document.getElementById('proc-city').textContent = `${t.type} — ${worker.city} — ${worker.zone} Zone`;

  showPage('processing');

  const steps = [
    { txt:'Fetching primary data source...', ok:false },
    { txt:'Cross-referencing secondary source...', ok:false },
    { txt:'Running NLP corroboration on news feeds...', ok:false },
    { txt:'Sentinel: GPS vs network tower check — passed', ok:true },
    { txt:'Sentinel: Platform session data verified — passed', ok:true },
    { txt:'Sentinel: Behavioural analysis — no anomalies', ok:true },
    { txt:'Sentinel: Coordinated ring scan — clear', ok:true },
    { txt:'Fraud risk score: LOW — auto-approving claim...', ok:true },
    { txt:'Initiating UPI payout to ' + worker.upi, ok:true }
  ];

  const log = document.getElementById('proc-log');
  log.innerHTML = '';

  steps.forEach((s, i) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'proc-entry' + (s.ok ? ' ok' : '');
      el.textContent = (s.ok ? '✓ ' : '→ ') + s.txt;
      log.appendChild(el);
    }, i * 550);
  });

  setTimeout(() => {
    // Build claim record
    const claim = {
      id: 'CLM-' + Math.random().toString(36).substr(2,6).toUpperCase(),
      type: t.type,
      date: new Date().toLocaleDateString('en-IN'),
      days: t.days,
      dailyIncome,
      amount: payout,
      status: 'Paid',
      upi: worker.upi
    };
    claims.push(claim);

    // Fill claim result page
    document.getElementById('cp-trigger').textContent = t.detail;
    document.getElementById('cp-fraud').textContent =
      `GPS coordinates matched network tower triangulation. Platform delivery session confirmed in ${worker.city} prior to event. Behavioural pattern normal. Coordinated ring scan: clear. Fraud score: Low. Auto-approved.`;
    document.getElementById('cp-breakdown').textContent =
      `Trigger: ${t.type} · Duration: ${t.days} day(s) · Daily income: ₹${dailyIncome} · Rate: 80% · Total: ₹${dailyIncome} × ${t.days} × 0.8 = ₹${payout}`;
    document.getElementById('cp-payout-amount').textContent = `₹${payout}`;
    document.getElementById('cp-payout-detail').textContent =
      `Credited instantly to ${worker.upi}. SMS sent to ${worker.mobile}. Claim ID: ${claim.id}. No action was required from you.`;

    renderDashboard();
    renderClaimsList();
    showPage('claim');
  }, steps.length * 550 + 400);
}

/* ── CLAIMS LIST ── */
function renderClaimsList() {
  const el = document.getElementById('claims-list');
  if (claims.length === 0) {
    el.innerHTML = '<div class="empty-state">No claims yet. ParaProtect is actively monitoring your city. When a trigger event is validated, a claim will appear here automatically.</div>';
    return;
  }
  el.innerHTML = claims.slice().reverse().map(c => `
    <div class="claim-item paid">
      <div class="ci-left">
        <div class="ci-type">${c.type}</div>
        <div class="ci-detail">Claim ID: ${c.id} · ${c.date} · ${c.days} day(s) · ₹${c.dailyIncome}/day × 80% · Paid to ${c.upi}</div>
      </div>
      <div class="ci-right">
        <div class="ci-amount">₹${c.amount}</div>
        <div class="ci-status">Paid</div>
      </div>
    </div>
  `).join('');
}

/* ── PREMIUM HISTORY ── */
function renderPremiumHistory() {
  if (premiumHistory.length === 0) return;
  document.getElementById('premium-history-table').innerHTML = `
    <table class="ph-table">
      <thead>
        <tr>
          <th>Week</th>
          <th>Base Premium</th>
          <th>ML Adjustment</th>
          <th>Final Premium</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${premiumHistory.map(r => `
          <tr>
            <td>${r.week}</td>
            <td>₹${r.base}</td>
            <td>${r.adj >= 0 ? '+' : ''}₹${r.adj}</td>
            <td>₹${r.final}</td>
            <td style="color:var(--green)">${r.status}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

/* ── POLICY ACTIONS ── */
function pausePolicy() {
  policyPaused = true;
  policy.status = 'Paused';
  document.getElementById('action-msg').textContent = 'Policy paused. No premiums will be collected and no claims will be processed until you resume.';
  renderDashboard();
}

function upgradePolicy() {
  worker.premium = worker.premium + 20;
  worker.maxPayout = Math.round(worker.maxPayout * 1.25);
  policy.status = 'Active — Enhanced Coverage';
  document.getElementById('action-msg').textContent = `Coverage upgraded. New premium: ₹${worker.premium}/week. New max payout: ₹${worker.maxPayout} per event.`;
  renderDashboard();
}

function cancelPolicy() {
  if (confirm('Are you sure you want to cancel your ParaProtect policy? Your coverage will end immediately.')) {
    policy.status = 'Cancelled';
    document.getElementById('action-msg').textContent = 'Policy cancelled. You are no longer covered. Re-register at any time.';
    renderDashboard();
  }
}

/* ── INIT ── */
showPage('home');