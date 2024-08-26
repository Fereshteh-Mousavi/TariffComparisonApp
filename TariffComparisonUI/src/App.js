
import React, { useState } from 'react';
import FormInput from './components/FormInput';
import ResultsTable from './components/ResultsTable';
import ErrorMessage from './components/ErrorMessage';
import { useTariffComparison } from './hooks/useTariffComparison';
import './styles/App.css';

function App() {
  const [consumption, setConsumption] = useState('');
  const { results, error, compareTariffs } = useTariffComparison();

  const handleSubmit = (e) => {
    e.preventDefault();
    compareTariffs(consumption);
  };

  return (
    <div className="container">
      <h1>Electricity Tariff Comparison</h1>
      <FormInput
        label="Annual Consumption (kWh):"
        value={consumption}
        onChange={(e) => setConsumption(e.target.value)}
        onSubmit={handleSubmit}
        error={error}
      />
      {results.length > 0 && <ResultsTable results={results} />}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default App;
