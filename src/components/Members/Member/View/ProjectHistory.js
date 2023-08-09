import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Typography, Card, Tooltip, Grid } from "@mui/material";
import { StyledBox } from "components/Members/TopBar";
import T from "T";
import XLS from "assets/XLS.png";
import HistoryTable from "./HistoryTable";

const ProjectHistory = ({
  allTableRows = [],
  handleAddFeedback = noop,
  handleExport = noop,
}) => {
  return (
    <Card sx={{ mt: 3, p: 2 }} elevation={2}>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12} display="flex" alignItems="center">
          <Typography fontSize={18} fontWeight={600}>
            {`${T.PROJECT_HISTORY}`}
          </Typography>
        </Grid>

        <Grid item sm={6} xs={12} display="flex" columnGap={2}>
          <Tooltip title={T.XLS} placement="top">
            <StyledBox
              component="img"
              src={XLS}
              sx={{ margin: "0 0 0 auto" }}
              onClick={() => handleExport(T.XL)}
            />
          </Tooltip>
        </Grid>
      </Grid>

      <HistoryTable
        allTableRows={allTableRows}
        handleAddFeedback={handleAddFeedback}
      />
    </Card>
  );
};

ProjectHistory.propTypes = {
  allTableRows: PropTypes.array,
  handleAddFeedback: PropTypes.func,
  handleExport: PropTypes.func,
};

export default ProjectHistory;
