import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Card
} from "@mui/material";
import { mainColor } from "src/theme/colors";
import PdfCard from "../../components/components/pdf-card";
import BasicModal from "../../components/components/modal";
import AddPdfForm from "../../components/components/add-pdf";
import Dashboard from "../../components/components/wrapper/dashboard";
import PDFService from "src/services/PdfService";
import { useEffect } from "react";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";
import { usePathname } from "next/navigation";
import CustomInput from "src/components/components/input-field";

const Page = () => {
  const { auth_guard, pdf_list, pdfs: allPdfs, loading, user } = usePdfAuthContext();

  const [open, setOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pdfs, setPdfs] = useState([])
  const pathname = usePathname();

  useEffect(() => {
    auth_guard();
    pdf_list();
    console.log(pdfs);
  }, []);

  useEffect(() => {
    setPdfs(allPdfs);
  }, [allPdfs])

  const handlePDFFormClose = () => {
    setSaveModalOpen(true);
  };

  const onAddData = () => {
    pdf_list();
    setOpen(false);
  };

  useEffect(() => {
    if (search === "") {
      setPdfs(allPdfs);
    } else {
      let data = [];
      for (let item of allPdfs) {
        if (item?.title.toUpperCase().indexOf(search.toUpperCase()) > -1) {
          data = [...data,item]
        }
      }
      setPdfs(data)
    }
  }, [search])
  
  return (
    <>
      <Head>
        <title>PDFShare</title>
      </Head>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Link style={{ textDecoration: "none" }} href={"/pdf-help"}>
                  <Typography color="inherit" variant="h5">
                    <span style={{ color: mainColor }}>PDFShare</span>
                  </Typography>
                </Link>
              </Stack>
            </Stack>
            <div>
              {!user?.is_guest && (
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Add Pdf
                </Button>
              )}
            </div>
          </Stack>
          <Card sx={{ p: 2 }}>
            <CustomInput value={search} setValue={setSearch} label={"Search Pdf"} type={"text"} />
          </Card>
          <Grid container spacing={3}>
            {pdfs?.map((pdf) => (
              <Grid key={pdf.id} xs={12} md={6} lg={4}>
                <PdfCard total={pdf.members.count || 0} users={pdf.members || []} pdf={pdf || {}} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
      <BasicModal open={open} handleClose={handlePDFFormClose}>
        <>
          <Typography
            onClick={handlePDFFormClose}
            sx={{ display: { xs: "block", sm: "none" }, textAlign: "right" }}
          >
            <CloseIcon />
          </Typography>
          <AddPdfForm edit={false} onAddData={onAddData} />
        </>
      </BasicModal>
      <BasicModal open={saveModalOpen} handleClose={handlePDFFormClose}>
        <h3>Changes are not saved. Do you want to exit?</h3>
        <Button
          onClick={() => {
            setOpen(false);
            setSaveModalOpen(false);
          }}
        >
          Yes
        </Button>
        <Button onClick={() => setSaveModalOpen(false)}>No</Button>
      </BasicModal>
    </>
  );
};

Page.getLayout = (page) => <Dashboard>{page}</Dashboard>;

export default Page;
