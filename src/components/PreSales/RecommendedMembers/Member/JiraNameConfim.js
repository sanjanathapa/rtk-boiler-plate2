import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Divider, Typography } from "@mui/material";

import MISDialog from "components/common/MISDialog";

import T from "T";

import MISFooterButton from "components/common/MISFooterButton";



const JiraNameConfirm = ({
   confirmJiraName = false, 
   jiraName = "",
   previousJiraName = "", 
   handleRevertChange = noop, 
   handleJiraNameChange = noop 
  }) => {
  
  const handleConfirm = (e) => {
    handleJiraNameChange();
  };
  const jiraNameChangeStatement = ()=>{
    return(
      <p>
        Are you sure you want to change the Jiraname from <b>{previousJiraName}</b> to <b>{jiraName}</b>
      </p>
    )
  }
  return (
    <MISDialog open={confirmJiraName}>
      <Typography variant="body1" textAlign="center" p={`10px 100px`}>
        {jiraNameChangeStatement()}
      </Typography>
      <Divider />

      <MISFooterButton
        proceedButtonText={T.CONFIRM}
        justify="center"
        sx={{ p: 1.5 }}
        size="medium"
        handleClose={handleRevertChange}
        handleSubmit={handleConfirm}
      />
    </MISDialog>
  );
};

JiraNameConfirm.propTypes = {
  confirmJiraName: PropTypes.bool,
  jiraName: PropTypes.string,
  previousJiraName: PropTypes.string,
  handleRevertChange: PropTypes.func,
  handleJiraNameChange: PropTypes.func,
};

export default JiraNameConfirm;
