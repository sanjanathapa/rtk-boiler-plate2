import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Button, Box, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import T from "T";

import { NETSMARTZ_THEME_COLOR } from "theme/colors";

import MISDialog from "./MISDialog";

const MISConfirmationModal = ({
  open = false,
  handleConfirm = noop,
  confirmText = `${T.YES}, ${T.CONFIRM}`,
  cancelText = `${T.NO}, ${T.CANCEL}`,
  handleClose = noop,
  children,
}) => {
  return (
    <MISDialog open={open} handleClose={handleClose}>
      <CloseIcon
        onClick={handleClose}
        fontSize="small"
        sx={{
          color: (theme) => theme.palette.grey[500],
          textAlign: "right",
          position: "absolute",
          top: 8,
          right: 8,
          cursor: "pointer",
        }}
      />
      <DialogTitle sx={{ p: "20px 40px" }}>{children}</DialogTitle>

      <Box display="flex" justifyContent="space-between" p="16px 40px">
        <Button
          variant="outlined"
          size="small"
          color="inherit"
          sx={{
            whiteSpace: "nowrap",
          }}
          onClick={handleClose}
        >
          {cancelText}
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: NETSMARTZ_THEME_COLOR,
            whiteSpace: "nowrap",
            ml: 2,
          }}
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </Box>
    </MISDialog>
  );
};

MISConfirmationModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default MISConfirmationModal;
