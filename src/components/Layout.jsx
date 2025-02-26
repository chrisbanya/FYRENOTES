import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemText } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router";
import menuItems from "./MenuItems";
import { LayoutClasses } from "./Utils";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SignOutBtn from "./SignOutBtn";
import Stack from "@mui/material/Stack";
import { auth } from "../firebase/config";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth?.currentUser?.email;

  return (
    <Box sx={LayoutClasses.root}>
      <AppBar sx={LayoutClasses.appBar}>
        <Toolbar>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box>
              <Typography>Welcome to DevChris notes website</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <Typography>{user}</Typography>
              <SignOutBtn />
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      {/* margin between appBar and content */}
      <Box sx={LayoutClasses.toolbar}></Box>

      <Drawer sx={LayoutClasses.drawer} variant="permanent" anchor="left">
        <div>
          <Typography variant="h5" sx={LayoutClasses.title} color="secondary">
            Notes
          </Typography>
        </div>
        {/* sidebar list items */}
        <List>
          {menuItems.map((lists) => (
            <ListItem key={lists.text}>
              <ListItemButton
                onClick={() => navigate(lists.path)}
                selected={location.pathname === lists.path}
              >
                <ListItemIcon>{lists.icon}</ListItemIcon>
                <ListItemText>{lists.text}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* outlet for create and notes pages */}

      <Box sx={LayoutClasses.layoutEffect}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
