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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import CircularProgressComp from "../components/CircularProgressComp";
import ErrorComp from "../components/ErrorComp";
import { Toast } from "../components/Utils";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import { VisibilityOff } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

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
  const [showPwd, setShowPwd] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setError("");
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  function handleVisibility() {
    setShowPwd((prev) => !prev);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);

    if (!credentials.username.trim()) {
      setUsernameError(true);
    }
    if (!credentials.email.trim()) {
      setEmailError(true);
    }
    if (!credentials.password.trim()) {
      setPasswordError(true);
    }
    // stop execution if any field is empty
    if (
      !credentials.username.trim() ||
      !credentials.email.trim() ||
      !credentials.password.trim()
    ) {
      return;
    }
    setIsLoading(true);
    try {
      // user creation
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredentials.user;
      // b/cos firebase auth only accepts email and passsword if you want to store additionally info, pass to db via setDoc
      await setDoc(doc(db, "users", user.uid), {
        username: credentials.username,
        email: credentials.email,
      });

      setIsLoading(false);
      Toast.fire({
        icon: "success",
        iconColor: "#7b1fa2",
        title: "Account created successfully!",
        customClass: {
          container: "swal-toast-container",
          title: "swal-toast-title",
        },
      });
      setTimeout(
        () =>
          navigate("/LogIn", {
            state: { prefill: userCredentials.user.email },
          }),
        1000
      );
    } catch (error) {
      const errorMessages = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Try again!",
        "auth/invalid-email": "Invalid email format.",
        "auth/user-disabled": "This account has been disabled.",
        "auth/too-many-requests": "Too many failed attempts. Try again later.",
      };

      // Default to Firebase error message if no custom message is found
      const errorMessage = errorMessages[error.code] || error.message;

      setError(errorMessage);
      setIsLoading(false);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={CredentialStyle.center}>
        {/* loading spinner display while firebase call is in process */}
        {isLoading && <CircularProgressComp />}
        <Typography
          component="h1"
          variant="h5"
          align="center"
          color="primary"
          sx={{ mb: 2 }}
        >
          FYRENOTES
        </Typography>
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
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        <PermIdentityIcon/>
                      </InputAdornment>
                    ),
                  },
                }}
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
                  passwordError ? "Passwords must be atleast 6 characters" : ""
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
                Register
              </Button>
              {error && <ErrorComp error={error} />}
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
