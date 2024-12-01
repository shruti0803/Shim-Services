import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const servicesData = [
  { id: 1, serviceName: 'Web Development', serviceCategory: 'IT & Software', initialPrice: 500 },
  { id: 2, serviceName: 'Graphic Design', serviceCategory: 'Design', initialPrice: 300 },
  { id: 3, serviceName: 'Digital Marketing', serviceCategory: 'Marketing', initialPrice: 400 },
  { id: 4, serviceName: 'SEO Optimization', serviceCategory: 'Marketing', initialPrice: 200 },
  { id: 5, serviceName: 'App Development', serviceCategory: 'IT & Software', initialPrice: 600 },
];

function ManageService() {
  const [filteredData, setFilteredData] = useState(servicesData);
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: '',
    serviceCategory: '',
    initialPrice: '',
  });

  const handleEdit = (id) => {
    console.log(`Edit service with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete service with ID: ${id}`);
  };

  // Filter logic using useEffect
  useEffect(() => {
    if (!selectedServiceName) {
      setSelectedCategory('');
    }

    let filtered = servicesData;

    if (selectedServiceName) {
      filtered = filtered.filter((service) => service.serviceName === selectedServiceName);
    }

    if (selectedCategory) {
      filtered = filtered.filter((service) => service.serviceCategory === selectedCategory);
    }

    setFilteredData(filtered);
  }, [selectedServiceName, selectedCategory]);

  const handleAddService = () => {
    const newId = Math.max(...servicesData.map((s) => s.id)) + 1;
    const service = {
      id: newId,
      serviceName: newService.serviceName,
      serviceCategory: newService.serviceCategory,
      initialPrice: parseFloat(newService.initialPrice),
    };

    setFilteredData((prev) => [...prev, service]);
    setIsDialogOpen(false);
    setNewService({ serviceName: '', serviceCategory: '', initialPrice: '' });
  };

  const columns = [
    { field: 'serviceName', headerName: 'Service Name', width: 200 },
    { field: 'serviceCategory', headerName: 'Service Category', width: 200 },
    {
      field: 'initialPrice',
      headerName: 'Initial Price',
      width: 150,
      valueFormatter: (params) => {
        if (!params || params.value === null || params.value === undefined) {
          return '$0.00';
        }
        return `$${params.value.toFixed(2)}`;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row.id)}
            title="Edit Service"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
            title="Delete Service"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <h2 className="text-3xl font-extrabold mb-4">Manage Services</h2>

      {/* Filter Section */}
      <Box  p={2} sx={{ border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
      <div className="flex justify-between items-center">
      
        <div className="flex gap-4">
          
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel id="filter-service-name">Service Name</InputLabel>
            <Select
              labelId="filter-service-name"
              value={selectedServiceName}
              onChange={(e) => setSelectedServiceName(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {Array.from(new Set(servicesData.map((service) => service.serviceName))).map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={{ minWidth: 200 }}>
            <InputLabel id="filter-service-category">Service Category</InputLabel>
            <Select
              labelId="filter-service-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {Array.from(new Set(servicesData.map((service) => service.serviceCategory))).map(
                (category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>
        
        <Button  variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={() => setIsDialogOpen(true)}>
          Add Service
        </Button>
      </div>
      </Box>
      


      {/* Data Grid */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '8px' }}
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

      {/* Add Service Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Service</DialogTitle>
        <DialogContent>
          <TextField
            label="Service Name"
            fullWidth
            margin="dense"
            value={newService.serviceName}
            onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
          />
          <TextField
            label="Service Category"
            fullWidth
            margin="dense"
            value={newService.serviceCategory}
            onChange={(e) => setNewService({ ...newService, serviceCategory: e.target.value })}
          />
          <TextField
            label="Initial Cost"
            type="number"
            fullWidth
            margin="dense"
            value={newService.initialPrice}
            onChange={(e) => setNewService({ ...newService, initialPrice: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddService} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManageService;
