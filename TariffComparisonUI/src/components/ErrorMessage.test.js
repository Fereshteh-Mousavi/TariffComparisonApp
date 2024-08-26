import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage Component', () => {
  test('renders error message correctly', () => {
    render(<ErrorMessage message="An error occurred" />);
    
    expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
  });
});
