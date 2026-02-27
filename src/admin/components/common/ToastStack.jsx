import { useToast } from '../../hooks/useToast';

const ToastStack = () => {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="admin-toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <article key={toast.id} className={`admin-toast ${toast.type}`}>
          <div>
            <h4>{toast.title}</h4>
            <p>{toast.message}</p>
          </div>
          <button type="button" onClick={() => dismissToast(toast.id)} aria-label="Dismiss toast">✕</button>
        </article>
      ))}
    </div>
  );
};

export default ToastStack;

