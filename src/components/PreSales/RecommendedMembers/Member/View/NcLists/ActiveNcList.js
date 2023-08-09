import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Paper, Typography } from "@mui/material";

import MISDialog from "components/common/MISDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import ActiveNcTable from "./ActiveNcTable";
import T from "T";

const ActiveNcList = ({
  openActiveNcCountList = false,
  userId = "",
  month= "",
  typeOfNc= "",
  selectedUserName="",
  selectedDate=null,
  handleActiveNcCountDialog = noop,
}) => {
  const handleBack = () => {
    handleActiveNcCountDialog();
  };

  return (
    <MISDialog open={openActiveNcCountList}>
      <Paper
        display={"block"}
        justifyContent="flex-start"
        sx={{ borderRadius: 2 ,p:2}}
        >
          <Box display="flex" alignItems="center" mb={1}>
            <ArrowBackIcon
              fontSize="small"
              sx={{ cursor: "pointer",p:1 }}
              onClick={handleBack}
            />
            <Typography variant='h5'>
                {`${selectedUserName} (${T.ACTIVE} ${T.NCS})`}
            </Typography>
          </Box>
            
            <ActiveNcTable
              userId={userId}
              month={month}
              typeOfNc={typeOfNc}
            />

        </Paper>
        
    </MISDialog>
  );
};

ActiveNcList.propTypes = {
  openDeleteNC: PropTypes.bool,
  userId: PropTypes.number,
  month: PropTypes.number,
  typeOfNc: PropTypes.string,
  selectedUserName: PropTypes.string,
  selectedDate: PropTypes.string,
  handleByDateUserNCDialog: PropTypes.func,
};

export default ActiveNcList;
