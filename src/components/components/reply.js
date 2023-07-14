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

import { ButtonGroup, Divider, Typography } from "@mui/material";
import { mainColor } from "src/theme/colors";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";
import { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicModal from "./modal";
import TextEditor from "./text-editor";

export default function ReplyComponent({ id, replies }) {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { add_reply } = usePdfAuthContext();

  return (
    <div>
      <Accordion
        elevation={0}
        sx={{ ml: 5 }}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Replies ({replies?.length})</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ ml: 5 }}>
          <List>
            <Button sx={{ m: 2 }} variant="contained" onClick={() => setOpen(true)}>
              Add Reply
            </Button>
            {replies?.map((item, index) => (
              <ListItem button key={index}>
                <ListItemAvatar>
                  <Avatar alt={item.created_by.name} src={item.created_by.image} />
                </ListItemAvatar>
                <ListItemText primary={item.created_by.name} 
                  secondary={
                      <div
                        className="blog-sample"
                        dangerouslySetInnerHTML={{
                          __html: item.text,
                        }}
                      />
                    } />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <BasicModal open={open} handleClose={() => setOpen(false)}>
        <TextEditor id={id} createHandler={add_reply} setOpen={setOpen} />
      </BasicModal>
    </div>
  );
}
