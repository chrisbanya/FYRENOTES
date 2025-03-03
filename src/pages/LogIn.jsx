import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { CredentialStyle } from "../components/Utils";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import ErrorComp from "../components/ErrorComp";
import Swal from "sweetalert2";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { VisibilityOff } from "@mui/icons-material";

const LogIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.prefill) {
      setCredentials((prev) => ({
        ...prev,
        email: location.state.prefill,
        password: "",
      }));
    }
  }, [location.state]);
  function handleChange(e) {
    setError("");
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  function handleVisibility() {
    setShowPwd((prev) => !prev);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (!credentials.email.trim()) {
      setEmailError(true);
    }
    if (!credentials.password.trim()) {
      setPasswordError(true);
    }
    if (!credentials.email.trim() || !credentials.password.trim()) {
      return;
    }
    if (!credentials.email.trim() && !credentials.password.trim()) {
      return;
    }
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
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      const errorMessages = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Try again!",
        "auth/invalid-email": "Invalid email format.",
        "auth/user-disabled": "This account has been disabled.",
        "auth/too-many-requests": "Too many failed attempts. Try again later.",
        "auth/invalid-credential":
          "Invalid email or password. Please check your credentials.",
      };

      // Defaults to Firebase error message if no custom message is found
      const errorMessage = errorMessages[error.code] || error.message;

      Swal.fire({
        icon: "error",
        iconColor: "#9c27b0",
        title: "Login Failed",
        text: errorMessage,
        showConfirmButton: true,
        customClass: {
          title: "swal-title",
          popup: "swal-popup",
        },
      });
    }
  }
  return (
    <Box sx={CredentialStyle.gradient}>
      <Box sx={{ ...CredentialStyle.blob, top: "10%", left: "15%" }} />
      <Box sx={{ ...CredentialStyle.blob, bottom: "10%", right: "15%" }} />

      <Container component="main" maxWidth="xs">
        <Box sx={CredentialStyle.center}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={{ mb: 2, color: "white" }}
          >
            FYRENOTES
          </Typography>

          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography component="h1" variant="h5" align="center" color="primary">
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
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPwd ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  error={passwordError}
                  onChange={handleChange}
                  helperText={
                    passwordError
                      ? "Passwords must be atleast 6 characters"
                      : ""
                  }
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          onClick={handleVisibility}
                          sx={{ cursor: "pointer" }}
                        >
                          {showPwd ? <Visibility /> : <VisibilityOff />}
                        </InputAdornment>
                      ),
                    },
                  }}
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
                  Don&apos;t have an account?{" "}
                  <Link to="/Register">Register</Link>
                </Typography>
              </form>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default LogIn;
