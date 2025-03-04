import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemText, IconButton } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router";
import menuItems from "./MenuItems";
import { LayoutClasses } from "./Utils";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SignOutBtn from "./SignOutBtn";
import Stack from "@mui/material/Stack";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useCallback } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Menu as MenuIcon } from "@mui/icons-material";

// const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  // responsive drawer refs
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // gets the username ref initiated on register component
  const fetchUsername = useCallback(async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().username);
      }
    }
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUsername(currentUser);
      }
    });

    return () => unsubscribe();
  }, [fetchUsername]);

    const drawerContent = (
      <Box sx={{ width: 240 }}>
        {isMobile && (
          <Typography
            variant="h5"
            sx={{ marginTop: "4rem", paddingLeft: "18px" }}
            color="secondary"
          >
            FYRENOTES
          </Typography>
        )}
        <List>
          {!isMobile && (
            <Typography
              variant="h5"
              sx={{ marginTop: "4rem",  }}
            >
            </Typography>
          )}
          {menuItems.map((lists) => (
            <ListItem key={lists.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(lists.path);
                  if (isMobile) setMobileOpen(false); // Close drawer on mobile after navigation
                }}
                selected={location.pathname === lists.path}
              >
                <ListItemIcon>{lists.icon}</ListItemIcon>
                <ListItemText primary={lists.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );

  return (
    <Box sx={LayoutClasses.root}>
      {/* Top App Bar */}
      <AppBar sx={LayoutClasses.appBar}>
        <Toolbar>
          {/* Show Menu Icon only on mobile */}
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              color="inherit"
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
          {!isMobile && (
            <Typography variant="h5" sx={LayoutClasses.title} >
              FYRENOTES
            </Typography>
          )}
          <Stack
            direction="row"
            sx={{
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography>Hello, {username ? username : "Guest"}</Typography>
              <SignOutBtn />
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer (Permanent for Desktop, Temporary for Mobile) */}
      <Drawer
        sx={LayoutClasses.drawer}
        variant={isMobile ? "temporary" : "permanent"}
        // anchor="left"
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle} // Close when clicking outside on mobile
        ModalProps={{ keepMounted: true }} // Improves performance on mobile
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={LayoutClasses.layoutEffect}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
