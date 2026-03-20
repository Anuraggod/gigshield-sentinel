let workerData = {};

function showSection(id) {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  window.scrollTo(0, 0);
}

function calculatePremium() {
  const name = document.getElementById('name').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const upi = document.getElementById('upi').value.trim();
  const platform = document.getElementById('platform').value;
  const city = document.getElementById('city').value;
  const income = parseFloat(document.getElementById('income').value);

  if (!name || !mobile || !upi || !platform || !city || !income) {
    alert('Please fill in all fields before continuing.');
    return;
  }

  const riskScores = {
    Chennai: 1.8,
    Delhi: 1.6,
    Bengaluru: 1.2,
    Mumbai: 1.5,
    Hyderabad: 1.3
  };

  const platformFactors = {
    Zomato: 55,
    Swiggy: 55,
    Zepto: 45,
    Amazon: 40,
    Dunzo: 40
  };

  const baseRate = 0.02;
  const riskScore = riskScores[city] || 1.3;
  const platformFactor = platformFactors[platform] || 40;
  const premium = Math.round((income * riskScore * baseRate) + platformFactor);
  const maxPayout = Math.round((income / 7) * 0.8 * 5);

  workerData = { name, mobile, upi, platform, city, income, premium, maxPayout };

  document.getElementById('worker-summary').textContent =
    `Hi ${name}, your premium has been calculated based on your profile as a ${platform} delivery partner in ${city} with an average weekly income of Rs. ${income}.`;

  document.getElementById('premium-amount').textContent = `Rs. ${premium} / week`;

  document.getElementById('coverage-summary').textContent =
    `You are covered for up to Rs. ${maxPayout} per trigger event, capped at 5 trigger days. Your premium is ${((premium / income) * 100).toFixed(1)}% of your weekly income.`;

  showSection('premium');
}

function activatePolicy() {
  document.getElementById('policy-status').textContent =
    `Active for ${workerData.name} — ${workerData.platform} partner in ${workerData.city} — Premium of Rs. ${workerData.premium} per week`;

  document.getElementById('dashboard-coverage').textContent =
    `Maximum payout: Rs. ${workerData.maxPayout} per trigger event. UPI account ${workerData.upi} is registered for instant payouts.`;

  showSection('dashboard');
}

function simulateTrigger() {
  const triggers = [
    {
      type: 'Cyclone Warning',
      source: 'IMD API and OpenWeatherMap',
      detail: `Sustained rainfall above 60mm per hour has been detected in ${workerData.city}. The trigger has been validated across IMD API, OpenWeatherMap, and satellite wind data. Confidence score: 94%.`,
      days: 2
    },
    {
      type: 'Severe Air Pollution Event',
      source: 'CPCB AQI API and State Pollution Board',
      detail: `The Air Quality Index in ${workerData.city} has exceeded 400 for more than 6 consecutive hours. Trigger validated across CPCB AQI API and state pollution board feeds. Confidence score: 97%.`,
      days: 1
    },
    {
      type: 'Government Shutdown — Bandh',
      source: 'State Government Feed and Verified News APIs',
      detail: `A government-mandated bandh has been declared in ${workerData.city}. Trigger corroborated via state government notification feed, NLP scan of verified news sources, and official social media. Confidence score: 91%.`,
      days: 1
    }
  ];

  const trigger = triggers[Math.floor(Math.random() * triggers.length)];
  const dailyIncome = Math.round(workerData.income / 7);
  const payout = Math.round(dailyIncome * trigger.days * 0.8);

  document.getElementById('trigger-status').textContent = `Active Trigger Detected in ${workerData.city}`;
  document.getElementById('trigger-result').innerHTML =
    `<p style="color:#e53e3e; font-weight:bold; margin-top:8px; font-size:14px;">${trigger.type} — Validated via ${trigger.source}</p>`;

  showSection('processing');

  let steps = ['Fetching data from primary source...', 'Cross-referencing secondary source...', 'Running NLP corroboration...', 'Fraud check in progress...', 'Claim approved. Initiating payout...'];
  let i = 0;
  const interval = setInterval(() => {
    if (i < steps.length) {
      document.getElementById('processing-steps').textContent = steps[i];
      i++;
    } else {
      clearInterval(interval);

      document.getElementById('claim-trigger-detail').textContent = trigger.detail;

      document.getElementById('fraud-check-detail').textContent =
        `GPS coordinates matched network tower triangulation. Platform delivery session data confirmed activity in ${workerData.city} prior to trigger. Behavioural pattern analysis passed. No anomalies detected. Fraud risk score: Low. Claim auto-approved.`;

      document.getElementById('claim-detail').textContent =
        `Trigger Type: ${trigger.type}. Duration: ${trigger.days} day(s). Verified Daily Income: Rs. ${dailyIncome}. Coverage: 80% of daily income x ${trigger.days} day(s). Total Claim Value: Rs. ${payout}.`;

      document.getElementById('payout-detail').textContent =
        `Rs. ${payout} has been credited instantly to ${workerData.upi}. A confirmation SMS has been sent to ${workerData.mobile}. No action was required from you at any point.`;

      document.getElementById('claim-history').textContent =
        `1 claim processed — ${trigger.type} — Rs. ${payout} paid to ${workerData.upi}`;

      showSection('claim');
    }
  }, 600);
}