import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TIER_COLORS, GLOBAL_MAX_REVENUE, GLOBAL_MAX_MEMBERS } from '../data/channelData';
import { fmtInt, fmtUSD, fmtUSDk } from '../data/format';

// Fixed axis domains (10% headroom) — computed once from the full dataset so
// switching channels never rescales the axes. This is what keeps bubbles
// inside the plot area and makes their sizes comparable across channels.
const Y_DOMAIN = [0, Math.ceil((GLOBAL_MAX_REVENUE * 1.1) / 100000) * 100000];
const Z_DOMAIN = [0, GLOBAL_MAX_MEMBERS];
const TIER_ORDER = ['Very High Risk', 'High Risk', 'Moderate Risk', 'Low Risk'];

function TooltipContent({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  if (!d.count) return null;
  return (
    <div className="chart-tooltip">
      <strong>{d.tier}</strong>
      Members: {fmtInt(d.count)}
      <br />
      Revenue: {fmtUSD(d.revenue)}
      <br />
      Avg risk: {(d.avgRisk * 100).toFixed(1)}%
    </div>
  );
}

export default function HeroChart({ riskTiers }) {
  // Always render all four tiers, in a fixed order, as four permanently-mounted
  // Scatter series. A tier with zero members still renders (at r≈0, invisible)
  // rather than being removed from the tree — that's what lets Recharts tween
  // a bubble smoothly into/out of existence instead of popping it in fresh
  // with no starting position to animate from.
  const byTier = Object.fromEntries(riskTiers.map((t) => [t.tier, t]));

  return (
    <>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 16, bottom: 10, left: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" />
            <XAxis
              type="number"
              dataKey="avgRisk"
              domain={[0, 1]}
              allowDataOverflow
              tickFormatter={(v) => (v * 100).toFixed(0) + '%'}
              stroke="#667088"
              tick={{ fontSize: 11, fill: '#667088' }}
              label={{ value: 'Avg Risk Score', position: 'insideBottom', offset: -4, fill: '#667088', fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="revenue"
              domain={Y_DOMAIN}
              allowDataOverflow
              tickFormatter={fmtUSDk}
              stroke="#667088"
              tick={{ fontSize: 11, fill: '#667088' }}
              width={56}
              label={{ value: 'Revenue in Tier', angle: -90, position: 'insideLeft', fill: '#667088', fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="count" domain={Z_DOMAIN} range={[0, 2200]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<TooltipContent />} />
            {TIER_ORDER.map((tierName) => {
              const t = byTier[tierName] || { tier: tierName, count: 0, revenue: 0, avgRisk: 0 };
              const point = {
                tier: t.tier,
                count: t.count,
                revenue: t.revenue,
                avgRisk: t.avgRisk ?? 0,
              };
              return (
                <Scatter
                  key={tierName}
                  name={tierName}
                  data={[point]}
                  fill={TIER_COLORS[tierName]}
                  fillOpacity={0.8}
                  stroke={TIER_COLORS[tierName]}
                  strokeWidth={1.5}
                  isAnimationActive
                  animationDuration={550}
                  animationEasing="ease-in-out"
                />
              );
            })}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="legend-row">
        {TIER_ORDER.map((tierName) => {
          const t = byTier[tierName];
          return (
            <span key={tierName}>
              <span className="legend-dot" style={{ background: TIER_COLORS[tierName] }} />
              {tierName} — {fmtInt(t ? t.count : 0)} members
            </span>
          );
        })}
      </div>
    </>
  );
}
