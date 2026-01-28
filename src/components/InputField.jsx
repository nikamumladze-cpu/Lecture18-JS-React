import React from 'react';

const InputField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'input-error' : ''}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default InputField;