import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Report = () => {
  const reportData = [
    {
      id: 1,
      reportId: 'R001',
      userEmail: 'user1@example.com',
      spEmail: 'sp1@example.com',
      billId: 'B001',
      reportDate: '2024-11-01',
      reportDescription: 'Issue with the service quality.',
      reportType: 'Service',
      reportStatus: 'Pending',
    },
    {
      id: 2,
      reportId: 'R002',
      userEmail: 'user2@example.com',
      spEmail: 'sp2@example.com',
      billId: 'B002',
      reportDate: '2024-11-02',
      reportDescription: 'Incorrect billing details.',
      reportType: 'Billing',
      reportStatus: 'Resolved',
    },
    {
      id: 3,
      reportId: 'R003',
      userEmail: 'user3@example.com',
      spEmail: 'sp3@example.com',
      billId: 'B003',
      reportDate: '2024-11-03',
      reportDescription: 'Delay in service delivery.',
      reportType: 'Service',
      reportStatus: 'In Progress',
    },
  ];

  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedReportStatus, setSelectedReportStatus] = useState('');
  const [filteredData, setFilteredData] = useState(reportData);

  const reportTypes = [...new Set(reportData.map((data) => data.reportType))];
  const reportStatuses = [...new Set(reportData.map((data) => data.reportStatus))];

  useEffect(() => {
    // Update filtered data when filters change
    const filtered = reportData.filter((data) => {
      return (
        (selectedReportType === '' || data.reportType === selectedReportType) &&
        (selectedReportStatus === '' || data.reportStatus === selectedReportStatus)
      );
    });
    setFilteredData(filtered);
  }, [selectedReportType, selectedReportStatus]); // Dependencies to trigger re-filtering

  const handleResolve = (id) => {
    alert(`Resolved report with ID: ${id}`);
    // Add your logic for resolving the report here
  };

  const handleDelete = (id) => {
    alert(`Deleted report with ID: ${id}`);
    // Add your logic for deleting the report here
  };

  const columns = [
    { field: 'reportId', headerName: 'Report ID', width: 150 },
    { field: 'userEmail', headerName: 'User Email', width: 200 },
    { field: 'spEmail', headerName: 'SP Email', width: 200 },
    { field: 'billId', headerName: 'Bill ID', width: 150 },
    { field: 'reportDate', headerName: 'Report Date', width: 150 },
    { field: 'reportDescription', headerName: 'Description', width: 300 },
    { field: 'reportType', headerName: 'Report Type', width: 150 },
    { field: 'reportStatus', headerName: 'Report Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleResolve(params.row.id)}
            style={{ marginRight: '10px' }}
          >
            Resolve
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Report Management
      </Typography>

      {/* Filter Options */}
      <Box display="flex" gap={2} mb={2} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Report Type</InputLabel>
          <Select
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
            label="Report Type"
          >
            <MenuItem value="">All</MenuItem>
            {reportTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Report Status</InputLabel>
          <Select
            value={selectedReportStatus}
            onChange={(e) => setSelectedReportStatus(e.target.value)}
            label="Report Status"
          >
            <MenuItem value="">All</MenuItem>
            {reportStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* DataGrid for Report Management */}
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
              color: 'black',
              fontWeight: 'bold',
              fontSize: '16px',
            },
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

export default Report;
