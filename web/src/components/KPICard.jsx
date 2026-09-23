import useCountUp from '../hooks/useCountUp';

const ICONS = {
  members: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  trend: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" />
      <path d="M18.7 8 12 14.7l-3-3L3 18" />
    </svg>
  ),
  coin: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1 3 2.3-1.3 2-3 2.2-3 .9-3 2.2 1.3 2.3 3 2.3 3-1.1 3-2.5" />
    </svg>
  ),
  alert: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
  infinity: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 3h5v5" />
      <path d="M8 3H3v5" />
      <path d="M3 16v5h5" />
      <path d="M16 21h5v-5" />
      <path d="m21 3-7.5 7.5" />
      <path d="m3 21 7.5-7.5" />
    </svg>
  ),
};

export default function KPICard({ label, value, icon, sub, formatter, colorClass = '' }) {
  const numericValue = typeof value === 'number' ? value : null;
  const animated = useCountUp(numericValue);
  const display = numericValue == null ? formatter(value) : formatter(animated);

  return (
    <div className={'panel kpi ' + colorClass}>
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        <span className="kpi-icon">{ICONS[icon]}</span>
      </div>
      <div className="kpi-value">{display}</div>
      <div className="kpi-sub">{sub}</div>
    </div>
  );
}
