import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { LogInStyle } from "../components/Utils";
import { useState } from "react";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUsernameError(false);
    setPasswordError(false);
    if (credentials.username == "") {
      setUsernameError(true);
    }
    if (credentials.email == "") {
        setEmailError(true)
    }
    if (credentials.password == "") {
      setPasswordError(true);
    }
    if (credentials.username !== "" && credentials.email !=="" && credentials.password !== "") {
      console.log(credentials);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={LogInStyle.center}>
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
                helperText={passwordError ? "Passwords must be atleast 6 characters" : ""}
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
              <Typography component="h3" variant="subtitle1" align="center">
                Already have an account?{" "} 
              </Typography>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
