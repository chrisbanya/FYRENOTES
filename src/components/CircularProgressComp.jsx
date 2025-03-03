import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";


export default function CircularProgressComp() {
  return (
    <Box
      xs={12}
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundColor: "rgba(17, 24, 39, 0.5)",
        zIndex: 60,
      }}
    >
      <CircularProgress color="secondary" size="3rem" />
    </Box>
  );
}
