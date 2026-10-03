import { useState } from "react";
import FormField from "../components/FormField.jsx";
import { validateLogin } from "../utils/validation.js";

export default function AccountView({ onNavigate }) {
  const [form, setForm] = useState({ login: "", password: "" });
  const [errors, setErrors] = useState({});
  const [signedIn, setSignedIn] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateLogin(form);
    setErrors(found);
    setSignedIn(Object.keys(found).length === 0 ? form.login.trim() : "");
  };

  return (
    <div className="container section">
      <div className="form-card">
        <h1 className="page-title">Log in</h1>

        {signedIn && (
          <div className="alert alert-success" role="status">
            Your login details look good, {signedIn}. Accounts are not saved in this project, so there is nothing
            to sign in to yet.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            id="login"
            label="Login name or email"
            value={form.login}
            onChange={handleChange}
            error={errors.login}
            autoComplete="username"
            required
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
            required
          />
          <button type="submit" className="btn btn-cta w-100">
            Log in
          </button>
        </form>

        <p className="mt-4 mb-0">
          New to Switchyard?{" "}
          <button type="button" className="btn btn-link p-0 align-baseline" onClick={() => onNavigate("create-account")}>
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}
