const LoadingSpinner = ({ label = 'Loading' }) => {
  return (
    <div className="admin-spinner-wrap" role="status" aria-live="polite">
      <div className="admin-spinner" />
      <p>{label}...</p>
    </div>
  );
};

export default LoadingSpinner;

