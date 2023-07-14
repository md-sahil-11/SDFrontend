import * as React from "react";
import TextField from "@mui/material/TextField";

export default function CustomInput({ label, type, value, setValue }) {
  return <TextField sx={{ mb: 2 }} fullWidth label={label} type={type} value={value} onChange={(e) => setValue(e.target.value)}/>;
}
