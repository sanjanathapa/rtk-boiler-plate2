import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Grid, Box, Button, styled, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SearchBar from "components/Members/SearchBar";
import MISDatePicker from "components/common/MISDatePicker";
import MISTextField from "components/common/MISTextField";

import { GET_SIZE } from "utils/responsive";

import T from "T";
import MISAutocomplete from "components/common/MISAutocomplete";
import { get } from "lodash";
import XLS from "assets/XLS.png";
export const StyledBox = styled(Box)(() => ({
  margin: "auto",
  maxWidth: "inherit",
  width: 45,
  height: 45,
  cursor: "pointer",
}));

const TopBar = ({
  startDate = null,
  endDate = null,
  projectListDetails=[],
  selectedProject="",
  onHandleAutoCompleteChange= noop,
  handleExport = noop,
  onHandleDateChange = noop,
}) => {
  const { isLg } = GET_SIZE();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent={isLg ? "space-between" : "center"}
      sx={{
        mt: 1,
        mb: 1,
        pl: 1,
        pr: 1,
        pt: 1,
        pb: 1,

        "& .MuiOutlinedInput-input": {
          fontSize: 14,
        },
        backgroundColor: "background.card"
      }}
    >

          <Grid item md={2} xs={12}>
            <MISAutocomplete
              // label={`${T.PROJECT} ${T.NAME}`}
              listDetails={projectListDetails}
              value={selectedProject}
              placeholder={T.PROJECT_NAME}
              required
              getByLabelText={(option) => get(option, "name", "")}
              onHandleChange={(event, newValue) =>
                onHandleAutoCompleteChange(
                  "projectId",
                  get(newValue, "id", ""),
                )
              }
            />
          </Grid>
          <Grid item md={2.5} xs={12} />
       
          <Grid item md={2} />
          
          <Grid item md={2} xs={12}>
            <MISDatePicker
              placeholder={T.START_DATE}
              inputFormat="MM/DD/YYYY"
              value={startDate}
              name="startDate"
              maxDate={endDate}
              disableFuture
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
              disableFuture
              name="endDate"
              sx={{ ml: 1 }}
              handleChange={onHandleDateChange}
              renderInput={(params) => <MISTextField {...params} />}
            />
          </Grid>
       
          <Grid item md={0.5} xs={12}>
            <Box display="flex" alignItems="center">
              <Tooltip title={T.XLS} placement="top">
                <StyledBox
                  component="img"
                  src={XLS}
                  onClick={() => handleExport(T.CSV)}
                />
              </Tooltip>
            </Box>
          </Grid>
      
    </Grid>
  );
};

TopBar.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  projectListDetails: PropTypes.array,
  selectedProject: PropTypes.string,
  handleExport: PropTypes.func,
  onHandleAutoCompleteChange: PropTypes.func,
  onHandleDateChange: PropTypes.func,

};

export default TopBar;
