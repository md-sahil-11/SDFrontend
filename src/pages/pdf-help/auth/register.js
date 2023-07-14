import { useState, useEffect } from "react";
import { Typography, AppBar, Toolbar, TextField, Button, Box, Paper } from "@mui/material";
import { Link } from "next/link";
import CustomInput from "../../../components/components/input-field";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";

export default function Page() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { registerUser, user, router } = usePdfAuthContext();

  useEffect(() => {
    if (user) router.replace("/pdf-help");
  }, [user]);

  const handleSubmit = (event) => {
    setLoading(true)
    event.preventDefault();

    if (email && password) {
      const form = new FormData();
      form.append("email", email);
      form.append("name", name);
      form.append("password", password);
      registerUser(form);
    }
    setLoading(false)
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
                <b>Sign Up</b>
              </Typography>
            </Box>
            <CustomInput label={"Name"} type={"text"} value={name} setValue={setName} />
            <CustomInput label={"Email"} type={"text"} value={email} setValue={setEmail} />
            <CustomInput
              label={"Password"}
              type={"password"}
              value={password}
              setValue={setPassword}
            />
              <Box>
                <br />
                Already have an account, <a href={"/pdf-help/auth/register"}>Sign in </a>.
              </Box>
                <br />
              <Button onClick={handleSubmit}>{loading ? "Submitting..": "Submit"}</Button>
            </Box>
        </Paper>
      </Box>
    </center>
  );
}
