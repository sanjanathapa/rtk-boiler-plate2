import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Box, Button } from "@mui/material";
import { NETSMARTZ_THEME_COLOR, BACKGROUND } from "theme/colors";

import T from "T";

const MISFooterButton = ({
  id="",
  tab ="",
  empStatus="",
  proceedButtonText = T.SUBMIT,
  cancelButtonText = T.CANCEL,
  justify = "space-between",
  size = "small",
  disableProceed = false,
  handleClose = noop,
  handleSubmit = noop,
  handleEditSubmit = noop,
  ...rest
}) => {
  return (
    <Box display="flex" justifyContent={justify} {...rest}>
      <Button
        variant="outlined"
        size={size}
        sx={{
          borderColor: BACKGROUND.black,
          color: BACKGROUND.black,

          "&:hover": {
            borderColor: NETSMARTZ_THEME_COLOR,
            color: NETSMARTZ_THEME_COLOR,
          },
        }}
        onClick={handleClose}
      >
        {cancelButtonText}
      </Button>
      {(id && (empStatus ===T.STABLE || empStatus ===T.YET_TO_JOIN) && tab!=="3") &&
       <Button
        variant="contained"
        size={size}
        disabled={disableProceed}
        sx={{
          ml: 2,
          minWidth: 80,
          bgcolor: NETSMARTZ_THEME_COLOR,
          "&:hover": {
            bgcolor: NETSMARTZ_THEME_COLOR,
          },
        }}
        onClick={handleEditSubmit}
      >
        {T.SUBMIT}
      </Button>}
      {(id && (empStatus ===T.DID_NOT_JOIN || empStatus ===T.RESIGNED|| empStatus ===T.ABSCONDED|| empStatus ===T.RELIEVED) && tab!=="4") &&
       <Button
        variant="contained"
        size={size}
        disabled={disableProceed}
        sx={{
          ml: 2,
          minWidth: 80,
          bgcolor: NETSMARTZ_THEME_COLOR,
          "&:hover": {
            bgcolor: NETSMARTZ_THEME_COLOR,
          },
        }}
        onClick={handleEditSubmit}
      >
        {T.SUBMIT}
      </Button>}
      <Button
        variant="contained"
        size={size}
        disabled={disableProceed}
        sx={{
          ml: 2,
          minWidth: 80,
          bgcolor: NETSMARTZ_THEME_COLOR,
          "&:hover": {
            bgcolor: NETSMARTZ_THEME_COLOR,
          },
        }}
        onClick={handleSubmit}
      >
        {proceedButtonText}
      </Button>
    </Box>
  );
};

MISFooterButton.propTypes = {
  proceedButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  justify: PropTypes.string,
  disableProceed: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleEditSubmit: PropTypes.func,
};

export default MISFooterButton;
