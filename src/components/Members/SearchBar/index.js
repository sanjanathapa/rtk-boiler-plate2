import React, { Children } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { InputAdornment, Card, Typography } from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

import MISTextField from "components/common/MISTextField";

import T from "T";
import { get } from "utils/lodash";
import { BACKGROUND } from "theme/colors";
import { fontSize } from "@mui/system";

const SearchBar = ({
  records = {},
  searchInput = "",
  showOptions = false,
  showCancelIcon = false,
  onClick = noop,
  handleKeyChange = noop,
  handleChange = noop,
  reset = noop,
  onClickOutside = noop,
}) => {
  const searchedData = get(records, "results", []);

  return (
    <>
    
      <MISTextField
        value={searchInput}
        name="search"
        fullWidth
        size="small"
        sx={{
          backgroundColor: "background.white",
          "& .MuiOutlinedInput-input": {
            fontSize: 14,
          },
        }}
        placeholder={T.SEARCH_PLACEHOLDER}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          handleKeyChange();
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                fontSize="small"
                name="searchIcon"
                onClick={handleChange}
                data-val={searchInput}
                sx={{
                  cursor: "pointer",
                }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {showCancelIcon && (
                <CancelIcon
                  fontSize="small"
                  sx={{ cursor: "pointer" }}
                  onClick={handleChange}
                />
              )}
            </InputAdornment>
          ),
        }}
      />

      {/* {showOptions && searchInput && (
        <ClickAwayListener onClickAway={onClickOutside}>
          <Card
            sx={{
              mt: 0.4,
              position: "absolute",
              zIndex: 190,
              width: "23.30%",
            }}
          >
            {Children.toArray(
              searchedData.map((record) => (
                <Typography
                  variant="body1"
                  mb={0.5}
                  p="5px 8px"
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: BACKGROUND.header,
                    },
                  }}
                  onClick={() => onClick(get(record, "userName", ""))}
                >
                  {record.userName}
                </Typography>
              ))
            )}
          </Card>
        </ClickAwayListener>
      )} */}
    </>
  );
};

SearchBar.propTypes = {
  searchedTableData: PropTypes.object,
  searchInput: PropTypes.string,
  showOptions: PropTypes.bool,
  showCancelIcon: PropTypes.bool,
  onClick: PropTypes.func,
  handleChange: PropTypes.func,
  handleKeyChange: PropTypes.func,
  reset: PropTypes.func,
  onClickOutside: PropTypes.func,
};

export default SearchBar;
