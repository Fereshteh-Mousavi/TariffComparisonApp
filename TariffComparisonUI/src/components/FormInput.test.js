import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormInput from './FormInput';

describe('FormInput Component', () => {
  test('renders input field with label', () => {
    render(<FormInput label="Annual Consumption (kWh):" value="" onChange={() => {}} onSubmit={() => {}} />);
    
    expect(screen.getByLabelText(/Annual Consumption \(kWh\):/i)).toBeInTheDocument();
  });

  test('shows error message when provided', () => {
    render(<FormInput label="Annual Consumption (kWh):" value="" onChange={() => {}} onSubmit={() => {}} error="Invalid input" />);
    
    expect(screen.getByText(/Invalid input/i)).toBeInTheDocument();
  });

  test('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    render(<FormInput label="Annual Consumption (kWh):" value="" onChange={handleChange} onSubmit={() => {}} />);
    
    fireEvent.change(screen.getByLabelText(/Annual Consumption \(kWh\):/i), { target: { value: '1000' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('calls onSubmit handler when form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<FormInput label="Annual Consumption (kWh):" value="" onChange={() => {}} onSubmit={handleSubmit} />);
    
    fireEvent.submit(screen.getByRole('button')); // Trigger form submission by clicking the button
    expect(handleSubmit).toHaveBeenCalled();
  });
});
