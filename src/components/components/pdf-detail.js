import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

import { ButtonGroup, Divider, Typography, Card } from "@mui/material";
import { mainColor } from "src/theme/colors";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyComponent from "./reply";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";
import { useEffect } from "react";
import BasicModal from "./modal";
import TextEditor from "./text-editor";
import CustomInput from "./input-field";

export default function PdfDetail({ id, link }) {
  const {
    user,
    members,
    pdf_members,
    users: allUsers,
    userList,
    member_add,
    toast,
    router,
    list_comments,
    comments,
    add_comment,
  } = usePdfAuthContext();

  const ref = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState(allUsers || []);

  const handleClose = () => {
    setOpen(false);
  };

  const sections = {
    comments: "comments",
    members: "members",
    share: "share",
  };

  const [section, setSection] = React.useState(sections.comments);
  const [notMembers, setNotMembers] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (search === "") {
      setUsers(allUsers);
    } else {
      let data = [];
      for (let item of allUsers) {
        if (
          item?.name.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
          item?.email.toUpperCase().indexOf(search.toUpperCase()) > -1
        ) {
          data = [...data, item];
        }
      }
      setUsers(data);
    }
  }, [search]);

  const loadData = () => {
    userList();
    setUsers(allUsers);
    pdf_members(id);
    list_comments(id);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const getNotMembers = () => {
    if (!users || !members) return;

    let vis = new Set();
    for (let i of members) {
      vis.add(i.id);
    }

    let data = [];
    for (let user of users) {
      if (!vis.has(user.id)) {
        data = [...data, user];
      }
    }
    console.log(data, vis);
    setNotMembers(data);
  };

  useEffect(() => {
    getNotMembers();
  }, [users, members]);

  const addMember = async (user_id, index) => {
    setLoading(index);
    const data = {
      user_id: user_id,
      pdf_id: id,
    };

    const res = await member_add(data);
    if (res == true) {
      toast.success("User added.");
      loadData();
    } else toast.error("Something went wrong!!!");
    setLoading(false);
  };

  const copyToClipboard = () => {
    const base = "https://sd-frontend-rho.vercel.app/pdf-help";
    const links = base + link;
    toast.success("Link copied.");
    navigator.clipboard.writeText(links);
  };

  return (
    <Box
      sx={{
        minWidth: 400,
      }}
    >
      <Button onClick={() => setSection(sections.comments)}>
        <span style={{ color: section === sections.comments ? mainColor : "#bdbdbd" }}>
          Comments
        </span>
      </Button>
      <Button onClick={() => setSection(sections.members)}>
        <span style={{ color: section === sections.members ? mainColor : "#bdbdbd" }}>Members</span>
      </Button>
      {!user?.is_guest && (
        <Button onClick={() => setSection(sections.share)}>
          <span style={{ color: section === sections.share ? mainColor : "#bdbdbd" }}>Share</span>
        </Button>
      )}
      <Divider />
      <br />
      {section === sections.comments && (
        <Box sx={{ pb: 7 }} ref={ref}>
          <Typography sx={{ ml: 2 }} variant="h6">
            Comments ({comments?.length})
          </Typography>

          <Button sx={{ m: 2 }} variant="contained" onClick={() => setOpen(true)}>
            Add Comment
          </Button>

          <CssBaseline />
          <List>
            {comments?.map((item, index) => (
              <>
                <ListItem button key={index}>
                  <ListItemAvatar>
                    <Avatar alt={item.created_by.name} src={item.created_by.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.created_by.name}
                    secondary={
                      <div
                        className="blog-sample"
                        dangerouslySetInnerHTML={{
                          __html: item.text,
                        }}
                      />
                    }
                  />
                  {/* <Button>
                    <ThumbUpIcon sx={{ color: !item.is_liked && "#bdbdbd" }} />
                  </Button>
                  <Typography variant="body2">{item.liked_count || 0}</Typography> */}
                </ListItem>
                <ReplyComponent key={index} id={item.id} replies={item.replies} />
              </>
            ))}
          </List>
        </Box>
      )}
      {section === sections.members && (
        <Box sx={{ pb: 7 }} ref={ref}>
          <Typography sx={{ ml: 2 }} variant="h6">
            Members ({members?.length})
          </Typography>
          <CssBaseline />
          <List>
            {members?.map((item, index) => (
              <ListItem button key={index}>
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.image} />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.email} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {section === sections.share && (
        <Box sx={{ pb: 7 }} ref={ref}>
          <Button onClick={copyToClipboard}>Copy link</Button>
          <span>Anyone with this link can access this file.</span>
          <Typography sx={{ ml: 2 }} variant="h6">
            <br />
            Users not added ({notMembers?.length})
          </Typography>
          <Box sx={{ p: 2 }}>
            <CustomInput value={search} setValue={setSearch} label={"Search users"} type={"text"} />
          </Box>
          <CssBaseline />
          <List>
            {notMembers?.map((item, index) => (
              <ListItem button key={index}>
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.image} />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.email} />
                <Button onClick={() => addMember(item.id, index)}>
                  {loading === index ? "Adding..." : "Add"}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      <BasicModal open={open} handleClose={handleClose}>
        <TextEditor id={id} createHandler={add_comment} setOpen={setOpen} />
      </BasicModal>
    </Box>
  );
}
