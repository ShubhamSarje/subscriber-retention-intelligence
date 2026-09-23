// Matches the Power BI "What Drives Churn" panel: a plain list with a
// colored value badge per row, rather than a diverging bar chart. This also
// sidesteps a real Recharts rendering bug where negative-value horizontal
// bars compute a negative SVG width and simply fail to draw.
export default function FeatureList({ data }) {
  return (
    <div className="feature-list">
      {data.map((d) => (
        <div className="feature-row" key={d.label}>
          <span className="feature-name">{d.label}</span>
          <span className="feature-badge" style={{ background: d.color }}>
            {d.value > 0 ? '+' : ''}
            {d.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}
