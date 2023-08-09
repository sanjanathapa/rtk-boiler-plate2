import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Grid, Box, Button, styled, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SearchBar from "components/Members/SearchBar";
import MISDatePicker from "components/common/MISDatePicker";
import MISTextField from "components/common/MISTextField";
import XLS from "assets/XLS.png";

import { canAddMasterSettings } from "utils/permissions";
import { GET_SIZE } from "utils/responsive";
import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";

import T from "T";
import { useNavigate } from "react-router-dom";
import PreSalesFilters from "../PreSalesFilters";

export const StyledBox = styled(Box)(() => ({
  margin: "auto",
  maxWidth: "inherit",
  width: 45,
  height: 45,
  cursor: "pointer",
}));

const TopBar = ({
  value = "",
  startDate = null,
  endDate = null,
  searchInput = "",
  showOptions = false,
  showCancelIcon = false,
  searchTableData = {},
  handleExport = noop,
  onClick = noop,
  handleKeyChange = noop,
  handleChange = noop,
  reset = noop,
  onClickOutside = noop,
  onHandleDateChange = noop,
  handleAddEditProjectInfoDialog = noop,
  handleAddEditTechnologyInfoDialog = noop,
  handleAddEditWorkLocationInfoDialog = noop,
}) => {
  const navigate=useNavigate();
  const { isLg } = GET_SIZE();
  const handleProjectAdd=()=>{
    navigate("project-add")
  }
  return (
    <Grid
      container
      alignItems="center"
      justifyContent={isLg ? "space-between" : "center"}
      sx={{ mt: 1, p: 1, backgroundColor: "background.card" }}
      // sx={{
      //   mt: 1,
      //   mb: 1,
      //   pl: 2,
      //   pr: 3,
      //   "& .MuiOutlinedInput-input": {
      //     fontSize: 14,
      //   },
      // }}
    >
      <Grid item md={3} xs={12}>
        {/* <SearchBar
          records={searchTableData}
          searchInput={searchInput}
          showOptions={showOptions}
          showCancelIcon={showCancelIcon}
          onClick={onClick}
          handleKeyChange={handleKeyChange}
          handleChange={handleChange}
          reset={reset}
          onClickOutside={onClickOutside}
        /> */}
      </Grid>
      <Grid item md={4.5} />
      <Grid item md={2} xs={12}>
        {/* <PreSalesFilters
          // projectManagers={projectManagers}
          // workLocationList={workLocationList}
          // skillList={skillList}
          // departmentList={departmentList}
          // projectList={projectList}
          // filters={filters}
          // isFilterApplied={isFilterApplied}
          // isFilterStoredEmpty={isFilterStoredEmpty}
          // handleFilterClose={handleFilterClose}
          // handleFilterSubmit={handleFilterSubmit}
          // onhandleFilterChange={onhandleFilterChange}
        /> */}
      </Grid>

        {/* value ==="1" ?
        <Grid item md={2} />
        :
        <Grid item md={6} /> */}
       
      {/* {
        value ==="1" &&
        <>
          <Grid item md={2} xs={12}>
            <MISDatePicker
              placeholder={T.START_DATE}
              inputFormat="MM/DD/YYYY"
              value={startDate}
              name="startDate"
              maxDate={endDate}
              handleChange={onHandleDateChange}
              renderInput={(params) => <MISTextField {...params} />}
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <MISDatePicker
              placeholder={T.END_DATE}
              inputFormat="MM/DD/YYYY"
              value={endDate}
              minDate={startDate}
              name="endDate"
              sx={{ ml: 1, mr: 1 }}
              handleChange={onHandleDateChange}
              renderInput={(params) => <MISTextField {...params} />}
            />
          </Grid>
        </>
      } */}

      <Grid item >
        {/* <Box display="flex" alignItems="center">
          <Tooltip title={T.XLS} placement="top">
            <StyledBox
              component="img"
              src={XLS}
              onClick={() => handleExport(T.XL)}
            />
          </Tooltip>
        </Box> */}
      </Grid>

      <Grid item >
        <Button
          size="medium"
          sx={{
            bgcolor: NETSMARTZ_THEME_COLOR,
            whiteSpace: "nowrap",
            color: BACKGROUND.white,

            "& .MuiButton-startIcon": {
              mr: 0,
            },
            "&:hover": {
              bgcolor: NETSMARTZ_THEME_COLOR,
              color: BACKGROUND.white,
            },
          }}
          // disabled={!canAddMasterSettings()}
          startIcon={<AddIcon sx={{ width: 19 }} />}
          onClick={handleProjectAdd}
        >
          {
            T.PRE_SALES_REQUIREMENT
          }
        </Button>
      </Grid>
    </Grid>
  );
};

TopBar.propTypes = {
  value: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  searchInput: PropTypes.string,
  showOptions: PropTypes.bool,
  showCancelIcon: PropTypes.bool,
  searchTableData: PropTypes.object,
  handleExport: PropTypes.func,
  onClick: PropTypes.func,
  handleKeyChange: PropTypes.func,
  handleChange: PropTypes.func,
  reset: PropTypes.func,
  onClickOutside: PropTypes.func,
  onHandleDateChange: PropTypes.func,
  handleAddEditProjectInfoDialog: PropTypes.func,
  handleAddEditTechnologyInfoDialog: PropTypes.func,
  handleAddEditWorkLocationInfoDialog: PropTypes.func,

};

export default TopBar;
