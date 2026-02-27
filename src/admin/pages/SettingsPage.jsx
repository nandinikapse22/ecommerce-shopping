import { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SettingsPage = () => {
  const { token } = useAdminAuth();
  const { pushToast } = useToast();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const load = async () => {
      setSettings(await adminService.getSettings(token));
    };
    load();
  }, [token]);

  if (!settings) return <LoadingSpinner label="Loading settings" />;

  const save = async (event) => {
    event.preventDefault();
    await adminService.updateSettings(token, {
      ...settings,
      taxPercent: Number(settings.taxPercent),
      shippingCharge: Number(settings.shippingCharge),
    });
    pushToast({ type: 'success', title: 'Settings saved', message: 'Store configuration updated' });
  };

  return (
    <section className="admin-card">
      <h3>Settings</h3>
      <form className="admin-form settings-form" onSubmit={save}>
        <label>
          Store Name
          <input value={settings.storeName} onChange={(e) => setSettings((p) => ({ ...p, storeName: e.target.value }))} />
        </label>
        <label>
          Logo URL
          <input value={settings.logoUrl} onChange={(e) => setSettings((p) => ({ ...p, logoUrl: e.target.value }))} />
        </label>
        <label>
          Tax (%)
          <input type="number" value={settings.taxPercent} onChange={(e) => setSettings((p) => ({ ...p, taxPercent: e.target.value }))} />
        </label>
        <label>
          Shipping Charge
          <input type="number" value={settings.shippingCharge} onChange={(e) => setSettings((p) => ({ ...p, shippingCharge: e.target.value }))} />
        </label>
        <label>
          Currency
          <select value={settings.currency} onChange={(e) => setSettings((p) => ({ ...p, currency: e.target.value }))}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
        <button type="submit">Save Settings</button>
      </form>
    </section>
  );
};

export default SettingsPage;

