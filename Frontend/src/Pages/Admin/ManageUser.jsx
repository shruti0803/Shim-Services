import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem, Select, MenuItem as MuiMenuItem, FormControl, InputLabel } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PauseIcon from '@mui/icons-material/Pause';
import PersonIcon from '@mui/icons-material/PersonOutlined'; // Outline version
import WorkIcon from '@mui/icons-material/WorkOutline'; // Outline version

const usersData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', role: 'User', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', role: 'Service Provider', status: 'Inactive' },
  // Add more user objects as needed
];

function ManageUser() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filteredRole, setFilteredRole] = useState('');
  const [filteredStatus, setFilteredStatus] = useState('');

  const handleMenuClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleAction = (action) => {
    console.log(`Action: ${action} on user with ID: ${selectedUserId}`);
    handleMenuClose();
  };

  // Filter the data based on the selected role and status
  const filteredData = usersData.filter(user => {
    return (
      (filteredRole === '' || user.role === filteredRole) &&
      (filteredStatus === '' || user.status === filteredStatus)
    );
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'role',
      headerName: 'Role',
      width: 180,
      renderCell: (params) => (
        <div className="flex items-center">
          {params.value === 'Service Provider' ? (
            <>
              <WorkIcon style={{ color: 'green', marginRight: 4 }} />
              <span>Service Provider</span>
            </>
          ) : (
            <>
              <PersonIcon style={{ color: 'blue', marginRight: 4 }} />
              <span>User</span>
            </>
          )}
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <div
          style={{
            color: params.value === 'Active' ? 'green' : 'gray',
            fontWeight: 'bold',
            padding: '5px 10px',
            textAlign: 'center',
            borderRadius: '5px',
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <div className="flex justify-around">
          <IconButton style={{ color: 'blue' }} onClick={() => console.log(`Viewing user ${params.id}`)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton style={{ color: 'red' }} onClick={() => console.log(`Deleting user ${params.id}`)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={(e) => handleMenuClick(e, params.id)}>
            <MoreVertIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      {/* Filter section */}
      <h1>Filter</h1>
      <div className="mb-4 flex">
        
      <FormControl style={{ width: 150, marginRight: 10 }}>
  <Select
    value={filteredRole}
    onChange={(e) => setFilteredRole(e.target.value)}
    displayEmpty
    renderValue={(selected) => {
      return selected === '' ? <span style={{ color: 'gray' }}>Select Role</span> : selected;
    }}
  >
    <MuiMenuItem value="" sx={{ color: 'gray' }}>Select Role</MuiMenuItem>
    <MuiMenuItem value="User">User</MuiMenuItem>
    <MuiMenuItem value="Service Provider">Service Provider</MuiMenuItem>
  </Select>
</FormControl>

<FormControl style={{ width: 150 }}>
  <Select
    value={filteredStatus}
    onChange={(e) => setFilteredStatus(e.target.value)}
    displayEmpty
    renderValue={(selected) => {
      return selected === '' ? <span style={{ color: 'gray' }}>Select Status</span> : selected;
    }}
  >
    <MuiMenuItem value="" sx={{ color: 'gray' }}>Select Status</MuiMenuItem>
    <MuiMenuItem value="Active">Active</MuiMenuItem>
    <MuiMenuItem value="Inactive">Inactive</MuiMenuItem>
  </Select>
</FormControl>

      </div>
      {/* Data table */}
      <div style={{ height: 400 }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </div>
      {/* Menu for actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        <MenuItem onClick={() => handleAction('Edit')}>
          <EditIcon /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleAction('Suspend')}>
          <PauseIcon /> Suspend
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ManageUser;
