import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Paper, Typography } from "@mui/material";

import MISDialog from "components/common/MISDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserNCTable from "./UserNCTable";
import { Box } from "@mui/system";

const UserNCByDate = ({
  openNcByDate = false,
  id = "",
  selectedUserName="",
  selectedDate=null,
  handleByDateUserNCDialog = noop,
}) => {
  const handleBack = () => {
    handleByDateUserNCDialog();
  };

  return (
    <MISDialog open={openNcByDate}>
      <Paper
        display={"block"}
        justifyContent="flex-start"
        sx={{ borderRadius: 2 ,p:2}}
        >
          <Box display="flex" alignItems="center" mb={1}>
            <ArrowBackIcon
              fontSize="small"
              sx={{ cursor: "pointer",P: 1 }}
              onClick={handleBack}
            />
            <Typography variant='h5'>
                {`${selectedUserName} NCs (${selectedDate})`}
            </Typography>
          </Box>
            
            <UserNCTable
              id={id}
            />

        </Paper>
        
    </MISDialog>
  );
};

UserNCByDate.propTypes = {
  openDeleteNC: PropTypes.bool,
  id: PropTypes.number,
  selectedUserName: PropTypes.string,
  selectedDate: PropTypes.string,
  handleByDateUserNCDialog: PropTypes.func,
};

export default UserNCByDate;
