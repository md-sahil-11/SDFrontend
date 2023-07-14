import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserAvatars from "./avatars";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import BasicModal from "./modal";
import CustomInput from "./input-field";

const PdfViewer = ({ pdf }) => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const downloadPDF = () => {
    if (!file) return;
    let alink = document.createElement("a");
    alink.href = file;
    alink.download = `${pdf.title}.pdf`;
    alink.click();
  };

  const fetchPdf = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(pdf.file).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        setFile(fileURL);
      });
    });
  };

  useEffect(() => {
    fetchPdf();
  }, []);

  return (
    <>
      <Box
        sx={{
          m: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            minWidth: {xs :360},
          }}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            width="400"
            image={
              pdf?.cover_image ||
              "https://play-lh.googleusercontent.com/LvJB3SJdelN1ZerrndNgRcDTcgKO49d1A63C5hNJP06rMvsGkei-lwV52eYZJmMknCwW"
            }
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pdf?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pdf?.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Link
                href={{
                  pathname: "/pdf-help/pdf",
                  query: {
                    fileUrl: pdf?.file,
                    fileName: pdf?.title,
                  },
                }}
              >
                <Button>View</Button>
              </Link>
              <Button onClick={() => downloadPDF()}>Download PDF</Button>
            </Box>
          </CardActions>
        </Card>
        {/* <BasicModal open={open} handleClose={handleClose}>
          <>
            <Typography
              onClick={handleClose}
              sx={{ display: { xs: "block", sm: "none" }, textAlign: "right" }}
            >
              <CloseIcon />
            </Typography>
          </>
        </BasicModal> */}
      </Box>
    </>
  );
};

export default PdfViewer;

const UserListComponent = () => {

  <Box sx={{ pb: 7 }} ref={ref}>
    <Typography sx={{ ml: 2 }} variant="h6">
      Members (10)
    </Typography>
    <CssBaseline />
    <List>
      {users.map(({ primary, secondary, person }, index) => (
        <ListItem button key={index + person}>
          <ListItemAvatar>
            <Avatar alt="Profile Picture" src={person} />
          </ListItemAvatar>
          <ListItemText primary={primary} />
        </ListItem>
      ))}
    </List>
  </Box>;
};
