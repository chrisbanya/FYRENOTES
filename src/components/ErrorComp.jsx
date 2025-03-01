import { Typography } from "@mui/material";

export default function ErrorComp({error}) {
  return (
    <Typography variant="subtitle1" align="center" color="error">
      {error}
    </Typography>
  );
}
