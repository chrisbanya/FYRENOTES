import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Container } from "@mui/material";
import { auth } from "../firebase/config";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase/config";

import NoteCard from "../components/NoteCard";

export const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = auth?.currentUser;

  useEffect(() => {
    if (!user) return;
    setIsLoading(true)

    const dbQuery = query(
      collection(db, "notes"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(dbQuery, (snapshot) => {
      const notesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArray);
      setIsLoading(false)
    });
    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this note?"))
          return;
    try {
      await deleteDoc(doc(db, "notes", id))
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
      console.log("deleted success")
    } catch(error) {
      console.error(error)
    }
  
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
