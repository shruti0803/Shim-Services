import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);
import 'leaflet/dist/leaflet.css';

const Landing = () => {
  // State for selecting month and year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 0 for January, 11 for December
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Generate data for the selected month dynamically
  const generateRevenueData = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the selected month
    const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    const data = Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 5000) + 100); // Random revenue data for demonstration
    

    return {
      labels,
      datasets: [
        {
          label: 'Money Obtained ($)',
          data,
          borderColor: 'green',
          backgroundColor: 'rgba(0, 128, 0, 0.1)',
          fill: false,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'green',
        },
      ],
    };
  };

  const [dailyRevenueData, setDailyRevenueData] = useState(generateRevenueData(selectedMonth, selectedYear));

  // Update chart data when the month or year changes
  useEffect(() => {
    setDailyRevenueData(generateRevenueData(selectedMonth, selectedYear));
  }, [selectedMonth, selectedYear]);

  // Chart options for the revenue chart
  const RevenueChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days of the Month',
        },
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10, // Adjust this value for more/less spacing
        },
      },
      y: {
        title: {
          display: true,
          text: 'Money Obtained ($)',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  // Data for a smooth mountain-like curve
  const waveData = {
    labels: ['1', '2', '3', '4', '5'], // Example x-axis labels
    datasets: [
      {
        label: 'Mountain Curve',
        data: [0, 1, 0.5, 1.5, 1], // Adjusted data points for a peak and trough shape
        borderColor: 'green',
        borderWidth: 2,
        tension: 0.4, // Smooth curve
        pointRadius: 0, // No points on the curve
        fill: true, // Fill area under the curve
        backgroundColor: 'rgba(0, 128, 0, 0.3)', // Light green with transparency for the shadow area
      },
    ],
  };

  // Chart options for the curve
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  };

  // Data for Line Chart (Sales Obtained)
  const salesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Example labels
    datasets: [
      {
        label: 'Sales Obtained',
        data: [10000, 12000, 15000, 20000], // Example data points
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.1)',
        fill: true,
        tension: 0.4, // Smooth line
        borderWidth: 2,
      },
    ],
  };

  // Line Chart options
  const salesOptions = {
    responsive: true,
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  // Data for Pie Charts
  const newCustomersData = {
    labels: ['Returning Customers', 'New Customers'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const newServiceProvidersData = {
    labels: ['Existing Providers', 'New Providers'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FFCE56', '#4BC0C0'],
      },
    ],
  };
  const monthOptions = Array.from({ length: 12 }, (_, i) => (
    <option key={i} value={i}>
      {new Date(0, i).toLocaleString('default', { month: 'long' })}
    </option>
  ));

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => (
    <option key={currentYear - i} value={currentYear - i}>
      {currentYear - i}
    </option>
  ));

  const servicesData = {
    labels: [
      'Appliance Repair', 'Automobile Services', 'Beauty Services', 'Carpentry',
      'Electrical Repair', 'Gardening Services', 'House Cleaning', 'Network Services',
      'Painting Services', 'Pest Control', 'Plumbing Services'
    ],
    datasets: [
      {
        data: [10, 20, 15, 8, 18, 12, 14, 6, 7, 11, 9], // Example data for number of bookings
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039', '#900C3F',
          '#581845', '#DAF7A6', '#FFC300', '#FF6F61', '#FAD02E'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039', '#900C3F',
          '#581845', '#DAF7A6', '#FFC300', '#FF6F61', '#FAD02E'
        ],
      },
    ],
  };

  const cityBookingsData = [
    { city: 'Delhi', bookings: 500 },
    { city: 'Mumbai', bookings: 600 },
    { city: 'Bangalore', bookings: 450 },
    { city: 'Kolkata', bookings: 300 },
    { city: 'Chennai', bookings: 400 },
    { city: 'Hyderabad', bookings: 350 },
    // Add more cities as needed
  ];

  return (
    <div className="w-full bg-gray-100 p-8">
      {/* Row with three equal-sized cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sales Obtained */}
        <div className="bg-yellow-500 text-black p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Sales Obtained</h2>
          <p>Total Sales This Month</p>
          <h3 className="text-3xl font-bold text-green-800">$42,500</h3>
          {/* Line Chart with custom mountain-like curve */}
          <div className="mt-4">
            <div className="w-full h-40">
              <Line data={waveData} options={chartOptions} height={150} width={300} />
            </div>
          </div>
        </div>

        {/* New Customers */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Customers Analytics</h2>
          <div className="mt-4 flex items-center justify-between">
            {/* Pie Chart */}
            <div className="w-40 h-40">
              <Pie data={newCustomersData} options={{ responsive: true }} />
            </div>
            {/* Stats */}
            <div className="ml-6">
              <div className="mb-4">
                <p className="font-semibold">New Customers</p>
                <p className="text-green-500 font-bold">1,000</p>
              </div>
              <div>
                <p className="font-semibold">Total Customers</p>
                <p className="text-blue-500 font-bold">5,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* New Service Providers */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Service Providers Analytics</h2>
          <div className="mt-4 flex items-center justify-between">
            {/* Pie Chart */}
            <div className="w-40 h-40">
              <Pie data={newServiceProvidersData} options={{ responsive: true }} />
            </div>
            {/* Stats */}
            <div className="ml-6">
              <div className="mb-4">
                <p className="font-semibold">New Providers</p>
                <p className="text-green-500 font-bold">300</p>
              </div>
              <div>
                <p className="font-semibold">Total Providers</p>
                <p className="text-blue-500 font-bold">1,200</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Generated Card with month and year selector */}
      <div className="p-6 rounded-lg shadow-lg mt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Revenue Generated</h2>
            <p className="text-3xl font-bold text-green-800">$59,342.32</p>
          </div>
          <div>
            <label className="mr-2">Month:</label>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className="p-2 border rounded">
              {monthOptions}
            </select>
            <label className="ml-4 mr-2">Year:</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="p-2 border rounded">
              {yearOptions}
            </select>
          </div>
        </div>
        <div className="mt-4" style={{ width: '100%', height: '400px' }}>
          <Line data={dailyRevenueData} options={RevenueChartOptions} />
        </div>
      </div>
      {/* Services Booked and geography graph  */}
      <div className='flex flex-col md:flex-row'>
  <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-1/2">
    <h2 className="text-2xl font-semibold">Services Booked</h2>
    <div className="mt-4 flex justify-center">
      <div className="w-80 h-80">
        <Pie data={servicesData} options={{ responsive: true }} />
      </div>
    </div>
  </div>

  {/* Geography Chart (India map) with city markers */}
  <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-1/2">
    <h2 className="text-2xl font-semibold">Bookings by City</h2>
    <div className="mt-4" style={{ height: '400px' }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cityBookingsData.map((city, index) => (
          <Marker
            key={index}
            position={[20 + Math.random() * 5, 78 + Math.random() * 5]} // Example coordinates
            icon={L.divIcon({
              className: 'custom-icon',
              html: `<div style="background-color: #3388ff; color: white; padding: 5px; border-radius: 5px;">${city.bookings}</div>`,
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            })}
          >
            <Popup>
              <h3>{city.city}</h3>
              <p>Bookings: {city.bookings}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  </div>
</div>

    </div>
  );
};

export default Landing;
