import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7068/api/TariffComparison';

export const useTariffComparison = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const compareTariffs = async (consumption) => {
    setError('');
    setResults([]);

    if (consumption === '' || consumption < 0) {
      setError('Please enter a valid consumption value (non-negative number).');
      return;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/${consumption}`);
        setResults(response.data);
      } catch (err) {
        setError('Error fetching data. Please ensure the API is running.');
      }
  };

  return { results, error, compareTariffs };
};
