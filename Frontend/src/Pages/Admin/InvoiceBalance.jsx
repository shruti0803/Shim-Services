import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, IconButton } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/WorkOutline';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import HomeIcon from '@mui/icons-material/Home';

const invoiceData = [
  {
    id: 1,
    billId: 'INV001',
    billDate: '2024-11-01',
    billMode: 'Credit Card',
    totalCost: 150.00,
    paymentId: 'PAY123',
    spEmail: 'serviceprovider@example.com',
    uEmail: 'user@example.com',
    serviceName: 'Web Development',
    serviceCategory: 'IT Services',
    address: '123 Main St, City, State, 12345'
  },
  {
    id: 2,
    billId: 'INV002',
    billDate: '2024-11-02',
    billMode: 'PayPal',
    totalCost: 300.00,
    paymentId: 'PAY124',
    spEmail: 'anotherprovider@example.com',
    uEmail: 'user2@example.com',
    serviceName: 'Graphic Design',
    serviceCategory: 'Design Services',
    address: '456 Elm St, City, State, 67890'
  },
  // Add more invoice objects as needed
];

function InvoiceBalance() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'billId',
      headerName: 'Bill ID',
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center">
          {/* <WorkIcon style={{ color: 'gray', marginRight: 4 }} /> */}
          {params.value}
        </div>
      ),
    },
    {
      field: 'billDate',
      headerName: 'Bill Date',
      width: 120,
    },
    {
      field: 'billMode',
      headerName: 'Bill Mode',
      width: 120,
      renderCell: (params) => (
        <div className="flex items-center">
          <PaymentIcon style={{ color: 'green', marginRight: 4 }} />
          {params.value}
        </div>
      ),
    },
    {
      field: 'totalCost',
      headerName: 'Total Cost',
      width: 120,
      valueFormatter: ({ value }) => {
        // Ensure that value is not undefined or null before formatting
        return value !== undefined && value !== null ? `$${value.toFixed(2)}` : '$0.00';
      }
    },
    {
      field: 'paymentId',
      headerName: 'Payment ID',
      width: 120,
      renderCell: (params) => (
        <div className="flex items-center">
          {/* <PaymentIcon style={{ color: 'blue', marginRight: 4 }} /> */}
          {params.value}
        </div>
      ),
    },
    {
      field: 'spEmail',
      headerName: 'SP Email',
      width: 180,
      renderCell: (params) => (
        <div className="flex items-center">
          <WorkIcon style={{ color: 'purple', marginRight: 4 }} />
          {params.value}
        </div>
      ),
    },
    {
      field: 'uEmail',
      headerName: 'U Email',
      width: 180,
      renderCell: (params) => (
        <div className="flex items-center">
          
          <PersonIcon style={{ color: 'blue', marginRight: 4 }} />
          {params.value}
        </div>
      ),
    },
    {
      field: 'serviceName',
      headerName: 'Service Name',
      width: 180,
      renderCell: (params) => (
        <div className="flex items-center">
          {/* <WorkIcon style={{ color: 'orange', marginRight: 4 }} /> */}
          {params.value}
        </div>
      ),
    },
    {
      field: 'serviceCategory',
      headerName: 'Service Category',
      width: 180,
      renderCell: (params) => (
        <div className="flex items-center">
          {/* <WorkIcon style={{ color: 'darkgray', marginRight: 4 }} /> */}
          {params.value}
        </div>
      ),
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 250,
      renderCell: (params) => (
        <div className="flex items-center">
          <HomeIcon style={{ color: 'brown', marginRight: 4 }} />
          {params.value}
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <h2 className="text-3xl font-extrabold mb-4">Invoice Balance</h2>
      <DataGrid
        rows={invoiceData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#3f51b5',
            color: 'black',
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
  );
}

export default InvoiceBalance;
