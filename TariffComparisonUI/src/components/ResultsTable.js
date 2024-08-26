import React from 'react';

const ResultsTable = ({ results }) => (
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
);

export default ResultsTable;
