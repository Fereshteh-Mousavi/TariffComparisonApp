import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useTariffComparison } from './useTariffComparison';

jest.mock('axios');

const TestComponent = ({ consumption }) => {
  const { results, error, compareTariffs } = useTariffComparison();

  React.useEffect(() => {
    compareTariffs(consumption);
  }, [consumption, compareTariffs]);

  if (error) return <div>{error}</div>;
  if (results.length > 0) return <div>{results[0].tariffName} - {results[0].annualCost} €/year</div>;
  return <div>Loading...</div>;
};

describe('useTariffComparison Hook', () => {
  test('should display results on successful API call', async () => {
    const mockedResponse = {
      data: [
        { tariffName: 'basic electricity tariff', annualCost: 830 },
        { tariffName: 'Packaged tariff', annualCost: 800 },
      ],
    };
    axios.get.mockResolvedValue(mockedResponse);

    render(<TestComponent consumption={3500} />);

    await waitFor(() => {
      expect(screen.getByText(/Packaged tariff - 800 €/i)).toBeInTheDocument();
    });
  });

  test('should display error on failed API call', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    render(<TestComponent consumption={3500} />);

    await waitFor(() => {
      expect(screen.getByText(/Error fetching data. Please ensure the API is running./i)).toBeInTheDocument();
    });
  });
});
