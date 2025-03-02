import { blue,  green, red, yellow } from "@mui/material/colors";
import Swal from "sweetalert2";
// Notecard file styles
export const NoteCardClasses = {
  card: (note) => {
    if (note.category == "work") {
      return { border: "1px solid red" };
    }
    return {};
  },
  avatar: (note) => {
    if (note.category == "reminders") {
      return {
        backgroundColor: blue[500]
      }
    }
    if (note.category == "todos") {
      return {
        backgroundColor: yellow[700],
      };
    }
    if (note.category == "work") {
      return {
        backgroundColor: red[500]
      }
    }
  return {backgroundColor: green[500]}
  }
};
//Layout file styles
export const drawerWidth = 240;
export const LayoutClasses = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    ".MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  },
  root: {
    display: "flex",
  },
  layoutEffect: {
    backgroundColor: "#f9f9f9",
    width: "100%",
    padding: (theme) => theme.spacing(3),
    marginTop: "64px",
    
  },
  title: {
    padding: (theme) => theme.spacing(2),
  },
  appBar: {
    zIndex: (theme) => theme.zIndex.drawer + 1,
    width: "100%",
    // width: `calc(100% - ${drawerWidth}px)`,
  },
  toolbar: (theme) => theme.mixins.toolbar,
  toast: (theme) => theme.zIndex.drawer + 1,
};
// Log In & Sign In container styles
export const CredentialStyle = {
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
};

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: "swal2-toast"
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
