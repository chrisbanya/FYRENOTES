import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid2";
import { Container } from "@mui/material";
import NoteCard from "../components/NoteCard";
const URL = "http://localhost:8000/notes";

export const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error("failed to fetch notes");
        }
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotes();
  }, [notes]);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });
  };
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {isLoading ? (
          <Box xs={12}>
            <CircularProgress color="secondary" size="5rem" />
          </Box>
        ) : notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note.id} note={note} handleDelete={handleDelete} />
          ))
        ) : (
          <p>No notes found</p>
        )}
      </Grid>
    </Container>
  );
};
