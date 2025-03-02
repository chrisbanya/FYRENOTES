// import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { DeleteOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Avatar, Typography } from "@mui/material";
import { NoteCardClasses } from "./Utils";

const NoteCard = ({ note, handleDelete }) => {
  const { title, category, details, id } = note;

  return (
    <>
      <Card sx={NoteCardClasses.card(note)}>
        <CardHeader
          avatar={
            <Avatar sx={NoteCardClasses.avatar(note)}>
              {category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="delete-button"
              onClick={() => handleDelete(id)}
            >
              <DeleteOutlined />
            </IconButton>
          }
          title={title}
          subheader={category}
        />

        <CardContent>
          <Typography variant="body2" color="#0f0f00">
            {details}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default NoteCard;
