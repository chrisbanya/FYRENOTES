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
import { LayoutClasses} from "./Utils";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";


const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
  return (
    <Box sx={LayoutClasses.root}>
      <AppBar sx={LayoutClasses.appBar}>
        <Toolbar>
          <Typography>welcome to DevChris notes website</Typography>
        </Toolbar>
      </AppBar>
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
        <Outlet/>
      </Box>
    </Box>
  );
};

export default Layout;
