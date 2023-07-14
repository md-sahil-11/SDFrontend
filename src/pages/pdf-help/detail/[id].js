"use-client";
// import Comments from "../../../components/components/comment";
import Dashboard from "../../../components/components/wrapper/dashboard";
// import PdfViewer from "../../../components/components/pdf-viewer";
import { Box, Grid, Paper, Typography, Container, Stack, Button } from "@mui/material";
import { mainColor } from "src/theme/colors";
import Link from "next/link";
// import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";
import { useState } from "react";

const PdfDetail = dynamic(() => import("../../../components/components/pdf-detail"), { ssr: false });
const PdfViewCard = dynamic(() => import("../../../components/components/pdf-viewer"), {
  ssr: false,
});

const Page = () => {
  const [id, setId] = useState()
  const { auth_guard, pathname, pdf, pdf_retrieve, members, pdf_members } = usePdfAuthContext();

  useEffect(() => {
    auth_guard();
    pdf_retrieve(id);
  }, [id])

  useEffect(() => {
    if (pathname) setId(pathname.split("/").pop());
  }, [pathname]);

  return (
    <>
      <Stack alignItems="center" direction="row" spacing={1}>
        <Link style={{ textDecoration: "none" }} href={"/pdf-help"}>
          <Typography color="inherit" variant="h5">
            <span style={{ color: mainColor, paddingLeft: "40px" }}>PDFShare</span>
          </Typography>
        </Link>
        <br />
        <br />
        <br />
      </Stack>
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} sx={{ alignItems: "center" }}>
          <Paper elevation={0}>
            <PdfViewCard pdf={pdf} />
          </Paper>
        </Grid>
        <Grid item sm={12} md={8}>
          <PdfDetail id={id} link={pdf?.sharable_link} />
        </Grid>
      </Grid>
    </>
  );
};

Page.getLayout = (page) => <Dashboard>{page}</Dashboard>;

export default Page;
