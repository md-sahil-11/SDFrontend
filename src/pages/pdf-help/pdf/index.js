import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";
import Dashboard from "../../../components/components/wrapper/dashboard";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";

export default function Page() {
  const [file, setFile] = useState(null);
  const { pdf, auth_guard, pdf_file, router } = usePdfAuthContext();

  const downloadPDF = () => {
    if (!file) return;
    let alink = document.createElement("a");
    alink.href = file;
    alink.download = `${pdf?.title || "pdfshare"}.pdf`;
    alink.click();
  };

  useEffect(() => {
    auth_guard()
  }, [])

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
  }, [pdf]);

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
