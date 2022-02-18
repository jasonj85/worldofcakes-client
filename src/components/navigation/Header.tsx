import { AdminPanelSettings, Restaurant } from "@mui/icons-material";
import {
  AppBar,
  Box,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DarkModeSwitch from "./DarkModeSwitch";

interface IProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Navigation links
const companyLinks = [
  { title: "cakes", path: "/catalog/cakes", icon: <Restaurant /> },
];
const adminLinks = [
  { title: "admin", path: "/admin", icon: <AdminPanelSettings /> },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "text.secondary",
  },
};

export default function Header({ darkMode, toggleDarkMode }: IProps) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            World of Cakes
          </Typography>
          <DarkModeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Box>
        <Box sx={{ marginLeft: 5, display: "flex" }}>
          <List sx={{ display: "flex" }}>
            {companyLinks.map(({ title, path, icon }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()} &nbsp; {icon}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <List sx={{ display: "flex" }}>
            {adminLinks.map(({ title, path, icon }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()} &nbsp; {icon}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
