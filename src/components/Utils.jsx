// Notecard file styles
export const NoteCardClasses = {
  card: (note) => {
    if (note.category == "work") {
      return { border: "1px solid red" };
    }
    return {};
  },
};
//Layout file styles
export const drawerWidth = 240;
export const LayoutClasses = {
  drawer: {
    width: drawerWidth,
    ".MuiDrawer-paper": {
      width: drawerWidth,
    },
  },
  root: {
    display: "flex",
  },
  layoutEffect: {
    backgroundColor: "#f9f9f9",
    width: "100%",
    padding: (theme) => theme.spacing(3),
    marginTop: "60px",
  },
  title: {
    padding: (theme) => theme.spacing(2),
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  toolbar: (theme) => theme.mixins.toolbar,
};
export const CredentialStyle = {
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
};
