import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Create } from "./pages/Create";
import { Notes } from "./pages/Notes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Layout from "./components/Layout";


const theme = createTheme({
 palette: {
  primary:{
    main: "#9c27b0"
  },
  secondary: purple
 }, 
 typography: {
  fontFamily: 'Quicksand',
  fontWeightLight: 400,
  fontWeightRegular: 500,
  fontWeightBold: 700,
  fontWeightMedium: 600
 }
})

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>

        <Router>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Notes />} />
              <Route path="/Create" element={<Create />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
