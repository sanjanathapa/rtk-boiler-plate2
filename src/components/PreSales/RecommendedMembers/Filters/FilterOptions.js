import React, { Children } from "react";
import PropTypes from "prop-types";
import { noop, isEmpty, orderBy } from "lodash";

import { Typography, Divider, Card, Button, Box } from "@mui/material";
import MISAutocomplete from "components/common/MISAutocomplete";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { FILTER_OPTIONS } from "settings/constants/filter";
import {
  EMP_STATUS,
  PROJECT_MODE,
  AVAILABILITY,
  EMP_MODE_LIST,
} from "components/Members/Member/memberModel";

import { NETSMARTZ_THEME_COLOR, BACKGROUND } from "theme/colors";
import { GET_SIZE } from "utils/responsive";
import { isNumber } from "utils/validations";

import T from "T";

import { get } from "utils/lodash";
import MISTextField from "components/common/MISTextField";
import { toast } from "react-toastify";

const FilterOptions = ({
  filters = {},
  projectManagers = {},
  workLocationList = {},
  skillList = {},
  departmentList ={},
  projectList = {},
  handleFilterClose = noop,
  handleFilterSubmit = noop,
  onhandleFilterChange = noop,
  handleClose = noop,
}) => {
  const technologyList = get(skillList, "results", []);
  const locationList = get(workLocationList, "results", []);
  const projManagers = get(projectManagers, "results", []);
  const projects = get(projectList, "results", []);
  const departments = get(departmentList, "results", []);
  const { isXs } = GET_SIZE();
  
  const getFilterRecords = (val) => {
    switch (val) {
      case T.PRIMARY_SKILL:
        return technologyList;
      case T.SECONDARY_SKILL:
        return technologyList;
      case T.WORK_LOCATION:
        return locationList;
      case T.DEPARTMENT:
        return departments;
      case T.EMP_MODE:
        return EMP_MODE_LIST;
      case T.STATUS:
        return EMP_STATUS;
      case T.PROJECT:
        return projects;
      case T.PROJECT_MODE:
        return PROJECT_MODE;
      case T.PROJECT_MANAGER:
        return orderBy(projManagers, ["name"], ["asc"]);
      case T.AVAILABILITY:
        return AVAILABILITY;
      case T.EXPERIENCE:
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      default:
        return;
    }
  };

  const getLabelData = (option, index) => {
    const optionVal = isEmpty(option) ? "" : option;

    switch (index) {
      case 0:
        return get(option, "skillName", "");
      case 1:
        return get(option, "skillName", "");
      case 2:
        return get(option, "workLocationName", "");
      case 3:
        return get(option, "departmentName", "");
      case 4:
        return optionVal;
      case 5:
        return optionVal;
      case 6:
        return get(option, "name", "");
      case 7:
        return optionVal;
      case 8:
        return optionVal;
      case 9:
        return get(option, "name", "");
      default:
        return;
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Card
        sx={{
          mt: 1,
          position: "absolute",
          width: isXs ? "80%" : "25%",
          zIndex: 400,
        }}
      >
        <Box
          sx={{
            maxHeight: "calc(100vh - 250px)",
            overflowY: "auto",
          }}
        >
          <Typography variant="subtitle1" p={1} textAlign="center">
            {T.FILTER}
          </Typography>
          <Divider />

          {Children.toArray(
            FILTER_OPTIONS.map((item, index) => {
              const lists = getFilterRecords(item);

              const multiple = [
                T.PRIMARY_SKILL,
                T.SECONDARY_SKILL,
                T.WORK_LOCATION,
                T.DEPARTMENT,
                T.PROJECT,
                T.PROJECT_MANAGER,
              ].includes(item);

              return (
                <Box
                  display="flex"
                  p="10px 20px"
                  justifyContent="space-between"
                  pb={index >= 7 ? "15px" : "0px"}
                >
                  <Typography variant="subtitle1" noWrap>
                    {item}
                  </Typography>

                  {item === `${T.EXPERIENCE} (In Years)` && (
                    <Box display="flex">
                      <MISTextField
                        required
                        placeholder={T.MIN}
                        size="small"
                        variant="outlined"
                        name="minExp"
                        sx={{ width: 60 }}
                        value={
                          Object.keys(filters).length > 0
                            ? filters["minExp"]
                            : ""
                        }
                        onChange={(event) => {
                          const { value } = event.target;

                          if (value && !isNumber(value)) {
                            toast.error(T.ONLY_NUMBERS_ALLOWED);
                            return;
                          }

                          onhandleFilterChange(value, "minExp");
                        }}
                      />

                      <MISTextField
                        required
                        placeholder={T.MAX}
                        size="small"
                        variant="outlined"
                        name="maxExp"
                        sx={{ ml: 8, width: 60 }}
                        value={
                          Object.keys(filters).length > 0
                            ? filters["maxExp"]
                            : ""
                        }
                        onChange={(event) => {
                          const { value } = event.target;
                          if (value && !isNumber(value)) {
                            toast.error(T.ONLY_NUMBERS_ALLOWED);
                            return;
                          }

                          onhandleFilterChange(value, "maxExp");
                        }}
                      />
                    </Box>
                  )}

                  {item !== `${T.EXPERIENCE} (In Years)` && (
                    <MISAutocomplete
                      multiple={multiple}
                      listDetails={lists}
                      size="small"
                      placeholder={T.SELECT}
                      sx={{
                        width: 185,
                      }}
                      value={
                        Object.keys(filters).length > 0 ? filters[item] : []
                      }
                      getByLabelText={(option) => getLabelData(option, index)}
                      onHandleChange={(event, newValue) => {
                        onhandleFilterChange(newValue, item);
                      }}
                    />
                  )}
                </Box>
              );
            })
          )}
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" p={2}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: BACKGROUND.black,
              color: BACKGROUND.black,

              "&:hover": {
                borderColor: NETSMARTZ_THEME_COLOR,
                color: NETSMARTZ_THEME_COLOR,
              },
            }}
            onClick={handleFilterClose}
          >
            {T.RESET}
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: NETSMARTZ_THEME_COLOR,
              "&:hover": {
                bgcolor: NETSMARTZ_THEME_COLOR,
              },
            }}
            onClick={handleFilterSubmit}
          >
            {T.APPLY}
          </Button>
        </Box>
      </Card>
    </ClickAwayListener>
  );
};

FilterOptions.propTypes = {
  projectManagers: PropTypes.object,
  workLocationList: PropTypes.object,
  skillList: PropTypes.object,
  departmentList: PropTypes.object,
  projectList: PropTypes.object,
  filters: PropTypes.object,
  onhandleFilterChange: PropTypes.func,
  handleFilterSubmit: PropTypes.func,
  handleFilterClose: PropTypes.func,
  handleClose: PropTypes.func,
};

export default FilterOptions;
