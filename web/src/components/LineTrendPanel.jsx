import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Dot } from 'recharts';

function PctTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const v = payload[0].value;
  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      {v == null ? 'No data' : v.toFixed(1) + '%'}
    </div>
  );
}

function ValueDot(props) {
  const { cx, cy, value } = props;
  if (value == null) return null;
  return <Dot cx={cx} cy={cy} r={4} fill="#6FA8FF" stroke="#0b0f1a" strokeWidth={1.5} />;
}

// data: [{ label, value }] — fixed domain so the axis never rescales when
// the channel slicer changes (same reasoning as the hero chart).
export default function LineTrendPanel({ data, domain }) {
  const validCount = data.filter((d) => d.value != null).length;

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 8, bottom: 4, left: -18 }}>
          <defs>
            <linearGradient id="tenureFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6FA8FF" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#6FA8FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            stroke="rgba(255,255,255,0.06)"
            tick={{ fontSize: 10, fill: '#9aa3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={domain || [0, 'auto']}
            tickFormatter={(v) => v + '%'}
            tick={{ fontSize: 10, fill: '#667088' }}
            axisLine={false}
            tickLine={false}
            width={38}
          />
          <Tooltip cursor={{ stroke: 'rgba(255,255,255,0.15)' }} content={<PctTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#6FA8FF"
            strokeWidth={2.5}
            fill="url(#tenureFill)"
            dot={<ValueDot />}
            activeDot={{ r: 5, fill: '#6FA8FF', stroke: '#0b0f1a', strokeWidth: 2 }}
            connectNulls
            isAnimationActive
            animationDuration={550}
            animationEasing="ease-in-out"
            // With only one real data point there's no line to read, so
            // label it directly rather than relying on hover — otherwise a
            // lone dot on an empty chart looks broken, not sparse.
            label={
              validCount === 1
                ? { position: 'top', fontSize: 11, fontWeight: 600, fill: '#9aa3b8', formatter: (v) => (v == null ? '' : v.toFixed(1) + '%') }
                : false
            }
          />
        </AreaChart>
      </ResponsiveContainer>
      {validCount === 0 && <div className="chart-empty-note">No data for this channel</div>}
    </div>
  );
}
