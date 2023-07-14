import { Box } from "@mui/material";
import React from "react";
import BottomNav from "../bottom-nav";

const Dashboard = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: { xs: 4, md: 8 },
      }}
    >
      {children}
      <BottomNav />
    </Box>
  );
};

export default Dashboard
