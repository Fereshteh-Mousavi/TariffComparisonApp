import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="error-container">
    <p className="error">{message}</p>
  </div>
);

export default ErrorMessage;
