import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export function PasswordField({ label, ...props }) {
  const id = useId();
  const [shown, setShown] = useState(false);
  return <div className="password-field">
    <label htmlFor={id}>{label}</label>
    <div className="password-input-wrap">
      <input {...props} id={id} type={shown ? "text" : "password"} maxLength={256} />
      <button type="button" aria-label={`${shown ? "Hide" : "Show"} ${label.toLowerCase()}`} aria-pressed={shown} onClick={() => setShown(!shown)}>
        {shown ? <EyeOff size={19} /> : <Eye size={19} />}
      </button>
    </div>
  </div>;
}
