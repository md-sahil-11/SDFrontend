import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomInput from "./input-field";
import FileInput from "./file-input";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";

const AddPdfForm = ({ edit, onAddData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false)

  const { toast, pdf_add } = usePdfAuthContext()

  const handleSubmit = async () => {
    setLoading(true)
    const form = new FormData()
    if (!pdf) {
      toast.error("Pdf file not uploaded!!!")
      return 
    }
    form.append("title", title)
    form.append("description",description)
    form.append("file", pdf)
    form.append("cover_image", coverImage)
    const res = await pdf_add(form)
    if (res == true) {
      toast.success("Pdf added.")
      onAddData()
    }
    else toast.error("Something went wrong!!!")
    setLoading(false)
  }

  return (
    <Box component="form" noValidate>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ mb: 2 }} component="h2">
          <b>Add your PDF</b>
        </Typography>
      </Box>
      <CustomInput 
        label={"Title"} 
        type={"text"} 
        value={title} 
        setValue={setTitle} 
      />
      <FileInput
        label={"Upload cover image"}
        accept={".png, .jpg, .jpeg"}
        helpText={"Supports JPG, PNG, SVG"}
        value={coverImage}
        setValue={setCoverImage}
      />
      <FileInput
        label={"Upload pdf"}
        action={".pdf"}
        helpText={"Supports PDF file"}
        value={pdf}
        setValue={setPdf}
      />
      <CustomInput
        label={"Description"}
        type={"description"}
        value={description}
        setValue={setDescription}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button onClick={handleSubmit}>
          { !loading ?
            "Submit" :
            "Uploading..."
          }
        </Button>
      </Box>
    </Box>
  );
};

export default AddPdfForm;
