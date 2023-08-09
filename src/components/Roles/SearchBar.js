import React, { Children } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  InputAdornment,
  Card,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

import { NETSMARTZ_THEME_COLOR } from "theme/colors";

import T from "T";
import { noop } from "lodash";

const SearchBar = ({
  roles = [],
  searchInput = "",
  showOptions = false,
  showCancelIcon = false,
  handleSearchOptionClick = noop,
  handleSearchClick = noop,
  handleReset = noop,
  handleSearchChange = noop,
  handleClickOutside = noop,
}) => {
  return (
    <>
      <TextField
        value={searchInput}
        variant="outlined"
        fullWidth
        size="small"
        autoComplete="off"
        sx={{
          backgroundColor: "background.white",
          "& .MuiOutlinedInput-input": {
            fontSize: 14,
          },
        }}
        placeholder={T.SEARCH_PLACEHOLDER}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {showCancelIcon && (
                <CancelIcon
                  fontSize="small"
                  sx={{ cursor: "pointer" }}
                  onClick={handleReset}
                />
              )}
            </InputAdornment>
          ),
          onClick: handleSearchClick,
          // on enter key
          onKeyDown: (event) =>
            // searchInput &&
            // (event.code === "Enter" || event.code === "NumpadEnter") &&
            handleSearchChange(event.target.value),
          onChange: (event) => handleSearchChange(event.target.value),
          // onBlur: handleClickOutside,
        }}
      />
      {showOptions && searchInput && (
        <Card
          sx={{
            mt: 0.5,
            position: "absolute",
            width: "20%",
            zIndex: 99,
          }}
        >
          {Children.toArray(
            roles.map((role, index) => {
              return (
                <Box
                  borderBottom="1px solid"
                  p={1}
                  borderColor="border.tabsGrey"
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: NETSMARTZ_THEME_COLOR,
                      color: "background.white",
                    },
                  }}
                  onClick={handleSearchOptionClick}
                >
                  <Typography variant="body1">{role}</Typography>
                </Box>
              );
            })
          )}
        </Card>
      )}
    </>
  );
};

SearchBar.propTypes = {
  searchInput: PropTypes.string,
  showOptions: PropTypes.bool,
  showCancelIcon: PropTypes.bool,
  handleSearchClick: PropTypes.func,
  handleSearchOptionClick: PropTypes.func,
  handleReset: PropTypes.func,
  handleSearchChange: PropTypes.func,
  resetSearch: PropTypes.func,
  handleClickOutside: PropTypes.func,
};

export default SearchBar;
