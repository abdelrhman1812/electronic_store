const InputsForm = ({ label, id, type, value, onChange, onBlur, error }) => {
  return (
    <div className="form-group update d-flex align-items-center position-relative">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className="w-75"
        id={id}
        placeholder={`Enter your ${label.toLowerCase()}`}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {error ? (
        <span className="text-danger error-msg position-absolute">{error}</span>
      ) : null}
    </div>
  );
};

export default InputsForm;
