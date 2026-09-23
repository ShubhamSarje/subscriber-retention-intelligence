export const fmtInt = (n) => (n == null ? '—' : n.toLocaleString('en-US'));
export const fmtPct = (n) => (n == null ? '—' : n.toFixed(1) + '%');
export const fmtUSD = (n) =>
  n == null ? '—' : '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
export const fmtUSDk = (n) => (n == null ? '—' : '$' + (n / 1000).toFixed(0) + 'k');
