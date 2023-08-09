import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Grid, Box, Button, styled, Tooltip, MenuItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SearchBar from "components/Members/SearchBar";
import MISDatePicker from "components/common/MISDatePicker";
import MISTextField from "components/common/MISTextField";
import XLS from "assets/XLS.png";

import { canAddMasterSettings } from "utils/permissions";
import { GET_SIZE } from "utils/responsive";
import { BACKGROUND, NETSMARTZ_THEME_COLOR, TEXT } from "theme/colors";

import T from "T";
import { TYPES_OF_NC } from "components/Members/Member/memberModel";
import MISAutocomplete from "components/common/MISAutocomplete";
import { get, orderBy } from "lodash";
import { MISCurrentUser } from "utils/validations";

export const StyledBox = styled(Box)(() => ({
  margin: "auto",
  maxWidth: "inherit",
  width: 45,
  height: 45,
  cursor: "pointer",
}));

const NCTopBar = ({
  tabValue = "",
  startDate = null,
  endDate = null,
  searchInput = "",
  ncType = "",
  reportingManager = "",
  projectManagers = {},
  showOptions = false,
  showCancelIcon = false,
  searchTableData = {},
  handleExport = noop,
  onClick = noop,
  handleKeyChange = noop,
  handleChange = noop,
  reset = noop,
  onClickOutside = noop,
  handleAddNCInfoDialog = noop,
  onHandleDateChange = noop,
  onHandleAutoCompleteChange = noop,
  onHandleChange = noop,
}) => {
  const { isLg } = GET_SIZE();
  const {user}= MISCurrentUser();
  const userRole= get(user,"role","");
  const pMResults = get(projectManagers, "results", []);
  const selectedPM = pMResults.find((res) => res.id === reportingManager) || {};
  return (
    <Grid
      container
      alignItems="center"
      justifyContent={isLg ? "space-between" : "center"}
      sx={{
        mt: 1,
        mb: 1,
        pl: 2,
        pr: 3,
        "& .MuiOutlinedInput-input": {
          fontSize: 14,
        },
      }}
    >
      <Grid item md={3} xs={12}>
        <SearchBar
          records={searchTableData}
          searchInput={searchInput}
          showOptions={showOptions}
          showCancelIcon={showCancelIcon}
          onClick={onClick}
          handleKeyChange={handleKeyChange}
          handleChange={handleChange}
          reset={reset}
          onClickOutside={onClickOutside}
        />
      </Grid>
       {
        
        // <Grid item md={3.5} />
        <Grid item md={tabValue ==="1" && userRole!==T.PM?1.5:tabValue ==="1" && userRole===T.PM?3.5:6} />
        
       }
       {
        userRole!==T.PM &&
          <Grid item md={2} xs={12}>
                <MISAutocomplete
                listDetails={orderBy(pMResults, ["name"], ["asc"])}
                value={selectedPM}
                placeholder={T.REPORTING_MANAGER}
                getByLabelText={(option) => get(option, "name", "")}
                onHandleChange={(event, newValue) =>
                  onHandleAutoCompleteChange(
                    "reportingManager",
                    get(newValue, "id", "")
                  )
                }
              />
            </Grid>
       }

          {tabValue==="1" &&
            <>
              <Grid item md={2} xs={12}>
                <MISAutocomplete
                  listDetails={TYPES_OF_NC}
                  value={ncType}
                  placeholder={T.TYPE_OF_NC}
                  getByLabelText={(option) => option}
                  onHandleChange={(event, newValue) =>
                    onHandleAutoCompleteChange(
                      "ncType",
                      newValue
                    )
                  }
                />
              </Grid>
              
              <Grid item md={1.5} xs={12}>
                <MISDatePicker
                  placeholder={T.START_DATE}
                  inputFormat="MM/DD/YYYY"
                  value={startDate}
                  name="startDate"
                  handleChange={onHandleDateChange}
                  renderInput={(params) => <MISTextField {...params} />}
                />
              </Grid>
              <Grid item md={1.5} xs={12}>
                <MISDatePicker
                  placeholder={T.END_DATE}
                  inputFormat="MM/DD/YYYY"
                  value={endDate}
                  name="endDate"
                  sx={{ ml: 1, mr: 1 }}
                  handleChange={onHandleDateChange}
                  renderInput={(params) => <MISTextField {...params} />}
                />
              </Grid>
          
            </>
          }

      {/* <Grid item>
        <Box display="flex" alignItems="center">
          <Tooltip title={T.XLS} placement="top">
            <StyledBox
              component="img"
              src={XLS}
              onClick={() => handleExport(T.XL)}
            />
          </Tooltip>
        </Box>
      </Grid> */}
      {/* <Grid item>
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
          disabled={!canAddMasterSettings()}
          startIcon={<AddIcon sx={{ width: 19 }} />}
          onClick={() => handleAddNCInfoDialog()}>
          {T.ADD_NC}
        </Button>
      </Grid> */}

      
    </Grid>
  );
};

NCTopBar.propTypes = {
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
  handleAddNCDialog: PropTypes.func,
  onHandleAutoCompleteChange: PropTypes.func,
  onHandleChange: PropTypes.func,

};

export default NCTopBar;
