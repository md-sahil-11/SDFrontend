import { useState, useEffect } from "react";
import { Typography, AppBar, Toolbar, TextField, Button, Box, Paper } from "@mui/material";
import { Link } from "next/link";
import CustomInput from "../../../components/components/input-field";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";

export default function Page() {
  const [email, setEmail] = useState("");

  const { loginUser, user, router, send_reset_password_email } = usePdfAuthContext();

  useEffect(() => {
    if (user) router.push("/pdf-help");
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email) {
      const form = new FormData();
      form.append("email", email);
      const res = send_reset_password_email(form);
      if (res) router.push("/pdf-help/auth/login");

    }
  };

  return (
    <center>
      <Box sx={{ mt: 5, width: 360, height: 700 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box component="form" noValidate>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ mb: 2 }} component="h2">
                <b>Enter you email to get the instruction to reset password.</b>
              </Typography>
            </Box>
                <CustomInput label={"Email"} type={"text"} value={email} setValue={setEmail} />
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
        </Paper>
      </Box>
    </center>
  );
}
