// import React, { useState } from 'react';

// function App() {
//     const [consumption, setConsumption] = useState('');
//     const [tariffs, setTariffs] = useState([]);

//     const fetchTariffs = async () => {
//         const response = await fetch(`https://localhost:7068/api/tariffcomparison/${consumption}`);
//         const data = await response.json();
//         setTariffs(data);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetchTariffs();
//     };

//     return (
//         <div className="App">
//             <h1>Tariff Comparison</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Annual Consumption (kWh):
//                     <input
//                         type="number"
//                         value={consumption}
//                         onChange={(e) => setConsumption(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <button type="submit">Compare Tariffs</button>
//             </form>
//             <h2>Results</h2>
//             <ul>
//                 {tariffs.map((tariff, index) => (
//                     <li key={index}>
//                         {tariff.tariffName}: {tariff.annualCost} €
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [consumption, setConsumption] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const API_BASE_URL = 'https://localhost:7068/api/tariffcomparison';

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="container">
      <h1>Electricity Tariff Comparison</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="consumption">Annual Consumption (kWh):</label>
          <input
            type="number"
            id="consumption"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            min="0"
            required
          />
        </div>
        <button type="submit">Compare Tariffs</button>
      </form>

      {error && <p className="error">{error}</p>}

      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Tariff Name</th>
              <th>Annual Cost (€)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.tariffName}>
                <td>{result.tariffName}</td>
                <td>{result.annualCost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
