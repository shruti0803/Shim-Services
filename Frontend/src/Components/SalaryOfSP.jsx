import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalaryOfSP = ({ SP_Email }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const [cashMonthlyTotals, setCashMonthlyTotals] = useState([]);
  const [onlineMonthlyTotals, setOnlineMonthlyTotals] = useState([]);
  const [error, setError] = useState('');

  // Fetch monthly totals for both cash and online payments
  useEffect(() => {
    const fetchMonthlyTotals = async (billMode, setMonthlyTotals) => {
      try {
        const monthlyTotals = [];

        // Loop through all months (01 to 12)
        for (let month = 1; month <= 12; month++) {
          // Format month to two digits (e.g., '01', '02', ..., '12')
          const formattedMonth = month < 10 ? `0${month}` : `${month}`;

          const response = await axios.get('http://localhost:4002/fetchTotalCostForSPMonthly', {
            params: {
              SP_Email,
              Bill_Mode: billMode,
              Month: formattedMonth, // Pass the formatted month (e.g., '01', '02')
              Year: selectedYear,
            },
          });

          // Ensure TotalCost is a valid number
          const totalCost = isNaN(response.data.TotalCost) ? 0 : response.data.TotalCost;

          // Add the result for the current month to the monthly totals array
          monthlyTotals.push(totalCost);
        }

        // Set the state with all 12 monthly totals
        setMonthlyTotals(monthlyTotals);
      } catch (error) {
        console.error(`Error fetching ${billMode} monthly totals:`, error);
        setError(`Error fetching ${billMode} monthly totals`);
      }
    };

    // Fetch totals for both cash and online
    fetchMonthlyTotals('cash', setCashMonthlyTotals);
    fetchMonthlyTotals('online', setOnlineMonthlyTotals);
  }, [SP_Email, selectedYear]);

  // Handle year selection change
  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value)); // Convert the string value to a number
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
      {/* Year selection dropdown */}
      <div className="mb-4">
        <label className="mr-2 text-lg">Select Year:</label>
        <select 
          value={selectedYear} 
          onChange={handleYearChange} 
          className="p-2 border rounded-md"
        >
          {/* List of years (you can customize this list) */}
          {[2023, 2024, 2025, 2026].map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <h3 className="text-lg font-semibold flex items-center space-x-2">
        <i className="fas fa-money-bill text-green-500"></i>
        <span>Monthly Salary Information for {selectedYear}</span>
      </h3>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <table className="mt-4 w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Month</th>
            <th className="border px-4 py-2">Cash Total</th>
            <th className="border px-4 py-2">Online Total</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 12 }).map((_, monthIndex) => (
            <tr key={monthIndex}>
              <td className="border px-4 py-2">
                {new Date(0, monthIndex).toLocaleString('en', { month: 'long' })}
              </td>
              <td className="border px-4 py-2">
                ₹{cashMonthlyTotals[monthIndex] || 0}
              </td>
              <td className="border px-4 py-2">
                ₹{onlineMonthlyTotals[monthIndex] || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryOfSP;
