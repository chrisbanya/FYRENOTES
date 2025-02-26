import { SubjectOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";

const menuItems = [
  { text: "MyNotes", icon: <SubjectOutlined color="secondary" />, path: "/" },
  {
    text: "Create Notes",
    icon: <AddCircleOutlineOutlined color="secondary" />,
    path: "/create",
  },
];
export default menuItems;
