// ============================================================
// DATA — sourced from Supabase SQL queries against the real
// KKBox churn dataset, cross-checked against the shipped Power BI
// dashboard and the locked project findings. Nothing here is
// invented; where a figure is a derived weighted average rather
// than a direct query result, it's flagged below.
// ============================================================

export const CHANNELS = ['all', '3', '4', '7', '9', '13'];

export const CHANNEL_LABELS = {
  all: 'All Channels',
  '3': 'Channel 3',
  '4': 'Channel 4',
  '7': 'Channel 7',
  '9': 'Channel 9',
  '13': 'Channel 13',
};

export const TIER_COLORS = {
  'Very High Risk': '#F2545B',
  'High Risk': '#F2B84B',
  'Moderate Risk': '#6FA8FF',
  'Low Risk': '#3FD29A',
};

export const DATA = {
  all: {
    kpis: { totalMembers: 30000, churnRate: 9.0, revenueLost: 646818.36, revenueAtRisk: 75963.88, avgCLV: 6869.20 },
    riskTiers: [
      // avgRisk here is a weighted average Claude computed from the 5 per-channel
      // avg_risk_score results (weighted by member count) — the original SQL
      // didn't return this figure for the unfiltered dataset. Count/revenue are
      // direct pulls from the locked SQL findings (query 04).
      { tier: 'Very High Risk', count: 87, revenue: 12910.43, avgRisk: 0.770 },
      { tier: 'High Risk', count: 401, revenue: 63053.45, avgRisk: 0.588 },
      { tier: 'Moderate Risk', count: 961, revenue: 153947.96, avgRisk: 0.382 },
      { tier: 'Low Risk', count: 25623, revenue: 3261428.71, avgRisk: 0.021 },
    ],
    autoRenew: { off: 45.6, on: 3.7 },
    cancel: { no: 7.3, yes: 59.5 },
    tenure: [
      { cohort: 'Under 1yr', churn: 8.2 },
      { cohort: '1-3yr', churn: 9.6 },
      { cohort: '3-6yr', churn: 10.1 },
      { cohort: '6+yr', churn: 9.9 },
    ],
  },
  '3': {
    kpis: { totalMembers: 3274, churnRate: 18.0, revenueLost: 154515.58, revenueAtRisk: 17478.60, avgCLV: 7318.19 },
    riskTiers: [
      { tier: 'Very High Risk', count: 10, revenue: 2004.60, avgRisk: 0.741 },
      { tier: 'High Risk', count: 95, revenue: 15474.00, avgRisk: 0.589 },
      { tier: 'Moderate Risk', count: 324, revenue: 53610.50, avgRisk: 0.379 },
      { tier: 'Low Risk', count: 2183, revenue: 338699.50, avgRisk: 0.038 },
    ],
    autoRenew: { off: 40.6, on: 5.5 },
    cancel: { no: 16.6, yes: 57.4 },
    tenure: [
      { cohort: 'Under 1yr', churn: 21.2 },
      { cohort: '1-3yr', churn: 19.4 },
      { cohort: '3-6yr', churn: 16.7 },
      { cohort: '6+yr', churn: null },
    ],
  },
  '4': {
    kpis: { totalMembers: 1635, churnRate: 22.9, revenueLost: 81607.00, revenueAtRisk: 8026.00, avgCLV: 1940.02 },
    riskTiers: [
      { tier: 'Very High Risk', count: 5, revenue: 490.00, avgRisk: 0.809 },
      { tier: 'High Risk', count: 46, revenue: 7536.00, avgRisk: 0.576 },
      { tier: 'Moderate Risk', count: 204, revenue: 32742.33, avgRisk: 0.380 },
      { tier: 'Low Risk', count: 960, revenue: 156150.00, avgRisk: 0.060 },
    ],
    autoRenew: { off: 39.4, on: 6.7 },
    cancel: { no: 21.7, yes: 60.4 },
    tenure: [
      { cohort: 'Under 1yr', churn: 23.3 },
      { cohort: '1-3yr', churn: 22.2 },
      { cohort: '3-6yr', churn: null },
      { cohort: '6+yr', churn: null },
    ],
  },
  '7': {
    kpis: { totalMembers: 14242, churnRate: 4.3, revenueLost: 80885.41, revenueAtRisk: 12116.45, avgCLV: 3733.11 },
    riskTiers: [
      { tier: 'Very High Risk', count: 14, revenue: 1762.67, avgRisk: 0.752 },
      { tier: 'High Risk', count: 77, revenue: 10353.78, avgRisk: 0.596 },
      { tier: 'Moderate Risk', count: 93, revenue: 12936.63, avgRisk: 0.396 },
      { tier: 'Low Risk', count: 13431, revenue: 1534425.38, avgRisk: 0.014 },
    ],
    autoRenew: { off: 75.8, on: 3.2 },
    cancel: { no: 2.7, yes: 54.2 },
    tenure: [
      { cohort: 'Under 1yr', churn: 0.9 },
      { cohort: '1-3yr', churn: 4.2 },
      { cohort: '3-6yr', churn: 5.7 },
      { cohort: '6+yr', churn: 11.1 },
    ],
  },
  '9': {
    kpis: { totalMembers: 7254, churnRate: 12.9, revenueLost: 314394.37, revenueAtRisk: 37091.83, avgCLV: 14286.35 },
    riskTiers: [
      { tier: 'Very High Risk', count: 49, revenue: 7600.83, avgRisk: 0.777 },
      { tier: 'High Risk', count: 181, revenue: 29491.00, avgRisk: 0.588 },
      { tier: 'Moderate Risk', count: 340, revenue: 54658.50, avgRisk: 0.382 },
      { tier: 'Low Risk', count: 5646, revenue: 856169.83, avgRisk: 0.026 },
    ],
    autoRenew: { off: 46.3, on: 4.2 },
    cancel: { no: 11.6, yes: 54.6 },
    tenure: [
      { cohort: 'Under 1yr', churn: 24.8 },
      { cohort: '1-3yr', churn: 18.0 },
      { cohort: '3-6yr', churn: 13.8 },
      { cohort: '6+yr', churn: 9.6 },
    ],
  },
  '13': {
    kpis: { totalMembers: 110, churnRate: 8.2, revenueLost: 1261.00, revenueAtRisk: null, avgCLV: 551.91 },
    riskTiers: [
      { tier: 'Very High Risk', count: 0, revenue: 0, avgRisk: null },
      { tier: 'High Risk', count: 0, revenue: 0, avgRisk: null },
      { tier: 'Moderate Risk', count: 0, revenue: 0, avgRisk: null },
      { tier: 'Low Risk', count: 101, revenue: 12962.00, avgRisk: 0.014 },
    ],
    autoRenew: { off: null, on: 8.2 },
    cancel: { no: 0.0, yes: 90.0 },
    tenure: [
      { cohort: 'Under 1yr', churn: 8.2 },
      { cohort: '1-3yr', churn: null },
      { cohort: '3-6yr', churn: null },
      { cohort: '6+yr', churn: null },
    ],
  },
};

// Fixed, global scales — computed once from the full dataset so the hero
// chart's axes never jump when the channel slicer changes. Without this,
// each channel's auto-scaled axis would resize independently, causing
// bubbles to appear to jump or overflow mid-transition.
const ALL_TIER_ROWS = Object.values(DATA).flatMap((d) => d.riskTiers);
export const GLOBAL_MAX_REVENUE = Math.max(...ALL_TIER_ROWS.map((t) => t.revenue));
export const GLOBAL_MAX_MEMBERS = Math.max(...ALL_TIER_ROWS.map((t) => t.count));

export const CHANNEL_COMPARISON = [
  { ch: '3', churn: 18.0 },
  { ch: '4', churn: 22.9 },
  { ch: '7', churn: 4.3 },
  { ch: '9', churn: 12.9 },
  { ch: '13', churn: 8.2 },
];

// Bottom-4 panel — static model coefficients, does not respond to the channel slicer
export const FEATURE_IMPORTANCE = [
  { name: 'Auto-Renew', value: -1.483 },
  { name: 'Active Days', value: -0.858 },
  { name: 'Any Cancel', value: 0.809 },
  { name: 'Days Since Last Txn', value: 0.286 },
  { name: 'Tenure Days', value: 0.221 },
  { name: 'Discount Amount', value: 0.167 },
  { name: 'Avg Plan Price', value: 0.152 },
  { name: 'Avg Amount Paid', value: 0.144 },
];
