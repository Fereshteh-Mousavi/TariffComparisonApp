import React from 'react';

const FormInput = ({ label, value, onChange, onSubmit, error }) => (
  <form onSubmit={onSubmit} className="form-container">
    <div className="form-group">
      <label htmlFor="consumption">{label}</label>
      <input
        type="number"
        id="consumption"
        value={value}
        onChange={onChange}
        min="0"
        required
      />
    </div>
    <button type="submit">Compare Tariffs</button>
    {error && <p className="error">{error}</p>}
  </form>
);

export default FormInput;