import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

function PctTooltip({ active, payload, label, suffix }) {
  if (!active || !payload || !payload.length) return null;
  const v = payload[0].value;
  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      {v == null ? 'No data' : v.toFixed(1) + (suffix || '')}
    </div>
  );
}

// Renders the value as a small rounded pill above each bar, matching the
// reference dashboard's data-label style, instead of plain floating text.
function PillLabel({ x, y, width, value, suffix }) {
  if (value == null) return null;
  const text = value.toFixed(1) + suffix;
  const pillWidth = Math.max(34, text.length * 6.2 + 12);
  const cx = x + width / 2;
  return (
    <g transform={`translate(${cx - pillWidth / 2}, ${y - 20})`}>
      <rect width={pillWidth} height={16} rx={8} fill="#3FD29A" />
      <text x={pillWidth / 2} y={11} textAnchor="middle" fontSize={10} fontWeight={600} fill="#06241a">
        {text}
      </text>
    </g>
  );
}

// data: [{ label, value, color? }]
export default function BarPanel({ data, suffix = '%', domain }) {
  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 4, bottom: 4, left: -18 }}>
          <XAxis
            dataKey="label"
            stroke="rgba(255,255,255,0.06)"
            tick={{ fontSize: 10, fill: '#9aa3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={domain || [0, 'auto']}
            tickFormatter={(v) => v + suffix}
            tick={{ fontSize: 10, fill: '#667088' }}
            axisLine={false}
            tickLine={false}
            width={38}
          />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.04)' }} content={<PctTooltip suffix={suffix} />} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={46} isAnimationActive animationDuration={550} animationEasing="ease-in-out">
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
            <LabelList dataKey="value" content={(props) => <PillLabel {...props} suffix={suffix} />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
