import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { CredentialStyle } from "../components/Utils";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setError("");
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);

    if (credentials.username == "") {
      setUsernameError(true);
    }
    if (credentials.email == "") {
      setEmailError(true);
    }
    if (credentials.password == "") {
      setPasswordError(true);
    }

    if (
      credentials.username !== "" &&
      credentials.email !== "" &&
      credentials.password !== ""
    ) {
      setIsLoading(true);
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          setIsLoading(false);
          setTimeout(() => navigate("/LogIn"), 3000);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={CredentialStyle.center}>
        {/* loading spinner display while firebase call is in process */}
        {isLoading && (
          <Box xs={12}>
            <CircularProgress color="secondary" size="5rem" />
          </Box>
        )}
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography component="h1" variant="h5" align="center">
            Register
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                error={usernameError}
                onChange={handleChange}
              />
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
              {error && (
                <Typography variant="subtitle1" align="center" color="error">
                  {error}
                </Typography>
              )}
              <Typography component="h3" variant="subtitle1" align="center">
                Already have an account? <Link to="/LogIn">Log In</Link>
              </Typography>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
