import React, { Children } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Grid, MenuItem, Typography, Checkbox, Card, Box, Stack } from "@mui/material";
import { isValid } from "date-fns";
import SelectCheck from "@mui/icons-material/Check";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import MISTextField from "components/common/MISTextField";
import MISDatePicker from "components/common/MISDatePicker";
import MISAutocomplete from "components/common/MISAutocomplete";

import T from "T";
import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";

import { get } from "utils/lodash";

import { PROJECT_ALLOCATION } from "./memberModel";
import { isNumber } from "lodash";
import { toast } from "react-toastify";

const ProjectDetails = ({
  id= "",
  empStatus= "",
  activeProjectList = {},
  projectList = {},
  projectDetails = [],
  allocationHoursLeft = 0,
  getBEDateFormat = noop,
  onHandleProjectDateChange = noop,
  onHandleProjectAddMore = noop,
  onHandleProjectChange = noop,
  onHandleAutoCompleteChange = noop,
  onHandleProjectRemove = noop,
  onHandleCheckboxChange = noop,
}) => {
  const projectListDetails = get(activeProjectList, "results", []);
  const prevProjectList = get(projectList, "results", []);
  const disableCondition = () => id && empStatus !== T.STABLE && empStatus !== T.YET_TO_JOIN ;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {Children.toArray(
            projectDetails.map((proj, index) => {
              const currentVal = prevProjectList.find(
                (project) => project.id === projectDetails[index]["projectId"]
              );
              // const currentVal = selectedVal.filter(
              //   (item) =>
              //   {
              //     return !projectDetails.some(project=>{
              //       return item.id===project.projectId
              //     }) 
              //   }  
              // ) 

              

              // const endDate = new Date(get(proj, "endDate", ""));

              return (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  pt={index === 0 ? 0 : 2}
                  // sx={{
                  //   pointerEvents:
                  //     isValid(endDate) && new Date() > endDate ? "none" : "",
                  // }}
                >
                  <Grid item md={2} xs={12}>
                    <MISAutocomplete
                      label={`${T.PROJECT} ${T.NAME}`}
                      listDetails={projectListDetails.filter(
                        (item) =>
                        {
                          return !projectDetails.some(project=>{
                            return item.id===project.projectId
                          }) 
                        }  
                      ) }
                      getByLabelText={(option) => get(option, "name", "")}
                      value={currentVal}
                      disabled={disableCondition()}
                      onHandleChange={(event, newValue) =>
                        onHandleAutoCompleteChange(
                          index,
                          "projectId",
                          get(newValue, "id", ""),
                          T.PROJECT
                        )
                      }
                    />
                  </Grid>

                  <Grid item md={2} xs={12}>
                    <MISDatePicker
                      label={T.START_DATE}
                      placeholder={T.START_DATE}
                      disabled={disableCondition()}
                      inputFormat="MM/DD/YYYY"
                      value={projectDetails[index]["startDate"]}
                      name="startDate"
                      maxDate={projectDetails[index]["endDate"]}
                      handleChange={(newValue, type) => {
                        const validDate = new Date(newValue);
                        if (isValid(validDate))
                          onHandleProjectDateChange(
                            getBEDateFormat(validDate),
                            type,
                            index
                          );
                      }}
                      renderInput={(params) => <MISTextField {...params} />}
                    />
                  </Grid>

                  <Grid item md={2} xs={12}>
                    <MISDatePicker
                      label={T.END_DATE}
                      placeholder={T.END_DATE}
                      disabled={disableCondition()}
                      inputFormat="MM/DD/YYYY"
                      value={projectDetails[index]["endDate"]}
                      name="endDate"
                      minDate={projectDetails[index]["startDate"]}
                      handleChange={(newValue, type) => {
                        const validDate = new Date(newValue);
                        if (isValid(validDate))
                          onHandleProjectDateChange(
                            getBEDateFormat(validDate),
                            type,
                            index
                          );
                      }}
                      renderInput={(params) => <MISTextField {...params} />}
                    />
                  </Grid>

                  <Grid item md={2} xs={12}>
                    <MISTextField
                      label={T.PROJECT_MANAGER}
                      fullWidth
                      select
                      disabled
                      size="small"
                      variant="outlined"
                      name="projectManager"
                      value={[get(currentVal, "projectManager.id", "")]}
                      onChange={(event) => onHandleProjectChange(index, event)}
                    >
                      <MenuItem value="">{T.SELECT}</MenuItem>
                      <MenuItem
                        value={get(
                          currentVal,
                          "projectManager.id",
                          T.SELECT_OPTION
                        )}
                      >
                        <Typography noWrap>
                          {get(currentVal, "projectManager.name", "")}
                        </Typography>
                      </MenuItem>
                    </MISTextField>
                  </Grid>

                  <Grid item md={2} xs={12}>
                    <Typography variant="body1">{T.ALLOCATION}</Typography>

                    <Box display="flex">
                      <MISTextField
                        fullWidth
                        select
                        disabled={disableCondition()}
                        size="small"
                        variant="outlined"
                        name="hoursAllocation"
                        value={[projectDetails[index]["hoursAllocation"]]}
                        onChange={(event) =>
                          onHandleProjectChange(index, event)
                        }
                      >
                        <MenuItem value="">{T.SELECT}</MenuItem>
                        {PROJECT_ALLOCATION.map((val) => {
                          return (
                            <MenuItem value={val}>
                              <Typography noWrap>{val}</Typography>
                              {projectDetails[index]["hoursAllocation"] ===
                                val && (
                                <SelectCheck
                                  sx={{
                                    width: "20px",
                                    height: "20px",
                                    display: "none",
                                  }}
                                />
                              )}
                            </MenuItem>
                          );
                        })}
                      </MISTextField>

                      {projectDetails[index]["hoursAllocation"] ===
                        T.CUSTOM && (
                        <MISTextField
                          sx={{ ml: 1 }}
                          fullWidth
                          size="small"
                          disabled={disableCondition()}
                          variant="outlined"
                          name="hoursAllocationCustom"
                          value={
                            projectDetails[index]["hoursAllocationCustom"] || ""
                          }
                          onChange={(event) => {
                            const { value } = event.target;

                            if (value === "0") return;

                            const intVal = value ? parseInt(value) : "";

                            if (
                              (intVal && !isNumber(intVal)) ||
                              isNaN(intVal)
                            ) {
                              toast.error(T.ONLY_NUMBERS_ALLOWED);
                              return;
                            }

                            onHandleProjectChange(index, event);
                          }}
                        />
                      )}
                    </Box>
                  </Grid>

                  <Grid item md={2} xs={12}>
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography
                          variant="body"
                          component="legend"
                          color="text.label"
                        >
                          {T.PRIMARY_PROJECT}
                        </Typography>
                        <Checkbox
                          size="small"
                          sx={{ ml: 3 }}
                          disabled={disableCondition()}
                          name="isPrimary"
                          checked={projectDetails[index]["isPrimary"]}
                          onChange={(event) =>
                            onHandleCheckboxChange(index, event, T.PROJECT)
                          }
                        />
                      </Grid>

                      <Grid item xs={2}>
                        {
                         projectDetails.length=== 1 ?
                         <AddCircleOutlineIcon
                              onClick={!disableCondition() && onHandleProjectAddMore}
                              fontSize="small"
                              sx={{
                                mt: 3.5,
                                cursor: "pointer",
                                pointerEvents: "visible",
                                color: NETSMARTZ_THEME_COLOR,
                              }}
                            />
                       : 
                        projectDetails.length - 1 === index ? (
                          <Stack sx={{display:"flex", flexFlow:"nowrap"}}>
                            <RemoveCircleOutlineIcon
                            fontSize="small"
                            onClick={!disableCondition() && (() => onHandleProjectRemove(index))}
                            sx={{
                              mt: 3.5,
                              cursor: "pointer",
                              color: NETSMARTZ_THEME_COLOR,
                            }}
                          />
                            <AddCircleOutlineIcon
                              onClick={!disableCondition() && onHandleProjectAddMore}
                              fontSize="small"
                              sx={{
                                mt: 3.5,
                                cursor: "pointer",
                                pointerEvents: "visible",
                                color: NETSMARTZ_THEME_COLOR,
                              }}
                            />
                          </Stack>
                        ) : (
                          <RemoveCircleOutlineIcon
                            fontSize="small"
                            onClick={!disableCondition() && (() => onHandleProjectRemove(index))}
                            sx={{
                              mt: 3.5,
                              cursor: "pointer",
                              color: NETSMARTZ_THEME_COLOR,
                            }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          )}
        </Grid>
      </Grid>
      <Card
        elevation={0}
        sx={{
          maxWidth: "20%",
          float: "right",
          p: 2,
          mt: 10,
          background: BACKGROUND.cardDefault,
        }}
      >
        <Box display="flex">
          <Typography variant="body1">{T.AVAILABILITY}:</Typography>
          <Typography variant="body1" color={NETSMARTZ_THEME_COLOR} ml={0.5}>
            {allocationHoursLeft > 0 ? T.YES : T.NO}
          </Typography>
        </Box>

        <Box display="flex">
          <Typography variant="body1">{T.AVAILABLE_HOURS}:</Typography>
          <Typography variant="body1" color={NETSMARTZ_THEME_COLOR} ml={0.5}>
            {`${allocationHoursLeft > 0 ? allocationHoursLeft : 0} hrs`}
          </Typography>
        </Box>
      </Card>
    </>
  );
};

ProjectDetails.propTypes = {
  id: PropTypes.string,
  empStatus: PropTypes.string,
  activeProjectList: PropTypes.object,
  projectDetails: PropTypes.array,
  allocationHoursLeft: PropTypes.number,
  getBEDateFormat: PropTypes.func,
  onHandleProjectDateChange: PropTypes.func,
  onHandleProjectAddMore: PropTypes.func,
  onHandleProjectChange: PropTypes.func,
  onHandleAutoCompleteChange: PropTypes.func,
  onHandleProjectRemove: PropTypes.func,
  onHandleCheckboxChange: PropTypes.func,
};

export default ProjectDetails;
