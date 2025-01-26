
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
import {useNavigate} from 'react-router'

export const Create = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("reminders");
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }

    if (title && details) {
     fetch("http://localhost:8000/notes", {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({title, details, category})
     }).then(() => navigate('/') );
    }
  }
  return (
    <>
      <Container>
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
        </form>
      </Container>
    </>
  );
};

