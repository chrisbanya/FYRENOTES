import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Create } from "./pages/Create";
import { Notes } from "./pages/Notes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Layout from "./components/Layout";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightBold: 700,
    fontWeightMedium: 600,
  },
  zIndex: {
    appBar: 1200, 
    drawer: 1100,
    snackbar: 1300, // Ensures the toast notification has a higher z-index
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Notes />} />
              <Route path="Create" element={<Create />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
