import { useState } from "react";
import FormField from "../components/FormField.jsx";
import { validateAccount } from "../utils/validation.js";

const EMPTY = { login: "", password: "", email: "", street: "", city: "", state: "", zip: "", phone: "" };

export default function CreateAccountView({ onNavigate }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateAccount(form);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setCreated(form.login.trim());
      setForm(EMPTY);
    } else {
      setCreated("");
    }
  };

  const fieldProps = (id) => ({ id, value: form[id], onChange: handleChange, error: errors[id] });

  return (
    <div className="container section">
      <div className="form-card form-card-wide">
        <h1 className="page-title">Create an account</h1>

        {created && (
          <div className="alert alert-success" role="status">
            Account created for {created}. Accounts are not saved in this project, so this is a preview of the flow.{" "}
            <button type="button" className="btn btn-link p-0 align-baseline" onClick={() => onNavigate("account")}>
              Go to log in
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <h2 className="form-section">Account details</h2>
          <FormField {...fieldProps("login")} label="Login name" autoComplete="username" required
            help="4 to 20 letters, numbers, or underscores." />
          <FormField {...fieldProps("password")} label="Password" type="password" autoComplete="new-password" required
            help="At least 8 characters, with a letter and a number." />
          <FormField {...fieldProps("email")} label="Email" type="email" autoComplete="email" required
            placeholder="name@example.com" />

          <h2 className="form-section">Shipping address (optional)</h2>
          <FormField {...fieldProps("street")} label="Street" autoComplete="street-address" />
          <div className="row">
            <div className="col-md-6">
              <FormField {...fieldProps("city")} label="City" autoComplete="address-level2" />
            </div>
            <div className="col-6 col-md-3">
              <FormField {...fieldProps("state")} label="State" autoComplete="address-level1" maxLength={2}
                placeholder="CA" />
            </div>
            <div className="col-6 col-md-3">
              <FormField {...fieldProps("zip")} label="ZIP code" autoComplete="postal-code" inputMode="numeric"
                maxLength={10} />
            </div>
          </div>

          <h2 className="form-section">Contact (optional)</h2>
          <FormField {...fieldProps("phone")} label="Phone" type="tel" autoComplete="tel" inputMode="tel"
            placeholder="(555) 123-4567" />

          <button type="submit" className="btn btn-cta w-100">
            Create account
          </button>
        </form>

        <p className="mt-4 mb-0">
          Already have an account?{" "}
          <button type="button" className="btn btn-link p-0 align-baseline" onClick={() => onNavigate("account")}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
