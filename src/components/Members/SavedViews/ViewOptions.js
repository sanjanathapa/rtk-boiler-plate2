import React, { Children, useState } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Typography, Divider, Card, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import { BORDER, NETSMARTZ_THEME_COLOR } from "theme/colors";
import { get } from "utils/lodash";
import { GET_SIZE } from "utils/responsive";

import T from "T";
import MISFooterButton from "components/common/MISFooterButton";

const ViewOptions = ({
  filtersList = {},
  selectedFilterId,
  handleSelect = noop,
  handleDelete = noop,
  handleOnBlur = noop,
  handleClose = noop,
  handleSubmit = noop,
}) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState({});
  const filters = get(filtersList, "results", []);
  const { isXs } = GET_SIZE();
  
  const filterHover = {};

  const handleMouse = (index, val) => {
    filterHover[index] = val;
    setShowDeleteIcon(filterHover);
  };

  return (
    <ClickAwayListener onClickAway={handleOnBlur}>
      <Card
        sx={{
          mt: 1,
          position: "absolute",
          width: isXs ? "70%" : "20%",
          zIndex: 200,
        }}
      >
        <Typography variant="subtitle1" p={1} textAlign="center" fontSize={14}>
          {T.SAVED_VIEWS}
        </Typography>
        <Divider />

        {Children.toArray(
          filters.map((filter, index) => {
            const filterId = get(filter, "id", "");
            return (
              <Grid
                container
                p={1}
                alignItems="center"
                sx={{
                  cursor: "pointer",
                  borderTop: `1px solid ${BORDER.tabsGrey}`,
                  "&:hover": {
                    backgroundColor: "background.default",
                  },
                }}
                onMouseEnter={() => handleMouse(index, true)}
                onMouseLeave={() => handleMouse(index, false)}
              >
                <Grid item xs="10" onClick={() => handleSelect(filterId)}>
                  <Typography
                    variant="subtitle1"
                    ml={1}
                    sx={{
                      color:
                        selectedFilterId === filterId
                          ? NETSMARTZ_THEME_COLOR
                          : "",
                    }}
                  >
                    {get(filter, "name", "")}
                  </Typography>
                </Grid>

                <Grid item xs="2">
                  {showDeleteIcon[index] && (
                    <DeleteIcon
                      fontSize="small"
                      onClick={(event) => {
                        event.preventDefault();
                        handleDelete(get(filter, "id", ""));
                      }}
                      sx={{ mr: 1, color: NETSMARTZ_THEME_COLOR }}
                    />
                  )}
                </Grid>
              </Grid>
            );
          })
        )}

        <Divider />

        {filters.length === 0 && (
          <Typography variant="subtitle1" textAlign="center" p={1}>
            {T.NO_FILTERS_SAVED}
          </Typography>
        )}

        {filters.length > 0 && (
          <MISFooterButton
            sx={{ p: 1 }}
            proceedButtonText={T.APPLY}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
          />
        )}
      </Card>
    </ClickAwayListener>
  );
};

ViewOptions.propTypes = {
  selectedFilterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  filtersList: PropTypes.object,
  selectedItems: PropTypes.array,
  handleOnBlur: PropTypes.func,
  handleClose: PropTypes.func,
  handleDelete: PropTypes.func,
  handleSelect: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default ViewOptions;
