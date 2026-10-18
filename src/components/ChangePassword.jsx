import { useState } from "react";
import { PasswordField } from "./PasswordField";
import { api } from "../lib/api";
const empty = { current_password:"", new_password:"", confirm_password:"" };
export function ChangePassword() {
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setError(""); setSuccess(false);
    if (form.new_password !== form.confirm_password) { setError("New passwords do not match."); return; }
    setBusy(true);
    try { await api("change-password/", form); setForm(empty); setSuccess(true); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <form className="surface settings-form password-settings" onSubmit={submit}>
    <h2>Change password</h2>
    <p className="muted">Update your admin password. Use at least 8 characters. Your current session will stay signed in.</p>
    <fieldset disabled={busy}>
      {[["current_password","Current password"],["new_password","New password"],["confirm_password","Confirm new password"]].map(([key,label]) =>
        <PasswordField key={key} label={label} required value={form[key]} minLength={key === "current_password" ? undefined : 8}
          autoComplete={key === "current_password" ? "current-password" : "new-password"}
          onChange={e => {setForm({...form,[key]:e.target.value});setSuccess(false);}} />)}
    </fieldset>
    {error && <div className="error-box" role="alert">{error}</div>}
    {success && <div className="notice-box" role="status">Password changed successfully.</div>}
    <button className="cafe-button" disabled={busy}>{busy ? "Updating…" : "Change password"}</button>
  </form>;
}
