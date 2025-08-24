import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ onAddAgendaClick ,onViewAgendaClick}) {
  return (
    <AppBar  sx={{ backgroundColor: "white", color: "black" ,position:"sticky" }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Agenda maker
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            mx: 1,
            border: "1px solid #0051a3ff",
            "&:hover": { backgroundColor: "#125aa0" },
          }}
          onClick={onAddAgendaClick}
        >
          Add Agenda
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid #ccc",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          onClick={onViewAgendaClick}
        >
          View Agenda
        </Button>
      </Toolbar>
    </AppBar>
  );
}
