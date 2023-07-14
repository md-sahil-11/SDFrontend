import React, { useState } from "react";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

const FileInput = ({ label, accept, helpText, value, setValue }) => {
  const handleFileUpload = (e) => {
    e.preventDefault();
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setValue(uploadedFile);
  };

  return (
    <div class="image-upload">
      <input type="file" name={label} onChange={handleFileUpload} accept={accept} />
      <label for="logo" class="upload-field" id="file-label">
        <div class="file-thumbnail">
          <h3>{label}</h3>
          {value ? (
            <p>{value.name}</p>
          ) : (
            <InsertPhotoOutlinedIcon
              sx={{
                fontSize: "2rem",
                color: "#788897",
                cursor: "pointer",
              }}
            />
          )}
          <h3>Drag and Drop</h3>
          <p>{helpText}</p>
        </div>
      </label>
    </div>
  );
};

export default FileInput;
