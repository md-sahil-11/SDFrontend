import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";

const PdfViewer = ({ pdf }) => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const { pdf_file } = usePdfAuthContext();

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

  const fetchPdf = async () => {
    pdf_file(pdf?.id).then((response) => {
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
              <a
                href={pdf?.file}
                target="_blank"
              >
                <Button>View</Button>
              </a>
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