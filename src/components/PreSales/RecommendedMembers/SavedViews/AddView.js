import React, { useState } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";

import { Typography, Divider, Card, TextField } from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import T from "T";
import MISFooterButton from "components/common/MISFooterButton";
import { GET_SIZE } from "utils/responsive";

const AddView = ({ handleFilterSave = noop, handleClose = noop }) => {
  const [viewName, setViewName] = useState("");
  const { isXs } = GET_SIZE();

  const onHandleChange = (event) => {
    const { value } = event.target;
    setViewName(value);
  };

  const handleApply = () => {
    handleFilterSave(viewName);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Card
        sx={{
          position: "absolute",
          width: isXs ? "70%" : "17%",
          zIndex: 100,
        }}
      >
        <Typography
          variant="subtitle2"
          p={1}
          textAlign="center"
          fontWeight={600}
        >
          {T.SAVE_VIEW}
        </Typography>

        <Divider />

        <Typography variant="subtitle1" p={1.5} pb={0} fontWeight={500}>
          {T.VIEW_NAME}*
        </Typography>

        <TextField
          placeholder={T.VIEW_NAME}
          variant="outlined"
          size="small"
          name="email"
          sx={{
            pl: 1.5,
            pr: 1.5,
            pb: 1.5,
          }}
          required
          onChange={onHandleChange}
        />

        <Divider />

        <MISFooterButton
          sx={{ p: 1.5 }}
          proceedButtonText={T.APPLY}
          handleClose={handleClose}
          handleSubmit={handleApply}
        />
      </Card>
    </ClickAwayListener>
  );
};

AddView.propTypes = {
  handleFilterSave: PropTypes.func,
  handleClose: PropTypes.func,
};

export default AddView;
