import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { BACKGROUND } from "theme/colors";
import { Typography } from "@mui/material";
import MISDialog from "components/common/MISDialog";
import T from "T";
import MISFooterButton from "components/common/MISFooterButton";

const ConfirmCancel = ({
  openConfirmCancel = false,
  confrmCancelModal = noop,
  handleClose = noop,
}) => {

  return (
    <MISDialog open={openConfirmCancel}>
      <Typography
        variant="body1"
        textAlign="center"
        p={`20px 60px`}
        sx={{ color: BACKGROUND.black, fontWeight: 500 }}
      >
        {T.FORM_CANCEL_STATEMENT}
      </Typography>

      <MISFooterButton
        proceedButtonText={T.PROCEED}
        justify="center"
        size="medium"
        sx={{ mb: 2 }}
        handleClose={() => {
          confrmCancelModal();
        }}
        handleSubmit={handleClose}
      />
    </MISDialog>
  );
};

ConfirmCancel.propTypes = {
  deleteMember: PropTypes.bool,
  userId: PropTypes.string,
  handleDeleteUserDialog: PropTypes.func,
  refreshTable: PropTypes.func,
};

export default ConfirmCancel;
