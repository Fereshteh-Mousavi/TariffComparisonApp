import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsTable from './ResultsTable';

describe('ResultsTable Component', () => {
  test('renders table headers', () => {
    render(<ResultsTable results={[]} />);
    
    expect(screen.getByText(/Tariff Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Annual Cost \(€\)/i)).toBeInTheDocument();
  });

  test('renders results correctly', () => {
    const results = [
      { tariffName: 'basic electricity tariff', annualCost: 830 },
      { tariffName: 'Packaged tariff', annualCost: 800 },
    ];
    
    render(<ResultsTable results={results} />);
    
    expect(screen.getByText(/basic electricity tariff/i)).toBeInTheDocument();
    expect(screen.getByText(/830.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Packaged tariff/i)).toBeInTheDocument();
    expect(screen.getByText(/800.00/i)).toBeInTheDocument();
  });
});
