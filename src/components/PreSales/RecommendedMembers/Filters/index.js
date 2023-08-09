import React, { useState } from "react";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import { Card, Typography } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';

import FilterOptions from "./FilterOptions";

import T from "T";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { savedFilterStore } from "slices/savedFilterSlice";
import { NETSMARTZ_THEME_COLOR } from "theme/colors";

const Filters = ({
  projectManagers = {},
  workLocationList = {},
  skillList = {},
  departmentList = {},
  projectList = {},
  filters = {},
  isFilterStoredEmpty = false,
  handleFilterClose = noop,
  handleFilterSubmit = noop,
  onhandleFilterChange = noop,
}) => {
  const dispatch= useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const onFilterClose = () => {
    dispatch(savedFilterStore({selectedFilterId:""}))
    setFilterOpen(false);
    handleFilterClose();
  };

  const onFilterSubmit = () => {
    dispatch(savedFilterStore({selectedFilterId:""}))
    handleFilterSubmit();
    setFilterOpen(false);
  };
  return (
    <Box>
      <Card
        elevation={0}
        variant="outlined"
        onClick={handleFilterClick}
        sx={{
          p: 1,
          backgroundColor: "background.white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {isFilterStoredEmpty?
          <>
            <Typography variant="body1" fontSize={14}>{`${T.FILTER}s`}</Typography>
            <FilterAltOutlinedIcon fontSize="small" />
          </>
          :
          <>
            <Typography variant="body1" fontWeight={600} sx={{color:NETSMARTZ_THEME_COLOR}} fontSize={14}>{`${T.FILTER}s`}</Typography>
            <FilterAltOffOutlinedIcon fontSize="small" />
          </>
        }
      </Card>

      {filterOpen && (
        <FilterOptions
          filters={filters}
          projectManagers={projectManagers}
          workLocationList={workLocationList}
          skillList={skillList}
          departmentList={departmentList}
          projectList={projectList}
          handleFilterClose={onFilterClose}
          handleFilterSubmit={onFilterSubmit}
          onhandleFilterChange={onhandleFilterChange}
          handleClose={() => setFilterOpen(false)}
        />
      )}
    </Box>
  );
};

Filters.propTypes = {
  projectManagers: PropTypes.object,
  workLocationList: PropTypes.object,
  skillList: PropTypes.object,
  departmentList: PropTypes.object,
  projectList: PropTypes.object,
  filters: PropTypes.object,
  isFilterStoredEmpty: PropTypes.bool,
  onhandleFilterChange: PropTypes.func,
  handleFilterClose: PropTypes.func,
  handleFilterSubmit: PropTypes.func,
};

export default Filters;
