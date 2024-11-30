import React from "react";
import {
  Box,
  IconButton,
  InputBase,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SearchOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { useAuthAdmin } from "../../context/AdminContext";

const Navbar = () => {
  const {admin}=useAuthAdmin();
  console.log( "admin navbar",admin);
  
  return (
    <Box className="flex items-center justify-between py-4 w-full">
      <Box className="flex items-center gap-2 w-full">
        {/* Search bar for larger screens */}
        <Box className="hidden md:flex items-center h-12 bg-gray-200 rounded-lg w-full">
          <InputBase placeholder="Search" className="ml-2 flex-1" />
          <IconButton type="button" className="p-1">
            <SearchOutlined />
          </IconButton>
        </Box>
      </Box>

      <Box className="flex items-center gap-2">
        {/* Dark mode toggle */}
        {/* <IconButton>
          <LightModeOutlined />
        </IconButton> */}
        {/* Notifications */}
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        {/* Settings */}
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        {/* Profile */}
        <IconButton>
          <PersonOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
