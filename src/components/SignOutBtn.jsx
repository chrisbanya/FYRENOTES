import Button from "@mui/material/Button";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

export default function SignOutBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const user = auth?.currentUser;
  const navigate = useNavigate();
  function handleSignOut() {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/LogIn");
        setIsLoading(false);
      })
      .catch((error) => {
        // 99% of the time an error doesnt happened with firebase signout
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
        setIsLoading(false);
      });
  }
  return (
    <Button
      loading={isLoading}
      variant="outlined"
      color="warn"
      onClick={handleSignOut}
    >
      {user ? (
        <Typography>Log Out</Typography>
      ) : (
        <Typography>Sign In</Typography>
      )}
    </Button>
  );
}
