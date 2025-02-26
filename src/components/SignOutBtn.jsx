import Button from "@mui/material/Button";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from 'react-router'
import Typography from "@mui/material/Typography";

export default function SignOutBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const user = auth?.currentUser
  const navigate = useNavigate()
  function handleSignOut() {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/LogIn")
        setIsLoading(false);
      })
      .catch((error) => {
        // 99% an doesnt error happene with firebase signout
        alert(error.message);
        setIsLoading(false);
      });
  }
  return (
    <Button loading={isLoading} variant="outlined" color="warn" onClick={handleSignOut}>
     {user ? <Typography>Log Out</Typography> : <Typography>Sign In</Typography>} 
    </Button>
  );
}
