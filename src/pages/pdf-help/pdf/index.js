import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { ButtonGroup } from "@mui/material";
import Dashboard from "../../../components/components/wrapper/dashboard";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";

export default function Page() {
  const router = useRouter();
  const { fileUrl, fileName } = router.query;
  const [file, setFile] = useState(null);

  const { auth_guard } = usePdfAuthContext()

  const downloadPDF = () => {
    if (!file) return;
    let alink = document.createElement("a");
    alink.href = file;
    alink.download = `${fileName || "pdfshare"}.pdf`;
    alink.click();
  };

  useEffect(() => {
    auth_guard()
  }, [])

  const fetchPdf = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(fileUrl, requestOptions).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        setFile(fileURL);
      });
    });
  };


  useEffect(() => {
    if (!file) fetchPdf();
  }, [file]);

  return (
    <>
      <center>
        <Button onClick={() => router.back()}>Back</Button>
        <Button onClick={downloadPDF}>Download PDF</Button>
        <Box
          sx={{
            width: {xs: 400, md: 600, lg: 700},
          }}
        >
          <Worker workerUrl={"https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js"}>
            {file && <Viewer fileUrl={file} />}
          </Worker>
        </Box>
      </center>
    </>
  );
}

Page.getLayout = (page) => <Dashboard>{page}</Dashboard>;
