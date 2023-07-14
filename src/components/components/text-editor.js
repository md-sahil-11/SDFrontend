import React, { useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Box, Button } from "@mui/material";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";

const TextEditor = ({ id, createHandler, setOpen }) => {
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleProcedureContentChange = (_content) => {
    // console.log("content---->", content);
    setContent(_content)
  };

  const { toast, list_comments, pdf } = usePdfAuthContext()

  const addContent = async () => {
    setLoading(true)
    console.log("here")
    const form = new FormData();
    form.append("pdf_id", id)
    form.append("comment_id", id)
    form.append("text", content)

    const res = await createHandler(form)
    if (res) toast.success("Comment added.")
    const comment = await list_comments(pdf?.id)
    setOpen(false)
    setLoading(false)
  }

  return (
    <Box sx={{
        minHeight: 300
    }}>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="write your content ...."
        onChange={handleProcedureContentChange}
        style={{ height: "220px" }}
      ></ReactQuill>
      <Button onClick={addContent}>{loading ? "Adding...": "Add" }</Button>
    </Box>
  );
};

export default TextEditor;
