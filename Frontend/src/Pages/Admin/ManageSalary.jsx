import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ManageSalary = () => {
  // Sample data for the salary management table
  const salaryData = [
    {
      id: 1,
      spEmail: 'sp1@example.com',
      accountNumber: '1234567890',
      ifscCode: 'ABC1234',
      bankName: 'XYZ Bank',
      branchName: 'Downtown',
      address: '123 Main St, City, State',
      salary: 50000,
      amountToPay: 30000,
      month: 'November',
      year: 2024,
      serviceName: 'Plumbing Services',
    },
    {
      id: 2,
      spEmail: 'sp2@example.com',
      accountNumber: '9876543210',
      ifscCode: 'DEF5678',
      bankName: 'LMN Bank',
      branchName: 'Uptown',
      address: '456 Elm St, City, State',
      salary: 40000,
      amountToPay: 40000,
      month: 'November',
      year: 2024,
      serviceName: 'Electrical Repair',
    },
    {
      id: 3,
      spEmail: 'sp3@example.com',
      accountNumber: '1122334455',
      ifscCode: 'GHI9101',
      bankName: 'PQR Bank',
      branchName: 'Midtown',
      address: '789 Oak St, City, State',
      salary: 60000,
      amountToPay: 50000,
      month: 'October',
      year: 2024,
      serviceName: 'Carpentry',
    },
    // Add more data as needed
  ];

  // State for filters
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedService, setSelectedService] = useState('');

  // Unique values for the filters
  const months = [...new Set(salaryData.map((data) => data.month))];
  const years = [...new Set(salaryData.map((data) => data.year))];
  const serviceNames = [...new Set(salaryData.map((data) => data.serviceName))];

  // Filtered data based on the selected filters
  const filteredData = salaryData.filter((data) => {
    return (
      (selectedMonth === '' || data.month === selectedMonth) &&
      (selectedYear === '' || data.year === selectedYear) &&
      (selectedService === '' || data.serviceName === selectedService)
    );
  });

  // useEffect to run when filters change
  useEffect(() => {
    console.log('Filters updated:', { selectedMonth, selectedYear, selectedService });
  }, [selectedMonth, selectedYear, selectedService]);

  // Define columns for the DataGrid with an added Index column
  const columns = [
    {
      field: 'index',
      headerName: 'Index',
      width: 80,
      renderCell: (params) => params.row.id,
    },
    { field: 'spEmail', headerName: 'SP Email', width: 180 },
    { field: 'accountNumber', headerName: 'Account Number', width: 150 },
    { field: 'ifscCode', headerName: 'IFSC Code', width: 130 },
    { field: 'bankName', headerName: 'Bank Name', width: 150 },
    { field: 'branchName', headerName: 'Branch Name', width: 150 },
    { field: 'address', headerName: 'Address', width: 180 },
    { field: 'serviceName', headerName: 'Service Name', width: 180 },
    { field: 'salary', headerName: 'Salary', type: 'number', width: 120 },
    { field: 'amountToPay', headerName: 'Amount to Pay', type: 'number', width: 150 },
    { field: 'month', headerName: 'Month', width: 120 },
    { field: 'year', headerName: 'Year', type: 'year', width: 100 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        const { salary, amountToPay } = params.row;
        return salary > amountToPay ? (
          <Button variant="contained" color="primary">
            Pay Salary
          </Button>
        ) : (
          <Typography color="textSecondary">Paid</Typography>
        );
      },
    },
  ];

  return (
    <Box p={3}>
      <h2 className="text-3xl font-extrabold mb-4">Manage Salary</h2>

      {/* Filter Options */}
      <Box display="flex" gap={2} mb={2} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Month"
          >
            <MenuItem value="">All</MenuItem>
            {months.map((month) => (
              <MenuItem key={month} value={month}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year"
          >
            <MenuItem value="">All</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Service</InputLabel>
          <Select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            label="Service"
          >
            <MenuItem value="">All</MenuItem>
            {serviceNames.map((service) => (
              <MenuItem key={service} value={service}>{service}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* DataGrid for Salary Management */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          getRowId={(row) => row.id}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#3f51b5',
      color: 'black', // Adjust color if needed
      fontWeight: 'bold',
      fontSize: '16px', // Increase size for readability
    },
    // '& .MuiDataGrid-columnHeaderTitle': {
    //   fontSize: '16px', // Ensure the column header title is larger
    // },
            '& .MuiDataGrid-cell:hover': {
              backgroundColor: '#e3f2fd',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#e0e0e0',
            },
          }}
        />
      </div>
    </Box>
  );
};

export default ManageSalary;
