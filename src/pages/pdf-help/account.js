import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";
import Dashboard from "../../components/components/wrapper/dashboard";

export default function Page() {
  const { user, logoutUser, auth_guard } = usePdfAuthContext();

  useEffect(() => {
    auth_guard()
  }, [])
  
  return (
    <center>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={user?.image}
              sx={{
                height: 80,
                mb: 2,
                width: 80,
              }}
            />
            <Typography gutterBottom variant="h5">
              {user?.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.email}
            </Typography>
            {/* <Typography color="text.secondary" variant="body2">
              {user?.is_email_verified ? "Email verified": <><a href="/pdf-help/auth/verify-email">Verify you email</a></>}
            </Typography> */}
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
        <Button
          fullWidth
          variant="text"
          onClick={logoutUser}
        >
          Logout
        </Button>
      </CardActions>
      </Card>
    </center>
  );
}

Page.getLayout = (page) => <Dashboard>{page}</Dashboard>;
