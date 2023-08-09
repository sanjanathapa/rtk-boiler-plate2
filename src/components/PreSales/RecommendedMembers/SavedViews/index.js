import React, { useState } from "react";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import { Card, Typography, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { GET_SIZE } from "utils/responsive";

import ViewOptions from "./ViewOptions";

import T from "T";
import { useDispatch } from "react-redux";
import { savedFilterStore } from "slices/savedFilterSlice";
import { get } from "lodash";
import { NETSMARTZ_THEME_COLOR } from "theme/colors";


const SavedViews = ({
  filtersList = {},
  selectedFilterId,
  handleFilterApply = noop,
  onHandleDeleteFilter = noop,
  onHandleFilterSelect = noop,
  handleFilterClose = noop,
}) => {
  const dispatch= useDispatch();
  const [viewOpen, setViewOpen] = useState(false);
  const filters = get(filtersList, "results", []);
  const selectedFilter=get(filters.find(data=>data.id===selectedFilterId),"name","");
  const handleSavedViewClick = () => {
    setViewOpen(!viewOpen);
  };

  const handleSubmit = () => {
    dispatch(savedFilterStore({selectedFilterId}))
    handleFilterApply();
    setViewOpen(false);
  };

  const { isLg } = GET_SIZE();

  return (
    <Box pl={isLg ? 2 : 0}>
      <Card
        elevation={0}
        variant="outlined"
        onClick={handleSavedViewClick}
        sx={{
          p: 1,
          backgroundColor: "background.white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography 
          variant="body1" 
          fontSize={14} 
          fontWeight={selectedFilter && 700} 
          color={selectedFilter && NETSMARTZ_THEME_COLOR}
        >
          {!selectedFilter?T.SAVED_VIEWS: selectedFilter}
        </Typography>
        {viewOpen ? (
          <ArrowDropUpIcon fontSize="small" />
        ) : (
          <ArrowDropDownIcon fontSize="small" />
        )}
      </Card>

      {viewOpen && (
        <ViewOptions
          selectedFilterId={selectedFilterId}
          filtersList={filtersList}
          handleDelete={onHandleDeleteFilter}
          handleSubmit={handleSubmit}
          handleSelect={onHandleFilterSelect}
          handleOnBlur={() => setViewOpen(false)}
          handleClose={() => {
            dispatch(savedFilterStore({selectedFilterId:""}))
            setViewOpen(false);
            handleFilterClose();
          }}
        />
      )}
    </Box>
  );
};

SavedViews.propTypes = {
  selectedFilterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  filtersList: PropTypes.object,
  handleFilterApply: PropTypes.func,
  onHandleDeleteFilter: PropTypes.func,
  onHandleFilterSelect: PropTypes.func,
  handleFilterClose: PropTypes.func,
};

export default SavedViews;
