import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase/config";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("reminders");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setTitleError(false);
    setDetailsError(false);
    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }
    const user = auth?.currentUser;
    if (!user) {
      alert("You need to be logged in to add a note");
      return;
    }
    if (title && details) {
      try {
        await addDoc(collection(db, "notes"), {
          title,
          details,
          category,
          createdAt: serverTimestamp(),
          userId: user.uid,
        });
        setIsLoading(false);
        setTitle("");
        setDetails("");
        alert("notes added successfully");
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Container>
        {isLoading && (
          <Box xs={12}>
            <CircularProgress color="secondary" size="5rem" />
          </Box>
        )}
        <Typography
          gutterBottom
          color="danger"
          component="h2"
          sx={{
            marginTop: 3,
            marginBottom: 3,
            display: "block",
          }}
        >
          Create a new Note
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Note Title"
            fullWidth
            required
            error={titleError}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              marginTop: 3,
              marginBottom: 3,
              display: "block",
            }}
          />
          <TextField
            label="Details"
            fullWidth
            required
            multiline
            rows={4}
            value={details}
            error={detailsError}
            onChange={(e) => setDetails(e.target.value)}
            sx={{
              marginTop: 3,
              marginBottom: 3,
              display: "block",
            }}
          />
          <FormControl sx={{ marginTop: 3, marginBottom: 3, display: "block" }}>
            <FormLabel>Note Category</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-labelledby="radio-buttons-for-selecting-categories"
            >
              <FormControlLabel
                value="finance"
                control={<Radio />}
                label="Finance"
              />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                value="reminders"
                control={<Radio />}
                label="Reminders"
              />
              <FormControlLabel value="work" control={<Radio />} label="Work" />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
          {error && (
            <Typography variant="subtitle1" align="center" color="error">
              {error}
            </Typography>
          )}
        </form>
      </Container>
    </>
  );
};
