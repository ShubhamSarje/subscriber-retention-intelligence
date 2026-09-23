import { useMemo, useState } from 'react';
import Slicer from './Slicer';
import KPICard from './KPICard';
import HeroChart from './HeroChart';
import BarPanel from './BarPanel';
import FeatureList from './FeatureList';
import LineTrendPanel from './LineTrendPanel';
import { DATA, CHANNEL_LABELS, CHANNEL_COMPARISON, FEATURE_IMPORTANCE } from '../data/channelData';
import { fmtInt, fmtPct, fmtUSD } from '../data/format';
import './Dashboard.css';

export default function Dashboard() {
  const [channel, setChannel] = useState('all');
  const d = DATA[channel];

  const autoRenewData = useMemo(
    () => [
      { label: 'Off', value: d.autoRenew.off, color: '#F2545B' },
      { label: 'On', value: d.autoRenew.on, color: '#3FD29A' },
    ],
    [d]
  );

  const cancelData = useMemo(
    () => [
      { label: 'No', value: d.cancel.no, color: '#3FD29A' },
      { label: 'Yes', value: d.cancel.yes, color: '#F2545B' },
    ],
    [d]
  );

  const channelComparisonData = useMemo(
    () =>
      CHANNEL_COMPARISON.map((c) => ({
        label: 'Ch ' + c.ch,
        value: c.churn,
        color: c.ch === channel ? '#2E7EF7' : 'rgba(255,255,255,0.14)',
      })),
    [channel]
  );

  const tenureData = useMemo(
    () => d.tenure.map((t) => ({ label: t.cohort, value: t.churn, color: '#6FA8FF' })),
    [d]
  );

  const featureData = useMemo(
    () => FEATURE_IMPORTANCE.map((f) => ({ label: f.name, value: f.value, color: f.value >= 0 ? '#F2545B' : '#3FD29A' })),
    []
  );

  return (
    <div className="dashboard">
      <div className="masthead">
        <div className="brand">
          <div className="brand-mark">R</div>
          <div className="brand-text">
            <h1>Subscriber Retention Intelligence</h1>
            <p>An independent analysis &middot; built by Shubham Sarje &middot; KKBox subscriber data</p>
          </div>
        </div>
        <Slicer active={channel} onChange={setChannel} />
      </div>

      <div className="layout">
        <div className="sidebar">
          <KPICard
            label="Total Members"
            value={d.kpis.totalMembers}
            icon="members"
            sub={CHANNEL_LABELS[channel]}
            formatter={fmtInt}
            colorClass="kpi-navy"
          />
          <KPICard
            label="Churn Rate"
            value={d.kpis.churnRate}
            icon="trend"
            sub="of members in this segment"
            formatter={fmtPct}
            colorClass="kpi-navy"
          />
          <KPICard
            label="Revenue Lost"
            value={d.kpis.revenueLost}
            icon="coin"
            sub="already churned, this period"
            formatter={fmtUSD}
            colorClass="kpi-red"
          />
          <KPICard
            label="Revenue At Risk"
            value={d.kpis.revenueAtRisk}
            icon="alert"
            sub="predicted high-risk, not lost yet"
            formatter={fmtUSD}
          />
          <KPICard
            label="Avg CLV"
            value={d.kpis.avgCLV}
            icon="infinity"
            sub="retrospective, per member"
            formatter={fmtUSD}
          />
        </div>

        <div className="panel hero">
          <div className="panel-head">
            <span className="panel-title">Risk Tiers — Who to Prioritize</span>
            <span className="panel-note">x = avg risk score &middot; y = revenue in tier &middot; size = members</span>
          </div>
          <HeroChart riskTiers={d.riskTiers} />
        </div>

        <div className="bottom-row">
          <div className="panel bottom-panel">
            <div className="panel-head">
              <span className="panel-title">Auto-Renew: The Retention Switch</span>
            </div>
            <BarPanel data={autoRenewData} domain={[0, 100]} />
          </div>
          <div className="panel bottom-panel">
            <div className="panel-head">
              <span className="panel-title">One Cancel Changes Everything</span>
            </div>
            <BarPanel data={cancelData} domain={[0, 100]} />
          </div>
          <div className="panel bottom-panel">
            <div className="panel-head">
              <span className="panel-title">Not All Signups Are Equal</span>
            </div>
            <BarPanel data={channelComparisonData} />
          </div>
          <div className="panel bottom-panel">
            <div className="panel-head">
              <span className="panel-title">What Drives Churn</span>
            </div>
            <FeatureList data={featureData} />
          </div>
          <div className="panel bottom-panel">
            <div className="panel-head">
              <span className="panel-title">Tenure Doesn&rsquo;t Predict Churn</span>
            </div>
            <LineTrendPanel data={tenureData} domain={[0, 30]} />
          </div>
        </div>
      </div>

      <footer>
        Production build &middot; data verified against Supabase SQL and the shipped Power BI dashboard &middot; Shubham Sarje
      </footer>
    </div>
  );
}
