import { useState, useEffect } from "react";
import { Typography, AppBar, Toolbar, TextField, Button, Box, Paper } from "@mui/material";
import { Link } from "next/link";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";
import CustomInput from "src/components/components/input-field";

export default function Page() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const { reset_password, user, router, toast, pathname } = usePdfAuthContext();

  useEffect(() => {
    if (user) router.push("/pdf-help");
  }, [user]);

  useEffect(() => {
    setToken(pathname?.split("/").pop() || "")
  }, [pathname])

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();

    if (password1 && password2) {
      const form = new FormData();
      form.append("password1", password1);
      form.append("password2", password2);
      form.append("token", token);
      const res = await reset_password(form);
      if (res) toast.success("New password has been saved.")
      router.push("/pdf-help/auth/login")
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
                <b>Sign In</b>
              </Typography>
            </Box>
            <CustomInput label={"Enter new password"} type={"password"} value={password1} setValue={setPassword1} />
            <CustomInput
              label={"Enter new password again"}
              type={"password"}
              value={password2}
              setValue={setPassword2}
            />
              {/* <Box>
                <br />
                Don't have an account, <a href={"/pdf-help/auth/register"}>Sign up </a>
                or <a href={"/pdf-help/auth/forgot-password"}>  Forgot password?</a>
              </Box> */}
                <br />
              <Button onClick={handleSubmit}>{loading ? "Submitting..": "Submit"}</Button>

            </Box>
        </Paper>
      </Box>
    </center>
  );
}
