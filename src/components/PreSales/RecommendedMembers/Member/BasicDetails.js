import React from "react";
import PropTypes from "prop-types";
import { orderBy, noop } from "lodash";

import { Grid, MenuItem, Typography, Button } from "@mui/material";
import SelectCheck from "@mui/icons-material/Check";
// import UploadFileIcon from "@mui/icons-material/UploadFile";

import MISTextField from "components/common/MISTextField";
import MISDatePicker from "components/common/MISDatePicker";
import MISAutocomplete from "components/common/MISAutocomplete";

import T from "T";

import { ERROR, SUCCESS, TEXT } from "theme/colors";
import { isEmail, isMobileNo } from "utils/validations";
import { get } from "utils/lodash";

import { EMP_MODE_LIST, WORK_MODE } from "./memberModel";
// import WithInputLabel from "components/common/WithInputLabel";

const BasicDetails = ({
  id= "",
  empStatus= "",
  fullName = "",
  empCode = "",
  departmentId,
  email = "",
  phone = "",
  designation = "",
  reportingManager,
  functionalHeadId,
  empMode = "",
  joiningDateInNetsmartz = null,
  careerStartDate = null,
  totalExpAsOnDate = "",
  workLocation = "",
  workMode = "",
  workModeExceptionReason = "",
  linkedInUrl = "",
  profileLinkWord = "",
  profileLinkPdf = "",
  departmentList = {},
  projectManagers = {},
  functionalManagers = {},
  workLocationList = {},
  empCodeExist = false,
  mobileNoExist = false,
  emailExist = false,
  isRecordAvailable = noop,
  onHandleExpChange = noop,
  onHandleChange = noop,
  // onHandleFileChange = noop,
  onHandleDateChange = noop,
  onHandleAutoCompleteChange = noop,
}) => {
  const deptListResults = get(departmentList, "results", []);

  const selectedDept =
    deptListResults.find((dept) => dept.id === departmentId) || {};

  const activeWorkLocationList = get(workLocationList, "results", []);
  const selectedWorkLocation = activeWorkLocationList.find(
    (loc) => loc.id === workLocation
  );

  const selectedWorkLocationName = get(
    selectedWorkLocation,
    "workLocationName",
    ""
  );
  const disableCondition = () => id && empStatus !== T.STABLE && empStatus !== T.YET_TO_JOIN ;
  const pMResults = get(projectManagers, "results", []);
  const selectedPM = pMResults.find((res) => res.id === reportingManager) || {};

  const fMResults = get(functionalManagers, "results", []);

  const selectedFM = fMResults.find((res) => res.id === functionalHeadId) || {};

  return (
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <Typography fontSize={16} fontWeight={600}>
          {T.PERSONAL_DETAILS}
        </Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.FULL_NAME}
          required
          fullWidth
          disabled={disableCondition()}
          placeholder={T.FULL_NAME}
          autoComplete="on"
          size="small"
          variant="outlined"
          name="fullName"
          value={fullName}
          onChange={onHandleChange}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.EMP_CODE}
          required
          fullWidth
          disabled={disableCondition()}
          placeholder={T.EMP_CODE}
          autoComplete="on"
          size="small"
          variant="outlined"
          name="empCode"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderBottom:
                empCode &&
                `3px solid ${ !empCodeExist ? SUCCESS.main : ERROR.main}`
            },
          }}
          value={empCode}
          onChange={onHandleChange}
          onKeyDown={isRecordAvailable}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISAutocomplete
          label={T.DEPARTMENT}
          listDetails={deptListResults}
          value={selectedDept}
          disabled={disableCondition()}
          required
          getByLabelText={(option) => get(option, "departmentName", "")}
          onHandleChange={(event, newValue) =>
            onHandleAutoCompleteChange(
              "",
              "departmentId",
              get(newValue, "id", ""),
              T.DEPARTMENT
            )
          }
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.DESIGNATION}
          fullWidth
          placeholder={T.DESIGNATION}
          disabled={disableCondition()}
          required
          size="small"
          variant="outlined"
          name="designation"
          value={designation}
          onChange={onHandleChange}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.EMAIL}
          fullWidth
          required
          placeholder={T.EMAIL}
          disabled={disableCondition()}
          size="small"
          autoComplete="on"
          variant="outlined"
          name="email"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderBottom:
                email &&
                `3px solid ${isEmail(email) && !emailExist ? SUCCESS.main : ERROR.main}`
            },
          }}
          value={email}
          onChange={onHandleChange}
          onKeyDown={isRecordAvailable}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.PHONE}
          fullWidth
          placeholder={T.PHONE}
          disabled={disableCondition()}
          size="small"
          variant="outlined"
          name="phone"
          value={phone}
          required
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderBottom:
                phone &&
                `3px solid ${isMobileNo(phone) && !mobileNoExist ? SUCCESS.main : ERROR.main}`,
            },
          }}
          onChange={onHandleChange}
          onKeyDown={isRecordAvailable}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISAutocomplete
          label={T.REPORTING_MANAGER}
          listDetails={orderBy(pMResults, ["name"], ["asc"])}
          value={selectedPM}
          disabled={disableCondition()}
          required
          getByLabelText={(option) => get(option, "name", "")}
          onHandleChange={(event, newValue) =>
            onHandleAutoCompleteChange(
              "",
              "reportingManager",
              get(newValue, "id", ""),
              T.REPORTING_MANAGER
            )
          }
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISAutocomplete
          label={T.FUNCTIONAL_MANAGER}
          listDetails={orderBy(fMResults, ["name"], ["asc"])}
          value={selectedFM}
          disabled={disableCondition()}
          required
          getByLabelText={(option) => get(option, "name", "")}
          onHandleChange={(event, newValue) =>
            onHandleAutoCompleteChange(
              "",
              "functionalHeadId",
              get(newValue, "id", ""),
              T.FUNCTIONAL_MANAGER
            )
          }
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
            label={T.EMPLOYMENT_MODE}
            fullWidth
            select
            required
            disabled={disableCondition()}
            size="small"
            variant="outlined"
            name="empMode"
            value={empMode}
            onChange={onHandleChange}
          >
            
            {EMP_MODE_LIST.map((val) => {
              return (
                <MenuItem value={val}>
                  <Typography noWrap>{val}</Typography>
                </MenuItem>
              );
            })}
          </MISTextField>
      </Grid>
      {/* <Grid item md={4} xs={12}>
        <WithInputLabel label={T.ATTACH_RESUME}>
          <Button component="label" sx={{ minWidth: 0, p: 0 }}>
            <input type="file" name="resume" onChange={onHandleFileChange}/>
            <UploadFileIcon fontSize="large" sx={{ color: TEXT.label }} />
          </Button>
        </WithInputLabel>
      </Grid> */}
      <Grid item xs={12}>
        <Typography fontSize={16} fontWeight={600} mt={2}>
          {T.PROFESSIONAL_DETAILS}
        </Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <MISDatePicker
          label={T.CAREER_START_DATE}
          placeholder={T.CAREER_START_DATE}
          disabled={disableCondition()}
          inputFormat="MM/DD/YYYY"
          value={careerStartDate}
          required
          name="careerStartDate"
          disableFuture
          handleChange={onHandleDateChange}
          renderInput={(params) => <MISTextField {...params} />}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISDatePicker
          label={T.JOINING_DATE_IN_NTZ}
          placeholder={T.JOINING_DATE_IN_NTZ}
          disabled = {disableCondition()}
          required
          inputFormat="MM/DD/YYYY"
          value={joiningDateInNetsmartz}
          minDate = {careerStartDate?careerStartDate:T.NETSMARTZ_ESTABLISHMENT_DATE}
          name="joiningDateInNetsmartz"
          handleChange={onHandleDateChange}
          renderInput={(params) => <MISTextField {...params} />}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.TOTAL_EXP_AS_ON_DATE}
          fullWidth
          disabled
          placeholder={T.TOTAL_EXP_AS_ON_DATE}
          size="small"
          variant="outlined"
          name="totalExpAsOnDate"
          value={`${totalExpAsOnDate} ${T.YEARS.toLowerCase()}`}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.WORK_LOCATION}
          fullWidth
          select
          disabled={disableCondition()}
          size="small"
          variant="outlined"
          name="workLocation"
          value={[workLocation]}
          required
          onChange={onHandleChange}
        >
          <MenuItem value="">{T.SELECT_OPTION}</MenuItem>
          {activeWorkLocationList.map((val) => {
            return (
              <MenuItem value={get(val, "id", "")}>
                <Typography noWrap>
                  {get(val, "workLocationName", "")}
                </Typography>

                {workLocation === val.id && (
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
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.WORK_MODE}
          fullWidth
          select
          disabled={disableCondition()}
          size="small"
          variant="outlined"
          name="workMode"
          value={[selectedWorkLocationName === T.WFH ? T.WFH : workMode]}
          required
          onChange={onHandleChange}
        >
          <MenuItem value="">{T.SELECT_OPTION}</MenuItem>
          {WORK_MODE.map((val) => {
            return (
              <MenuItem value={val}>
                <Typography noWrap>{val}</Typography>
              </MenuItem>
            );
          })}
        </MISTextField>
      </Grid>

      {((workMode && workMode !== T.WFO) ||
        selectedWorkLocationName === T.WFH) && (
        <Grid item md={4} xs={12}>
          <MISTextField
            label={T.WORK_MODE_EXCEPTION_REASON}
            fullWidth
            disabled={disableCondition()}
            placeholder={T.WORK_MODE_EXCEPTION_REASON}
            size="small"
            variant="outlined"
            autoComplete="on"
            name="workModeExceptionReason"
            value={workModeExceptionReason}
            onChange={onHandleChange}
          />
        </Grid>
      )}

      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.LINKED_IN_URL}
          fullWidth
          placeholder={T.LINKED_IN_URL}
          disabled={disableCondition()}
          autoComplete="on"
          size="small"
          variant="outlined"
          name="linkedInUrl"
          value={linkedInUrl}
          onChange={onHandleChange}
          onKeyDown={isRecordAvailable}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.PROFILE_LINK_WORD_FORMAT}
          fullWidth
          placeholder={T.PROFILE_LINK_WORD_FORMAT}
          disabled={disableCondition()}
          autoComplete="on"
          size="small"
          variant="outlined"
          name="profileLinkWord"
          value={profileLinkWord}
          onChange={onHandleChange}
          onKeyDown={isRecordAvailable}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <MISTextField
          label={T.PROFILE_LINK_PDF_FORMAT}
          fullWidth
          placeholder={T.PROFILE_LINK_PDF_FORMAT}
          autoComplete="on"
          size="small"
          variant="outlined"
          name="profileLinkPdf"
          value={profileLinkPdf}
          onChange={onHandleChange}
          onKeyDown={isRecordAvailable}
        />
      </Grid>
    </Grid>
  );
};

BasicDetails.propTypes = {
  id: PropTypes.string,
  empStatus: PropTypes.string,
  fullName: PropTypes.string,
  empCode: PropTypes.string,
  departmentId: PropTypes.number,
  email: PropTypes.string,
  phone: PropTypes.string,
  reportingManager: PropTypes.number,
  functionalHeadId: PropTypes.number,
  empMode: PropTypes.number,
  designation: PropTypes.string,
  joiningDateInNetsmartz: PropTypes.string,
  careerStartDate: PropTypes.string,
  totalExpAsOnDate: PropTypes.string,
  workLocation: PropTypes.string,
  workMode: PropTypes.string,
  workModeExceptionReason: PropTypes.string,
  linkedInUrl: PropTypes.string,
  profileLinkWord: PropTypes.string,
  profileLinkPdf: PropTypes.string,
  departmentList: PropTypes.object,
  projectManagers: PropTypes.object,
  functionalManagers: PropTypes.object,
  workLocationList: PropTypes.object,
  isRecordAvailable: PropTypes.func,
  onHandleChange: PropTypes.func,
  // onHandleFileChange: PropTypes.func,
  onHandleDateChange: PropTypes.func,
  onHandleAutoCompleteChange: PropTypes.func,
};

export default BasicDetails;
