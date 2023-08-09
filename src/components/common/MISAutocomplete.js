import React from "react";
import noop from "lodash/noop";
import PropTypes from "prop-types";

import { Checkbox, Typography, Autocomplete } from "@mui/material";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import T from "T";

import MISTextField from "./MISTextField";
import WithInputLabel from "./WithInputLabel";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MISAutocomplete = ({
  multiple,
  label = "",
  listDetails = [],
  value = [],
  placeholder = T.SELECT_OPTION,
  required,
  endIcon,
  deprecatedLabel = true,
  error = "",
  getByLabelText = noop,
  onHandleChange = noop,
  ...rest
}) => {
  const helperText = rest?.helperText;
  return (
    <Autocomplete
      multiple={multiple}
      options={listDetails}
      disableCloseOnSelect={multiple ? true : false}
      size="small"
      value={value}
      getOptionLabel={(option) => getByLabelText(option, label)}
      onChange={(event, newValue) => onHandleChange(event, newValue)}
      {...rest}
      helperText={helperText}
      renderOption={
        multiple
          ? (props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  sx={{ p: 0, mr: 0 }}
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                <Typography >{getByLabelText(option, label)}</Typography> 
              </li>
            )
          : false
      }
      renderInput={(params) => (
        <WithInputLabel
          label={deprecatedLabel && label}
          required={required}
          endIcon={endIcon}
          error={error}
        >
          <MISTextField
            variant="outlined"
            placeholder={placeholder}
            sx={{ "& .MuiOutlinedInput-root": { p: 0 } }}
            {...params}
          />
        </WithInputLabel>
      )}
    />
  );
};
MISAutocomplete.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  listDetails: PropTypes.array,
  value: PropTypes.array,
  getByLabelText: PropTypes.func,
  onHandleChange: PropTypes.func,
};
export default MISAutocomplete;
