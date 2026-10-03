const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LOGIN = /^[A-Za-z0-9_]{4,20}$/;
const ZIP = /^\d{5}(-\d{4})?$/;
const PHONE_CHARS = /^[\d\s().+-]+$/;
const STATES =
  "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(" ");

export function validateLogin({ login, password }) {
  const errors = {};
  if (!login.trim()) errors.login = "Enter your login name or email.";
  if (!password) errors.password = "Enter your password.";
  return errors;
}

export function validateAccount(f) {
  const errors = {};

  // Required fields
  if (!f.login.trim()) errors.login = "Choose a login name.";
  else if (!LOGIN.test(f.login.trim()))
    errors.login = "Use 4 to 20 letters, numbers, or underscores.";

  if (!f.password) errors.password = "Create a password.";
  else if (f.password.length < 8) errors.password = "Use at least 8 characters.";
  else if (!/[A-Za-z]/.test(f.password) || !/\d/.test(f.password))
    errors.password = "Include at least one letter and one number.";

  if (!f.email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL.test(f.email.trim())) errors.email = "Enter a valid email, like name@example.com.";

  // Optional address: if any part is filled in, the whole address must be complete.
  const anyAddress = [f.street, f.city, f.state, f.zip].some((v) => v.trim());
  if (anyAddress) {
    if (!f.street.trim()) errors.street = "Add a street address to complete your address.";
    if (!f.city.trim()) errors.city = "Add a city to complete your address.";
    if (!f.state.trim()) errors.state = "Add a 2-letter state to complete your address.";
    if (!f.zip.trim()) errors.zip = "Add a ZIP code to complete your address.";
  }
  if (f.state.trim() && !STATES.includes(f.state.trim().toUpperCase()))
    errors.state = "Enter a valid 2-letter state code, like CA.";
  if (f.zip.trim() && !ZIP.test(f.zip.trim()))
    errors.zip = "Enter a ZIP code like 94513 or 94513-1234.";

  // Optional phone
  if (f.phone.trim()) {
    const digits = f.phone.replace(/\D/g, "");
    const ok =
      PHONE_CHARS.test(f.phone) &&
      (digits.length === 10 || (digits.length === 11 && digits.startsWith("1")));
    if (!ok) errors.phone = "Enter a 10-digit phone number, like (555) 123-4567.";
  }

  return errors;
}
