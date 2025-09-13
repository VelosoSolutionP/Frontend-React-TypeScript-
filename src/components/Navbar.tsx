import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { User } from "../types/User";

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Dashboard
      </Typography>
      <Typography sx={{ mr: 2 }}>{user.username}</Typography>
      <Button color="inherit" onClick={onLogout}>Sair</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;