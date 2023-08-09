import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Box, Typography, Card, Tooltip, Grid, MenuItem } from "@mui/material";

import MISDatePicker from "components/common/MISDatePicker";
import MISTextField from "components/common/MISTextField";
import { StyledBox } from "components/Members/TopBar";

import T from "T";

import XLS from "assets/XLS.png";
import NCTable from "./NCTable";
import { MONTH_LIST } from "../memberModel";

const NCHistory = ({
  startMonth = null,
  endMonth = null,
  allTableRows = [],
  refreshNCTable = noop,
  handleActiveNcCountDialog = noop,
  handleDeleteNcCountDialog = noop,
  onHandleDateChange = noop,
  onHandleChange = noop,
  handleExport = noop,
}) => {
  // const relativeMonths=[...MONTH_LIST];
  const currentYearMonths=MONTH_LIST.slice(3,12);
  const relativeMonths=[...currentYearMonths];
  
  return (
    <Card sx={{ mt: 3, p: 2 }} elevation={2}>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12} display="flex" alignItems="center">
          <Typography fontSize={18} fontWeight={600}>
            {`${T.NC_HISTORY}`}
          </Typography>
        </Grid>

        <Grid
          item
          sm={4}
          xs={12}
          display="flex"
          columnGap={2}
          alignItems="center"
        >

        <MISTextField
          // label={T.START_MONTH}
          fullWidth
          select
          size="small"
          variant="outlined"
          name="startMonth"
          value={[startMonth]}
          required
          onChange={onHandleChange}
        >
          <MenuItem value="">{T.START_MONTH}</MenuItem>
          {/* {(!endMonth?MONTH_LIST:relativeMonths.slice(0,MONTH_LIST.indexOf(endMonth)+1)).map((val) => { */}
          {(!endMonth?currentYearMonths:relativeMonths.slice(0,currentYearMonths.indexOf(endMonth)+1)).map((val) => {
            return (
              <MenuItem value={val}>
                <Typography noWrap>{val}</Typography>
              </MenuItem>
            );
          })}
        </MISTextField>

        <MISTextField
          // label={T.END_MONTH}
          fullWidth
          select
          size="small"
          variant="outlined"
          name="endMonth"
          value={[endMonth]}
          required
          onChange={onHandleChange}
        >
          <MenuItem value="">{T.END_MONTH}</MenuItem>
          {(!startMonth?currentYearMonths:relativeMonths.slice(currentYearMonths.indexOf(startMonth),12)).map((val) => {
            return (
              <MenuItem value={val}>
                <Typography noWrap>{val}</Typography>
              </MenuItem>
            );
          })}
        </MISTextField>

          {/* <MISDatePicker
            placeholder={T.START_DATE}
            inputFormat="MM/DD/YYYY"
            value={startDate}
            name="startDate"
            handleChange={onHandleDateChange}
            renderInput={(params) => <MISTextField {...params} />}
          />
          <MISDatePicker
            placeholder={T.END_DATE}
            inputFormat="MM/DD/YYYY"
            value={endDate}
            name="endDate"
            sx={{ ml: 1, mr: 1 }}
            handleChange={onHandleDateChange}
            renderInput={(params) => <MISTextField {...params} />}
          /> */}

          {/* <Tooltip title={T.XLS} placement="top">
            <StyledBox
              component="img"
              src={XLS}
              sx={{ maxWidth: "unset" }}
              onClick={() => handleExport(T.XL)}
            />
          </Tooltip> */}
        </Grid>
      </Grid>

      <NCTable
        allTableRows={allTableRows}
        refreshTable={refreshNCTable}
        handleActiveNcCountDialog={handleActiveNcCountDialog}
        handleDeleteNcCountDialog={handleDeleteNcCountDialog}
      />
    </Card>
  );
};

NCHistory.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  allTableRows: PropTypes.array,
  refreshNCTable: PropTypes.func,
  handleActiveNcCountDialog: PropTypes.func,
  handleDeleteNcCountDialog: PropTypes.func,
  handleNCDelete: PropTypes.func,
  onHandleDateChange: PropTypes.func,
  handleExport: PropTypes.func,
};

export default NCHistory;
