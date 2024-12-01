import React, { useEffect, useState } from 'react'; 
import { DataGrid } from '@mui/x-data-grid';
import PaymentIcon from '@mui/icons-material/Payment';
import WorkIcon from '@mui/icons-material/WorkOutline';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';

function InvoiceBalance() {
  const [invoiceData, setInvoiceData] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:4002/invoiceBalance')
      .then((response) => {
        const fetchedData = response.data.map((item) => ({
          bookId: item.Book_ID || item.Bill_ID, // Fallback to Bill_ID if Book_ID is null
          billId: item.Bill_ID,
          billDate: item.Bill_Date ? new Date(item.Bill_Date).toLocaleDateString() : 'N/A',
          billMode: item.Bill_Mode || 'N/A',
          totalCost: item.Total_Cost || 0, // Ensure that Total_Cost is fetched correctly
          paymentId: item.Payment_ID || 'N/A',
          spEmail: item.SP_Email || 'N/A',
          uEmail: item.U_Email || 'N/A',
          serviceName: item.Service_Name || 'N/A',
          serviceCategory: item.Service_Category || 'N/A',
          address: `${item.Book_HouseNo || ''}, ${item.Book_Area || ''}, ${item.Book_City || ''}, ${item.Book_State || ''} - ${item.Book_City_PIN || ''}`,
        }));

        // Filter out rows where bookId is still null (in case Bill_ID wasn't a valid fallback)
        const validRows = fetchedData.filter((row) => row.bookId !== null);

        // Set data only once
        setInvoiceData(validRows);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures it only runs once after mount

  const columns = [
    { field: 'bookId', headerName: 'Book ID', width: 120 },
    { field: 'billId', headerName: 'Bill ID', width: 150 },
    { field: 'billDate', headerName: 'Bill Date', width: 150 },
    {
      field: 'billMode',
      headerName: 'Bill Mode',
      width: 150,
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
      renderCell: (params) => `$${params.value.toFixed(2)}`, // Optionally format as currency
    },
    { field: 'paymentId', headerName: 'Payment ID', width: 150 },
    {
      field: 'spEmail',
      headerName: 'SP Email',
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center">
          <WorkIcon style={{ color: 'purple', marginRight: 4 }} />
          {params.value}
        </div>
      ),
    },
    {
      field: 'uEmail',
      headerName: 'User Email',
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center">
          <PersonIcon style={{ color: 'blue', marginRight: 4 }} />
          {params.value}
        </div>
      ),
    },
    { field: 'serviceName', headerName: 'Service Name', width: 200 },
    { field: 'serviceCategory', headerName: 'Service Category', width: 250 },
    {
      field: 'address',
      headerName: 'Address',
      width: 300,
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
        getRowId={(row) => row.bookId}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#3f51b5',
    color: 'black', // Adjust color if needed
    fontWeight: 'bold',
    fontSize: '16px', // Increase size for readability
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
