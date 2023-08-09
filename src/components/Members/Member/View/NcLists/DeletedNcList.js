import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Paper, Typography } from "@mui/material";

import MISDialog from "components/common/MISDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import DeletedNcTable from "./DeletedNcTable";
import T from "T";

const DeletedNcList = ({
  openDeleteNcCountList = false,
  id = "",
  selectedUserName="",
  selectedDate=null,
  userId = "",
  month= "",
  typeOfNc= "",
  handleDeleteNcCountDialog = noop,
}) => {
  const handleBack = () => {
    handleDeleteNcCountDialog();
  };

  return (
    <MISDialog open={openDeleteNcCountList}>
      <Paper
        display={"block"}
        justifyContent="flex-start"
        sx={{ borderRadius: 2 ,p:2}}
        >
          <Box display="flex" alignItems="center" mb={1}>
            <ArrowBackIcon
              fontSize="small"
              sx={{ cursor: "pointer", p:1}}
              onClick={handleBack}
            />
            <Typography variant='h5'>
                {`${selectedUserName} (${T.DELETED} ${T.NCS})`}
            </Typography>
          </Box>
            
            <DeletedNcTable
              userId={userId}
              month={month}
              typeOfNc={typeOfNc}
            />

        </Paper>
        
    </MISDialog>
  );
};

DeletedNcList.propTypes = {
  openDeleteNC: PropTypes.bool,
  userId: PropTypes.number,
  month: PropTypes.number,
  typeOfNc: PropTypes.string,
  selectedUserName: PropTypes.string,
  selectedDate: PropTypes.string,
  handleByDateUserNCDialog: PropTypes.func,
};

export default DeletedNcList;
