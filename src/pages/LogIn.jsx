import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
// import CircularProgress from "@mui/material/CircularProgress";
import { CredentialStyle } from "../components/Utils";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
// import CircularProgressComp from "../components/CircularProgressComp";
import ErrorComp from "../components/ErrorComp";
import Swal from "sweetalert2";

const LogIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setError("");
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    if (credentials.email == "") {
      setEmailError(true);
    }
    if (credentials.password == "") {
      setPasswordError(true);
    }
    if (credentials.email !== "" && credentials.password !== "") {
      // setIsLoading(true);
      try {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });
        const userCredential = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        Swal.fire({
          icon: "success",
          iconColor: "#9c27b0",
          title: "Successfully logged in!",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: "swal-title",
            popup: "swal-popup",
          },
        });
        setTimeout(() => navigate("/"), 2000);
      } catch (error) {
        // ToDo: implement custom error codes
        Swal.fire({
          icon: "error",
          iconColor: "#9c27b0",
          title: "Login Failed",
          text: error.message,
          showConfirmButton: true,
          customClass: {
            title: "swal-title",
            popup: "swal-popup",
          },
        });
      }
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={CredentialStyle.center}>
        {/* {isLoading && (
         <CircularProgressComp/>
        )} */}

          <Typography component="h1" variant="h5" align="center" color="primary" sx={{mb: 2}}>
            FYRENOTES
          </Typography>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={credentials.email}
                onChange={handleChange}
                error={emailError}
                helperText={emailError ? "Email is required" : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={passwordError}
                onChange={handleChange}
                helperText={
                  passwordError ? "Passwords must be atleast 6 characters" : ""
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              {error && <ErrorComp error={error} />}
              <Typography component="h3" variant="subtitle1" align="center">
                Don&apos;t have an account? <Link to="/Register">Register</Link>
              </Typography>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LogIn;
