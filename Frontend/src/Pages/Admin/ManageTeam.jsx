import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PauseIcon from '@mui/icons-material/Pause';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Super Admin
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'; // Service Manager
import GroupIcon from '@mui/icons-material/Group'; // User Manager
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Billing & Payment Administrator

const usersData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', role: 'Service Manager', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', role: 'Super Admin', status: 'Inactive' },
  { id: 3, name: 'Mark Johnson', email: 'mark.johnson@example.com', phone: '555-555-5555', role: 'User Manager', status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '333-333-3333', role: 'Billing & Payment Administrator', status: 'Inactive' },
  // Add more user objects as needed
];

function ManageTeam() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUserId, setSelectedUserId] = React.useState(null);

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
    // Implement your action logic (e.g., edit, suspend, delete)
    handleMenuClose();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'role',
      headerName: 'Role',
      width: 250,
      renderCell: (params) => (
        <div className="flex items-center">
          {params.value === 'Super Admin' && (
            <>
              <AdminPanelSettingsIcon style={{ color: 'purple', marginRight: 4 }} />
              <span>Super Admin</span>
            </>
          )}
          {params.value === 'Service Manager' && (
            <>
              <SupervisorAccountIcon style={{ color: 'blue', marginRight: 4 }} />
              <span>Service Manager</span>
            </>
          )}
          {params.value === 'User Manager' && (
            <>
              <GroupIcon style={{ color: 'orange', marginRight: 4 }} />
              <span>User Manager</span>
            </>
          )}
          {params.value === 'Billing & Payment Administrator' && (
            <>
              <AttachMoneyIcon style={{ color: 'green', marginRight: 4 }} />
              <span>Billing & Payment Administrator</span>
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
            fontWeight: 'bold', // Make the text bold
            padding: '5px 10px',
            textAlign: 'center',
            borderRadius: '5px', // Optional, for rounded corners
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
    <div style={{ height: 400, width: '100%' }}>
      <h2 className="text-2xl font-semibold mb-4">Manage Team</h2>
      <DataGrid
        rows={usersData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
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

export default ManageTeam;
