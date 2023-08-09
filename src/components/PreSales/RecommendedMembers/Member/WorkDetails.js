import React, { Children } from "react";
import PropTypes from "prop-types";
import { noop, capitalize } from "lodash";

import { Grid, MenuItem, Typography, Rating, Checkbox, FormControl, FormGroup, FormControlLabel, Alert } from "@mui/material";
import SelectCheck from "@mui/icons-material/Check";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import MISTextField from "components/common/MISTextField";
import MISDatePicker from "components/common/MISDatePicker";
import MISAutocomplete from "components/common/MISAutocomplete";
import T from "T";

import { NETSMARTZ_THEME_COLOR } from "theme/colors";
import { get } from "utils/lodash";

import { JIRA_FREQUENCY, PROJECT_MODE, REGION_LIST, YES_NO_VALUES } from "./memberModel";
import WithInputLabel from "components/common/WithInputLabel";
import JiraNameConfirm from "./JiraNameConfim";

const WorkDetails = ({
  id= "",
  empStatus= "",
  isBytLead = false,
  clientJira = false,
  jiraName = "",
  previousJiraName = "",
  projectMode = "",
  internalJiraExemption = false,
  trainingToBeAssigned = false,
  confirmJiraName = false,
  trainingName = "",
  trainingStartDate = null,
  trainingEndDate = null,
  comments = "",
  jiraFrequency ="",
  region ="",
  technologyDetails = [],
  workingDays=[],
  weekDaysList=[],
  skillList = {},
  trainingList = {},
  handleWorkingDaysCheckboxChange = noop,
  onHandleChange = noop,
  onHandleDateChange = noop,
  onHandleTechAddMore = noop,
  onHandleTechChange = noop,
  onHandleTechRemove = noop,
  onHandleAutoCompleteChange = noop,
  onHandleCheckboxChange = noop,
  handleJiraNameChange = noop,
  handleRevertChange = noop,
}) => {
  
  const skillListResults = get(skillList, "results", []);
  const disableCondition = () => id && empStatus !== T.STABLE && empStatus !== T.YET_TO_JOIN;
  return (
    <Grid container spacing={2}>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.JIRA_NAME}
          fullWidth
          placeholder={T.JIRA_NAME}
          size="small"
          disabled={disableCondition()}
          variant="outlined"
          name="jiraName"
          value={jiraName}
          onBlur = {handleJiraNameChange}
          onChange={onHandleChange}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.CLIENT_JIRA}
          fullWidth
          select
          disabled={disableCondition()}
          size="small"
          variant="outlined"
          name="clientJira"
          value={[clientJira]}
          onChange={onHandleChange}
        >
          <MenuItem value="">{T.SELECT_OPTION}</MenuItem>

          {Object.keys(YES_NO_VALUES).map((key) => {
            return (
              <MenuItem value={YES_NO_VALUES[key]}>
                <Typography noWrap>{key}</Typography>
                {clientJira && (
                  <SelectCheck
                    sx={{ width: "20px", height: "20px", display: "none" }}
                  />
                )}
              </MenuItem>
            );
          })}
        </MISTextField>
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.INTERNAL_JIRA_EXEMPTION}
          fullWidth
          select
          disabled={disableCondition()}
          size="small"
          variant="outlined"
          name="internalJiraExemption"
          value={[internalJiraExemption]}
          onChange={onHandleChange}
        >
          <MenuItem value="">{T.SELECT_OPTION}</MenuItem>

          {Object.keys(YES_NO_VALUES).map((key) => {
            return (
              <MenuItem value={YES_NO_VALUES[key]}>
                <Typography noWrap>{key}</Typography>
                {internalJiraExemption && (
                  <SelectCheck
                    sx={{ width: "20px", height: "20px", display: "none" }}
                  />
                )}
              </MenuItem>
            );
          })}
        </MISTextField>
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.PROJECT_MODE}
          fullWidth
          select
          disabled={disableCondition()}
          size="small"
          variant="outlined"
          name="projectMode"
          value={[projectMode]}
          onChange={onHandleChange}
        >
          <MenuItem value="">{T.SELECT_OPTION}</MenuItem>
          {PROJECT_MODE.map((val) => {
            return (
              <MenuItem value={val}>
                <Typography noWrap>{val}</Typography>
              </MenuItem>
            );
          })}
        </MISTextField>
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.BYT_LEAD}
          fullWidth
          select
          disabled={disableCondition()}
          size="small"
          variant="outlined"
          name="isBytLead"
          value={[isBytLead]}
          onChange={onHandleChange}
        >
          <MenuItem value="">{T.SELECT_OPTION}</MenuItem>

          {Object.keys(YES_NO_VALUES).map((key) => {
            return (
              <MenuItem value={YES_NO_VALUES[key]}>
                <Typography noWrap>{key}</Typography>
                {isBytLead && (
                  <SelectCheck
                    sx={{ width: "20px", height: "20px", display: "none" }}
                  />
                )}
              </MenuItem>
            );
          })}
        </MISTextField>
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.TRAINING_TO_BE_ASSIGNED}
          fullWidth
          select
          disabled={disableCondition()}
          size="small"
          variant="outlined"
          name="trainingToBeAssigned"
          value={[trainingToBeAssigned]}
          onChange={onHandleChange}
        >
          <MenuItem value="">{T.SELECT_OPTION}</MenuItem>

          {Object.keys(YES_NO_VALUES).map((key) => {
            return (
              <MenuItem value={YES_NO_VALUES[key]}>
                <Typography noWrap>{key}</Typography>
                {trainingToBeAssigned && (
                  <SelectCheck
                    sx={{ width: "20px", height: "20px", display: "none" }}
                  />
                )}
              </MenuItem>
            );
          })}
        </MISTextField>
      </Grid>

      {trainingToBeAssigned && (
        <>
          <Grid item md={4} xs={12}>
            <MISTextField
              label={`${T.TRAINING} ${T.NAME}`}
              fullWidth
              disabled={disableCondition()}
              placeholder={`${T.TRAINING} ${T.NAME}`}
              size="small"
              variant="outlined"
              name="trainingName"
              value={trainingName}
              onChange={onHandleChange}
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <MISDatePicker
              label={`${T.TRAINING} ${T.START_DATE}`}
              placeholder={`${T.TRAINING} ${T.START_DATE}`}
              inputFormat="MM/DD/YYYY"
              disabled={disableCondition()}
              value={trainingStartDate}
              name="trainingStartDate"
              maxDate={trainingEndDate}
              handleChange={onHandleDateChange}
              renderInput={(params) => <MISTextField {...params} />}
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <MISDatePicker
              label={`${T.TRAINING} ${T.END_DATE}`}
              placeholder={`${T.TRAINING} ${T.END_DATE}`}
              inputFormat="MM/DD/YYYY"
              disabled={disableCondition()}
              value={trainingEndDate}
              name="trainingEndDate"
              minDate={trainingStartDate}
              handleChange={onHandleDateChange}
              renderInput={(params) => <MISTextField {...params} />}
            />
          </Grid>
        </>
      )}

      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.COMMENTS}
          fullWidth
          placeholder={T.COMMENTS}
          size="small"
          disabled={disableCondition()}
          variant="outlined"
          name="comments"
          value={comments}
          onChange={onHandleChange}
        />
      </Grid>

      <Grid item md={4} xs={12} >
      <MISTextField
          label={T.FREQUENCY_OF_JIRA}
          fullWidth
          select
          disabled={disableCondition()}
          size="small"
          variant="outlined"
          name="jiraFrequency"
          value={jiraFrequency}
          required
          onChange={onHandleChange}
        >
          <MenuItem value="">{T.SELECT_OPTION}</MenuItem>
          {JIRA_FREQUENCY.map((val) => {
            return (
              <MenuItem value={val}>
                <Typography noWrap>{val}</Typography>
              </MenuItem>
            );
          })}
        </MISTextField>
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.REGION}
          fullWidth
          select
          disabled={disableCondition()}
          size="small"
          variant="outlined"
          name="region"
          value={[region]}
          onChange={onHandleChange}
        >
          <MenuItem value="">{T.SELECT_OPTION}</MenuItem>
          {REGION_LIST.map((val) => {
            return (
              <MenuItem value={val}>
                <Typography noWrap>{val}</Typography>
              </MenuItem>
            );
          })}
        </MISTextField>
      </Grid>

      <Grid item xs={12}>
        <WithInputLabel
        label={T.WORKING_DAYS}
        required
        >
        {
          <FormControl component="fieldset">
          <FormGroup row>
            {
              weekDaysList.map((val,index)=>{
                return (
                  <FormControlLabel
                    size="small"
                    name={val.label}
                    value={val.label}
                    disabled={disableCondition()}
                    control={<Checkbox />}
                    checked={workingDays.includes(val.label)?!val.check:val.check}
                    label={val.label}
                    labelPlacement="end"
                    onChange={(event)=>handleWorkingDaysCheckboxChange(event,index)}
                  />
                )    
              }) 
            }
          </FormGroup>
        </FormControl>
        }
      </WithInputLabel>
      </Grid>

      <Grid item xs={12}>
        <Typography
          fontSize={16}
          fontWeight={600}
          mt={2}
        >{`${T.TECHNOLOGY.toUpperCase()} ${T.DETAILS.toUpperCase()}`}</Typography>
      </Grid>

      <Grid item xs={12}>
        {Children.toArray(
          technologyDetails.map((data, index) => {
            return (
              <Grid container spacing={2} key={index} pt={index === 0 ? 0 : 1}>
                <Grid item md={4} xs={12}>
                  <MISAutocomplete
                    label={`${T.TECHNOLOGY} ${T.NAME}`}
                    listDetails={skillListResults.filter(
                      (skill) =>
                      {
                        return !technologyDetails.some(tech=>{
                          return skill.id===tech.skillId
                        }) 
                      }
                    )}
                    value={
                      skillListResults.find(
                        (skill) =>
                          skill.id === technologyDetails[index]["skillId"]
                      ) || {}
                    }
                    disabled={disableCondition()}
                    getByLabelText={(option) =>
                      capitalize(get(option, "skillName", ""))
                    }
                    onHandleChange={(event, newValue) =>
                      onHandleAutoCompleteChange(
                        index,
                        "skillId",
                        get(newValue, "id", ""),
                        T.SKILL
                      )
                    }
                  />
                </Grid>

                <Grid item md={2} xs={12}>
                  <Typography
                    variant="body"
                    component="legend"
                    color="text.label"
                  >
                    {T.RATING}
                  </Typography>
                  <Rating
                    name="skillRating"
                    disabled={disableCondition()}
                    precision={0.5}
                    value={technologyDetails[index]["skillRating"]}
                    sx={{ mt: 1.2 }}
                    onChange={(event) => onHandleTechChange(index, event)}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <Typography
                    variant="body"
                    component="legend"
                    color="text.label"
                  >
                    {T.PRIMARY_SKILL}
                  </Typography>
                  <Checkbox
                    size="small"
                    sx={{ ml: 3 }}
                    disabled={disableCondition()}
                    name="isPrimary"
                    checked={technologyDetails[index]["isPrimary"]}
                    onChange={(event) =>
                      onHandleCheckboxChange(index, event, T.TECHNOLOGY)
                    }
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  {technologyDetails.length=== 1 ?
                    <AddCircleOutlineIcon
                    onClick={ !disableCondition() && onHandleTechAddMore }
                    fontSize="small"
                    sx={{
                      mt: 3.5,
                      cursor: "pointer",
                      color: NETSMARTZ_THEME_COLOR,
                    }}
                  />
                  :
                  technologyDetails.length - 1 === index ? (
                    <>
                      <RemoveCircleOutlineIcon
                        onClick={!disableCondition() && (() => onHandleTechRemove(index))}
                        fontSize="small"
                        sx={{
                          mt: 3.5,
                          cursor: "pointer",
                          color: NETSMARTZ_THEME_COLOR,
                        }}
                      />
                      <AddCircleOutlineIcon
                        onClick={!disableCondition() && onHandleTechAddMore}
                        fontSize="small"
                        sx={{
                          mt: 3.5,
                          cursor: "pointer",
                          color: NETSMARTZ_THEME_COLOR,
                        }}
                      />
                      
                    </>
                  ) : (
                    <RemoveCircleOutlineIcon
                      onClick={!disableCondition() &&(() => onHandleTechRemove(index))}
                      fontSize="small"
                      sx={{
                        mt: 3.5,
                        cursor: "pointer",
                        color: NETSMARTZ_THEME_COLOR,
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            );
          })
        )}
      </Grid>
      {
        id && previousJiraName!==jiraName && 
        <JiraNameConfirm 
          confirmJiraName={confirmJiraName} 
          jiraName={jiraName} 
          previousJiraName={previousJiraName} 
          handleRevertChange={handleRevertChange}
          handleJiraNameChange={handleJiraNameChange}
        />
      }
    </Grid>
  );
};

WorkDetails.propTypes = {
  id: PropTypes.bool,
  empStatus: PropTypes.string,
  jiraName: PropTypes.string,
  isBytLead: PropTypes.bool,
  clientJira: PropTypes.bool,
  internalJiraExemption: PropTypes.bool,
  trainingToBeAssigned: PropTypes.bool,
  projectMode: PropTypes.string,
  trainingName: PropTypes.string,
  trainingStartDate: PropTypes.instanceOf(Date),
  trainingEndDate: PropTypes.instanceOf(Date),
  comments: PropTypes.string,
  jiraFrequency: PropTypes.string,
  region: PropTypes.string,
  workingDays: PropTypes.array,
  weekDaysList: PropTypes.array,
  technologyDetails: PropTypes.array,
  skillList: PropTypes.object,
  trainingList: PropTypes.object,
  onHandleChange: PropTypes.func,
  onHandleDateChange: PropTypes.func,
  onHandleTechAddMore: PropTypes.func,
  onHandleTechRemove: PropTypes.func,
  onHandleAutoCompleteChange: PropTypes.func,
  onHandleCheckboxChange: PropTypes.func,
  handleWorkingDaysCheckboxChange: PropTypes.func,
};

export default WorkDetails;
