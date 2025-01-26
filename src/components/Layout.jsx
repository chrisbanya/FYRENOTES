import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import { ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import menuItems from "./MenuItems";
import { LayoutClasses} from "./Utils";



const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box sx={LayoutClasses.root}>
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
      {/* output for either create or notes pages */}
      <Box sx={LayoutClasses.layoutEffect}>{children}</Box>
    </Box>
  );
};

export default Layout;
