# ParaProtect
### AI-Powered Parametric Insurance for India's Gig Economy

**Guidewire DEVTrails University Hackathon — Phase 2 Submission**
Submission Date: April 4, 2026

---

## Table of Contents

1. [The Problem](#the-problem)
2. [What We Built](#what-we-built)
3. [Persona-Based Scenarios and Application Workflow](#persona-based-scenarios-and-application-workflow)
4. [Weekly Premium Model and Parametric Triggers](#weekly-premium-model-and-parametric-triggers)
5. [Platform Justification](#platform-justification)
6. [AI/ML Integration](#aiml-integration)
7. [Adversarial Defense and Anti-Spoofing Strategy](#adversarial-defense-and-anti-spoofing-strategy)
8. [Tech Stack](#tech-stack)
9. [How to Run the Application](#how-to-run-the-application)
10. [Current Implementation Status](#current-implementation-status)
11. [Development Plan](#development-plan)
12. [Why ParaProtect Matters](#why-paraprotect-matters)

---

## The Problem

Gig delivery workers in India — working for platforms like Zomato, Swiggy, Zepto, Amazon, and Dunzo — represent one of the world's fastest-growing digital workforces. Yet when disruptions strike, they are left completely exposed.

Natural disasters, extreme pollution events, and government-mandated shutdowns can wipe out 20 to 30 percent of a worker's monthly income overnight. There is no safety net, no insurance coverage, and no recourse. Workers bear all the risk with zero protection.

---

## What We Built

ParaProtect is a fully functional web application providing parametric insurance for gig delivery workers in India. It eliminates traditional claims processes through an AI-enabled, automated system that pays out instantly when validated trigger events occur.

**Current Implementation Features:**
- Interactive web interface with modern dark theme UI
- Real-time premium calculation based on worker profile and risk factors
- Dynamic risk assessment using city data and platform factors
- Automated claim simulation with fraud detection checks
- Dashboard for policy management and claims history
- Responsive design optimized for mobile and desktop

**Key Functionality:**
- Worker registration with profile-based premium calculation
- Real-time monitoring simulation for 5 trigger types (cyclone, pollution, shutdown, flood, heatwave)
- Instant UPI payout simulation upon validated triggers
- Policy management (pause, upgrade, cancel)
- Claims history and premium payment tracking

Rather than filing documentation after an event, ParaProtect:
- Monitors real-time triggers including weather events, pollution levels, social incidents, and government shutdowns
- Automatically generates claims upon validated occurrence of an insured trigger
- Pays out instantly via UPI — no paper claims, no processing delays
- Calculates and collects premiums on a weekly basis, aligned with how gig workers are actually compensated

ParaProtect covers lost income only — not vehicles or health — for the duration of a validated trigger event.

---

## Persona-Based Scenarios and Application Workflow

### Persona 1 — Ravi, Zomato Delivery Partner, Chennai

**Profile:**
- Platform: Zomato
- Location: Chennai, Tamil Nadu
- Monthly Income: Approximately Rs. 18,000
- Daily Activity: 6 to 8 deliveries per day, 6 days a week

**Scenario:**
Cyclone Michaung makes landfall near Chennai. The city experiences 3 consecutive days of heavy rainfall, flooding, and citywide shutdowns. Ravi is unable to leave his home and loses approximately Rs. 1,800 in income with no way to recover it.

**With GigShield:**
- The system detects the cyclone trigger via IMD and OpenWeatherMap APIs in real time
- Rainfall exceeds the validated threshold of 60mm per hour, confirming the trigger
- A claim is automatically generated on Ravi's behalf — he does not need to file anything
- The payout is credited directly to his UPI-linked account within hours
- Ravi receives income replacement proportional to the 3 days he was unable to work

---

### Persona 2 — Priya, Swiggy Delivery Partner, Delhi

**Profile:**
- Platform: Swiggy
- Location: New Delhi
- Monthly Income: Approximately Rs. 9,000 (part-time)
- Daily Activity: 3 to 4 deliveries per day

**Scenario:**
Delhi's Air Quality Index surges past 400 — classified as Severe — during peak winter smog. Authorities restrict outdoor movement and advise residents to stay indoors. Priya is unable to work for 2 full days, losing approximately Rs. 600 in income with no recourse.

**With GigShield:**
- The CPCB AQI API registers a reading above 400 sustained for more than 6 hours, breaching the validated trigger threshold
- GigShield automatically generates a claim proportional to Priya's verified weekly earnings
- The payout is processed instantly to her registered bank account
- No paperwork, no proof of loss, no waiting period

---

### Persona 3 — Arjun, Zepto Delivery Partner, Bengaluru

**Profile:**
- Platform: Zepto
- Location: Bengaluru, Karnataka
- Monthly Income: Approximately Rs. 22,000
- Daily Activity: 8 to 10 deliveries per day, full-time

**Scenario:**
A state government-imposed bandh is declared in Bengaluru following a regional political event. All delivery operations are suspended for a full day. Arjun is unable to complete a single order and loses approximately Rs. 733.

**With GigShield:**
- The system cross-references state government notification feeds and verified news APIs
- The shutdown is validated across multiple independent data sources, meeting the confidence threshold
- A claim is automatically raised on Arjun's behalf without him doing anything
- Arjun receives his income replacement payout the same day

---

### Application Workflow

**Step 1 — Worker Onboarding**

The worker downloads the GigShield mobile app and registers with their mobile number and UPI ID. They select their delivery platform, input or connect their platform earnings data for income verification, and select their city and active delivery zones.

**Step 2 — AI Risk Assessment**

The system analyses the worker's location, platform type, current season, and historical trigger data for their zone. A risk score is generated and a weekly premium is calculated and presented to the worker before they activate their policy.

**Step 3 — Policy Activation**

The worker reviews and accepts the weekly premium. Payment is collected via UPI auto-debit or manual payment. The policy is activated instantly upon payment confirmation and the worker receives a policy summary via the app and SMS.

**Step 4 — Real-Time Trigger Monitoring**

GigShield continuously monitors data feeds including IMD and OpenWeatherMap for weather events, the CPCB API for AQI and pollution levels, state government feeds and news APIs for shutdowns and curfews, and satellite and flood monitoring data for flooding events. Monitoring is city-specific and tied to the worker's registered delivery zones.

**Step 5 — Trigger Detection and Validation**

When a trigger threshold is breached in a worker's active zone, data is cross-referenced across multiple independent sources. An NLP model scans news and government feeds to corroborate the event. A trigger is validated only when the confidence threshold is met across all available sources.

**Step 6 — Automatic Claim Generation**

A claim is auto-generated for all active policyholders in the affected zone. The claim value is calculated based on the worker's verified weekly income and the duration of the trigger event. No action is required from the worker at any point.

**Step 7 — Fraud Detection Review**

The anomaly detection model reviews the claim against the worker's profile. Flags are raised for suspicious patterns such as very recent registration prior to the trigger event or location inconsistencies. Clean claims proceed automatically. Flagged claims go to manual review.

**Step 8 — Instant Payout**

Approved claims are paid out instantly to the worker's registered UPI account. The worker receives a push notification and SMS confirming the payout. The claim summary is stored in the worker's in-app history.

---

## Weekly Premium Model and Parametric Triggers

### How the Weekly Premium Model Works

Premiums are calculated and collected on a weekly basis rather than monthly or annually. This design decision directly reflects how gig workers earn — in short, irregular, variable cycles — and ensures the product remains accessible and affordable even for part-time or low-income workers.

A worker earning Rs. 4,500 per week pays a premium in the range of Rs. 68 to 112 per week depending on their risk profile. This is a meaningfully small fraction of their earnings while providing protection against losing 20 to 30 percent of their monthly income in a single trigger event.

**Premium Formula:**

Weekly Premium = (Average Weekly Income x Risk Score x Base Rate) + Platform Adjustment Factor

| Variable | Description |
|---|---|
| Average Weekly Income | Derived from platform earnings API or verified via 4-week rolling average of submitted earnings data |
| Risk Score | AI-generated score between 0.8 and 2.0 based on location, season, historical trigger frequency, and platform type |
| Base Rate | Set at 1.5 to 2.5 percent of weekly income |
| Platform Adjustment Factor | Accounts for the nature of delivery work — food delivery carries different risk exposure to grocery or e-commerce |

**Seasonal Pricing Example:**

| Worker Profile | Season | Weekly Income | Weekly Premium |
|---|---|---|---|
| Zomato, Chennai | October — cyclone season | Rs. 4,500 | Rs. 90 to 112 |
| Zomato, Chennai | February — low risk | Rs. 4,500 | Rs. 68 to 80 |
| Swiggy, Delhi | December — smog season | Rs. 2,250 | Rs. 45 to 56 |
| Zepto, Bengaluru | Year-round stable | Rs. 5,500 | Rs. 88 to 99 |

Premiums are recalculated every week based on the worker's most recent 4-week income average and the current risk environment. Workers are notified of any premium changes before the next weekly cycle begins.

---

### Parametric Triggers

Parametric insurance pays based on a predefined, objectively measurable event threshold — not on individually assessed losses. This is the core mechanism that enables instant, automatic payouts with no claims process required from the worker.

A trigger is validated only when readings from multiple independent data sources breach the defined threshold simultaneously. This multi-source validation approach protects against false positives and forms the first layer of fraud prevention.

| Trigger Type | Primary Data Source | Secondary Data Source | Validated Threshold |
|---|---|---|---|
| Extreme Rainfall | IMD API | OpenWeatherMap | Rainfall above 60mm per hour sustained for 2 or more hours |
| Cyclone and High Winds | IMD API | Satellite wind data | Wind speed above 80km per hour |
| Air Pollution | CPCB AQI API | State pollution board feeds | AQI above 400 sustained for 6 or more hours |
| Government Shutdown | State government feeds | Verified news APIs | Confirmed bandh or curfew order |
| Flooding | IMD flood alerts | Satellite inundation data | Flood alert Level 3 or above |
| Heatwave | IMD API | Regional weather stations | Temperature above 45 degrees Celsius for 2 or more consecutive days |

**Payout Calculation:**

Claim Payout = (Verified Daily Income x Number of Trigger Days) x Coverage Percentage

Coverage is set at 80 percent of verified daily income per trigger day, capped at 5 days per trigger event. This ensures meaningful income replacement while keeping the product actuarially viable.

---

## Platform Justification

GigShield is built as a mobile-first application. This is not a default choice — it is a deliberate decision based on the specific characteristics of our target users and the technical requirements of the product.

Gig delivery workers in India are overwhelmingly smartphone-first users. The majority do not own or regularly use a desktop or laptop computer. Any product that requires desktop access will fail to reach this audience.

UPI payment infrastructure — both for premium collection and instant payouts — is natively mobile. Workers already use UPI apps daily and GigShield integrates directly into a payment behaviour they already have.

Push notifications are essential to the product experience. Workers need to be instantly notified when a trigger is detected in their zone, when a claim is auto-generated, and when a payout is credited. This requires a mobile application.

Location-based trigger detection requires access to the device's GPS. GigShield uses the worker's registered delivery zones and real-time location, with consent, to ensure triggers are accurately matched to the correct geographic area.

Onboarding must be fast, simple, and available in regional languages. The mobile app supports Hindi, Tamil, Telugu, Kannada, and English, with a sub-5-minute onboarding flow designed for users who may have limited digital literacy.

A lightweight web-based operations dashboard will be built separately for GigShield's internal team to monitor live trigger events, review flagged claims, manage fraud escalations, and access actuarial reporting. This is an internal operational tool and is not part of the worker-facing product.

---

## AI/ML Integration

AI and ML are not supplementary features in GigShield — they are core to every critical workflow in the product.

### 1. Dynamic Premium Calculation

**Model Type:** Gradient boosted regression using XGBoost

The model takes the following inputs: the worker's location and active delivery zones, the current season and historical trigger frequency for that zone, the platform type covering food, grocery, or e-commerce, the worker's verified income over the past 4 weeks, and a city-level risk index that is updated weekly.

The output is a weekly premium figure personalised to the individual worker's risk profile. The model retrains monthly as new trigger event data and claim payouts are collected, continuously improving its accuracy and fairness across worker segments.

### 2. Fraud Detection

**Model Type:** Isolation Forest anomaly detection

The model monitors registration timing relative to known or forecasted trigger events, flagging workers who register within 48 hours of a major predicted weather event. It monitors claim clustering, flagging unusually high volumes of claims from a single zone without a validated multi-source trigger. It monitors income inconsistencies, flagging submitted earnings that deviate significantly from platform averages for that city and role. It also monitors payout frequency anomalies, reviewing workers who claim across multiple trigger events in a short period without corresponding location data.

The output is a fraud risk score attached to every claim. Claims below the threshold are auto-approved. Claims above the threshold are held and escalated to the manual review queue.

### 3. Trigger Validation

**Model Type:** Multi-source confidence aggregation with NLP corroboration

A real-time data pipeline continuously ingests readings from weather, AQI, government, and satellite APIs. Each source is assigned a reliability weight based on historical accuracy. A trigger is only validated when the weighted confidence score across all available sources exceeds a defined threshold. An NLP model independently scans government press releases, verified news feeds, and official social media accounts to corroborate non-weather triggers such as bandhs and curfews. This dual-validation approach significantly reduces both false positives and false negatives.

### 4. Income Verification

**Model Type:** OCR with document intelligence and anomaly detection

Workers on platforms without direct API access submit screenshots of their earnings summaries through the GigShield app. An OCR model extracts income figures, dates, and platform identifiers from the submitted image. A document intelligence layer validates that the submission is a genuine platform earnings screenshot rather than a manually created or edited image. Extracted figures are cross-referenced against platform averages for that city and role to detect outliers. A 4-week rolling average is used to calculate the worker's verified daily income for payout calculations, smoothing out week-to-week variability.

---

## Adversarial Defense and Anti-Spoofing Strategy

A coordinated syndicate of bad actors using GPS spoofing to fake their location inside a trigger zone represents a direct threat to GigShield's liquidity pool. Simple GPS verification is not sufficient to counter this. GigShield's adversarial defense architecture is built on three principles — multi-signal location verification, coordinated ring detection, and fair treatment of honest workers caught in edge cases.

### 1. The Differentiation — Genuine Worker vs. Bad Actor

GigShield does not rely on GPS alone to determine whether a worker is genuinely stranded in a trigger zone. A genuine worker who is trapped during a cyclone or shutdown will produce a consistent and coherent set of signals across multiple independent data sources. A bad actor spoofing their GPS from home will not.

When a claim is generated, the system cross-references the following signals simultaneously:

GPS coordinates are checked against the worker's registered delivery zone and their historical delivery activity. A worker who has never delivered in a particular area suddenly appearing there during a trigger event is flagged immediately.

Mobile network tower triangulation is used to independently verify the device's physical location. GPS spoofing apps manipulate the GPS signal on the device but cannot manipulate which cell towers the device is actually connecting to. If the GPS location and the network tower location do not match within an acceptable radius, the claim is flagged.

Platform delivery data is checked to confirm whether the worker had any active delivery sessions in the claimed zone in the hours leading up to the trigger event. A genuine worker who was stranded mid-delivery will have active session data. A bad actor sitting at home will not.

App behaviour patterns are analysed in real time. A worker genuinely trapped outdoors during a cyclone will show different device behaviour — movement patterns, connectivity drops, battery usage, app interactions — compared to a worker sitting comfortably at home with stable WiFi.

Historical location consistency is checked against the worker's past 30 days of delivery activity. If the claimed trigger zone is outside the worker's normal delivery geography, the claim is automatically escalated for review.

### 2. The Data — Detecting a Coordinated Fraud Ring

Individual GPS spoofing is a known problem. A coordinated syndicate of hundreds of workers acting together is a more sophisticated threat and requires a different detection approach. GigShield's coordinated ring detection layer looks for patterns that are statistically impossible under normal conditions.

Claim surge analysis monitors the volume and timing of claims coming from a single zone. A genuine trigger event produces a geographically distributed and temporally gradual surge of claims as workers in different parts of the zone are affected at different times. A coordinated spoofing attack produces an unnaturally simultaneous spike of claims from a tight geographic cluster at the exact moment the trigger is validated. This pattern is detectable and distinctive.

Social graph analysis tracks whether claimants in a suspicious cluster have any known social connections — for example, shared referral chains within the GigShield app or accounts registered from the same device or IP address. A syndicate organising via a Telegram group will leave traces in registration and referral data.

Network fingerprinting detects whether multiple claims are originating from devices on the same WiFi network or sharing the same network hardware identifiers. A group of workers spoofing their GPS from the same location will often be on the same network.

Registration timing analysis flags accounts that were created within a short window before a major predicted trigger event. A sudden spike in new registrations in a city 24 to 48 hours before a forecasted cyclone is a strong signal of pre-meditated fraud.

Claim-to-delivery ratio analysis looks at the ratio of claims to actual completed deliveries over a rolling 90-day period. Legitimate workers have a consistent delivery history. Accounts created primarily to exploit trigger events will have a disproportionately high claim-to-delivery ratio.

### 3. The UX Balance — Protecting Honest Workers

The greatest risk of an aggressive fraud detection system is unfairly penalising honest workers. A delivery worker genuinely stranded during a cyclone may have a weak GPS signal, patchy network connectivity, and unusual device behaviour — all of which could superficially resemble spoofing signals. GigShield's approach to flagged claims is designed to protect these workers.

Tiered flagging rather than binary blocking means claims are not simply approved or rejected. They are assigned a fraud risk score across a spectrum. Claims with a low fraud score are auto-approved instantly. Claims with a medium fraud score are approved with a short manual review delay of no more than 4 hours. Only claims with a high fraud score are held pending investigation. This means the vast majority of legitimate claims are never affected.

Benefit of the doubt for connectivity issues means that if a worker's GPS and network tower data are inconsistent but the inconsistency is consistent with known network degradation patterns in the trigger zone — for example, cell towers in a flood-affected area going offline — the system adjusts its thresholds automatically to account for the degraded signal environment. Genuine bad weather creates genuine signal problems, and the model is trained to recognise this.

Transparent communication ensures workers whose claims are flagged receive an immediate push notification explaining that their claim is under a short review and giving them an estimated resolution time. They are never left without information. If a flagged claim is ultimately approved, the payout is processed with priority.

Appeal and human review means every rejected claim can be appealed by the worker through the app. Appeals are reviewed by a human agent within 24 hours. Workers can submit any additional evidence — a photograph, a platform delivery record, or a timestamp from a nearby merchant — to support their appeal. This ensures that no honest worker is permanently denied a legitimate claim because of an algorithm decision.

---

## Tech Stack

### Frontend Application
- **HTML5** — Semantic markup and responsive layout
- **CSS3** — Modern styling with CSS custom properties, flexbox, grid, and animations
- **Vanilla JavaScript (ES6+)** — Interactive functionality, DOM manipulation, and application logic

### Key Features Implemented
- **Responsive Design** — Mobile-first approach with dark theme UI
- **Dynamic Premium Calculation** — ML-inspired algorithm using city risk scores, platform factors, and hyper-local adjustments
- **Real-time Risk Assessment** — Interactive risk meters and zone history visualization
- **Automated Claim Processing** — Simulated trigger validation with fraud detection checks
- **Policy Management Dashboard** — Complete user interface for policy lifecycle management

### External Dependencies
- **Google Fonts** — Syne and DM Sans font families for modern typography
- **Simulated API Integrations** — Mock implementations for IMD, CPCB, and government feeds

### Development Environment
- **VS Code** — Primary development environment
- **Browser Testing** — Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- **Git** — Version control and collaboration

---

## How to Run the Application

1. **Prerequisites:**
   - Modern web browser (Chrome, Firefox, Safari, or Edge)
   - Internet connection for Google Fonts

2. **Running the Application:**
   - Open `index.html` in your web browser
   - The application will load and display the home page
   - Navigate through the registration, premium calculation, and dashboard flows

3. **Testing Features:**
   - Register a worker profile to see dynamic premium calculation
   - Simulate trigger events to test automated claim processing
   - Explore the dashboard for policy management functionality

---

## Development Plan

| Phase | Timeline | Key Deliverables |
|---|---|---|
| Phase 1 — Foundation | Weeks 1 to 4 | Core backend API, worker onboarding flow, income verification pipeline, premium calculation engine, UPI integration for premium collection |
| Phase 2 — Trigger Monitoring | Weeks 5 to 8 | Real-time API integrations for IMD, CPCB, and news feeds, multi-source trigger validation pipeline, automatic claim generation engine |
| Phase 3 — AI/ML Models | Weeks 9 to 12 | Dynamic pricing model using XGBoost, fraud detection model using Isolation Forest, NLP trigger corroboration pipeline, OCR income verification, adversarial defense and anti-spoofing layer |
| Phase 4 — Payments and Payouts | Weeks 13 to 14 | Instant UPI payout flow, payout reconciliation, claim history in-app view, SMS and push notification system |
| Phase 5 — Pilot Launch | Weeks 15 to 16 | Closed beta with 100 workers across Chennai and Delhi, trigger simulation testing, fraud model calibration, anti-spoofing stress testing, premium model validation against real income data |

---

## Current Implementation Status

**Phase 2 Prototype — Fully Functional Web Application**

This submission represents a complete, working prototype of ParaProtect that demonstrates all core functionality:

✅ **Worker Registration & Onboarding**
- Profile collection with platform, city, zone, and income details
- Aadhaar last-4 verification and consent management
- Dynamic form validation and user experience

✅ **AI-Inspired Premium Calculation**
- City-based risk scoring (High/Moderate risk levels)
- Platform factor adjustments (Zomato, Swiggy, Zepto, Amazon, Dunzo)
- Hyper-local zone adjustments (flood, pollution, bandh history)
- ML-style premium optimization (part-time discounts, eco-vehicle incentives)

✅ **Interactive Dashboard**
- Policy status and premium tracking
- Claims history with payout details
- Trigger monitoring visualization
- Policy management (pause, upgrade, cancel)

✅ **Automated Claim Processing**
- 5 trigger types: Cyclone/Rain, Air Pollution, Govt Shutdown, Flooding, Heatwave
- Simulated real-time validation with multi-source confirmation
- Fraud detection checks (GPS triangulation, platform session verification)
- Instant UPI payout simulation

✅ **Modern Web Interface**
- Responsive design for mobile and desktop
- Dark theme with custom CSS variables
- Smooth animations and transitions
- Professional UI/UX optimized for gig workers

**Key Technical Achievements:**
- Zero external dependencies (pure HTML/CSS/JS)
- Client-side premium calculation engine
- Simulated API integrations for realistic user experience
- Comprehensive error handling and validation
- Mobile-first responsive design

---

## Why ParaProtect Matters

India has over 15 million active gig delivery workers. Not one of them currently has access to income protection that accounts for the unpredictable, event-driven disruptions they face every day. Existing insurance products were not built for this workforce — they require documentation, legal processes, and waiting periods that are completely incompatible with the reality of gig work.

GigShield is the first parametric insurance product designed from the ground up for India's gig delivery workforce. It is instant, affordable, mobile-first, and powered entirely by real-time data rather than paperwork.

We are not adapting an existing insurance product to fit a new audience. We are building the product this workforce has never had — and building it the way they actually live and work.
