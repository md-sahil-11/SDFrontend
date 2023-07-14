import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function BasicModal({ open, handleClose, children }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {xs: 400, md: 800, lg: 1000},
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  return (
    <Box sx={{m: 2}}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </Box>
  );
}
