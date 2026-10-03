// A labeled input with Bootstrap validation styling and an error message.
export default function FormField({
  id, label, type = "text", value, onChange, error, required = false,
  placeholder, autoComplete, help, maxLength, inputMode,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        inputMode={inputMode}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={`${id}-feedback`}
      />
      {help && !error && <div className="form-text">{help}</div>}
      <div id={`${id}-feedback`} className="invalid-feedback">
        {error}
      </div>
    </div>
  );
}
