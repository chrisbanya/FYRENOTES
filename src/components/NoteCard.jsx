import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { AddCircleOutlineOutlined, DeleteOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";


const NoteCard = ({ note, handleDelete }) => {
  const { title, category, details, id } = note;

  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card>
          <CardHeader
            action={
              <IconButton aria-label="delete-button" onClick={() => handleDelete(id)}>
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
      </Grid>
    </>
  );
};

export default NoteCard;
