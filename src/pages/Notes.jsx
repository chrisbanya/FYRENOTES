import { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid2";
import { Container } from "@mui/material";
import { auth } from "../firebase/config";
import CircularProgress from "../components/CircularProgressComp";
import { Masonry } from "@mui/lab";
import Swal from "sweetalert2";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { Box } from "@mui/material";


import NoteCard from "../components/NoteCard";

export const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // prevents empty notes on re-render or page refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // check for if the user is authenicated else stop the process
    if (!user) return;
    setIsLoading(true);
    // dbQuery queries the db and gets the collection ref and finds userid instance match and creation date sort
    const dbQuery = query(
      collection(db, "notes"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    // literally takes the snapshot of the sorted db ref, loops and populate notes state
    const unsubscribe = onSnapshot(dbQuery, (snapshot) => {
      const notesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArray);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this note!",
      icon: "warning",
      iconColor: "#9c27b0",
      showCancelButton: true,
      confirmButtonColor: "#9c27b0",
      cancelButtonColor: "#7b1fa2",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      customClass: {
        title: "swal-title",
        popup: "swal-popup",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
      // based on swal docs preConfirm goes together with showLoaderOnConfirm hence this;
      preConfirm: async () => {
        try {
          await deleteDoc(doc(db, "notes", id));
          setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
            confirmButtonColor: "#9c27b0",
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your note has been deleted.",
          icon: "success",
          iconColor: "#9c27b0",
          confirmButtonColor: "#9c27b0",
          customClass: {
            title: "swal-title",
            popup: "swal-popup",
          },
        });
      }
    });
  };

  return (
    <Container>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3 }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sequential
      >
        {isLoading ? (
          <Box
            sx={{
              gridColumn: "1 / -1", // Spans across all columns in Masonry by countering mansory fixed width effect on children elements
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            <CircularProgress />
          </Box>
        ) : notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note.id} note={note} handleDelete={handleDelete} />
          ))
        ) : (
          <p>No notes found</p>
        )}
      </Masonry>
    </Container>
  );
};
