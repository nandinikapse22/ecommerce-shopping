const StatusBadge = ({ value }) => {
  const normalized = String(value || '').toLowerCase();
  return <span className={`admin-status-badge ${normalized.replace(/\s+/g, '-')}`}>{value}</span>;
};

export default StatusBadge;

