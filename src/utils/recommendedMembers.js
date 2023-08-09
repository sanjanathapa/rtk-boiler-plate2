import React, { Children } from "react";

import { Typography, Box, styled, Badge, Link, Tooltip } from "@mui/material";

import { COL_KEYS } from "settings/constants/members";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import InfoIcon from "@mui/icons-material/Info";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PhoneIcon from "@mui/icons-material/Phone";
import { FRONTEND_DATE_FORMAT } from "settings/constants/date";
import { intervalToDuration, format, isValid } from "date-fns";
import PDF from "assets/PDF.png";
import DOC from "assets/DOC.png";

import { get } from "utils/lodash";

import T from "T";
import { toast } from "react-toastify";
import { Stack } from "@mui/system";
import { BACKGROUND, NETSMARTZ_THEME_COLOR, TEXT } from "theme/colors";

export const StyledBox = styled(Box)(() => ({
  margin: "auto",
  maxWidth: "inherit",
  width: 25,
  height: 25,
  cursor: "pointer",
}));

export const MainTitleTypography = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: "22px",
  whiteSpace: "nowrap",
}));

export const SubTitleTypography = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: "22px",
  whiteSpace: "nowrap",
}));

export const TitleTypography = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "22px",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  maxWidth: 200,
}));

const copyContent = (val, name) => {
  navigator.clipboard.writeText(val);

  toast.success(`${name} ${T.COPIED}`, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
};

export const StyledContentCopyIcon = (val, name) => (
  <ContentCopyIcon
    fontSize="small"
    sx={{ ml: 1, cursor: "pointer" }}
    onClick={() => copyContent(val, name)}
  />
);

export const handleHeaderClass = (ind, isLocked, lockedColumns) => {
  if (lockedColumns.length === ind + 1) {
    return "sticky-col add-shadow";
  }

  if (isLocked) {
    return "sticky-col";
  }

  return "";
};

const getEmpStatus = (status) => {
  switch (status) {
    case T.STABLE:
      return "success";
    case T.DID_NOT_JOIN:
      return "secondary";
    case T.RESIGNED:
      return "warning";
    case T.ABSCONDED:
      return "error";
    case T.YET_TO_JOIN:
      return "primary";
    default:
      return "primary";
  }
};

export const getFEDateFormat = (val) => {
  if (val) return format(new Date(val.split(" ")[0]), FRONTEND_DATE_FORMAT);
  return "-";
};

export const getMemberColumnData = (record, isXs, column) => {
  const joiningDate = get(record, "joiningDateTime", null);

  const isTrainingToBeAssigned = get(record, "isTrainingToBeAssigned", "");
  const empStatus = get(record, "empStatus", "");
  const project = get(record, "projects", []);
  const isPartialAvailability = get(record, "isPartialAvailability", "");
  const availability = isPartialAvailability !== 0;
  const availabileHours = get(record, "availableHours", 0);

  switch (column) {
    case COL_KEYS.info:
      const fullName = get(record, "userName", "");
      const empCode = get(record, "employeeCode", "");
      const department = get(record, "userDepartment.departmentName", "");
      const designation = get(record, "userDesignation", "");
      const linkedInUrl = get(record, "linkedInUrl", "");
      const profileLinkPdf = get(record, "profileLinkPdf", "");
      const profileLinkWord = get(record, "profileLinkWord", "");
      const id = get(record, "id", "");
      const isBytLead = get(record, "isBytLead", false);
      return {
        columnData: (
          <>
            <MainTitleTypography sx={{display:"inline-flex",alignItems:"center"}}>
              {/* <a href={`member/${id}`} style={{color:NETSMARTZ_THEME_COLOR, textDecoration:"none"}} >
                {fullName}
              </a> */}
              {fullName}
              <Tooltip title={empStatus} placement="top">
                <Badge
                  variant="dot"
                  color={getEmpStatus(empStatus)}
                  sx={{ ml: 1, cursor: "pointer" }}
                />
              </Tooltip>
              {isBytLead &&
                <StarOutlinedIcon fontSize="small" sx={{ml:0.5,color:NETSMARTZ_THEME_COLOR}}/>
              }

            </MainTitleTypography>

            <Box display="flex" whiteSpace="nowrap">
              <SubTitleTypography>{T.EMP_CODE}:</SubTitleTypography>
              <TitleTypography ml={1}>{empCode}</TitleTypography>

              {StyledContentCopyIcon(empCode, T.EMP_CODE)}
            </Box>

            <Box display="flex" whiteSpace="nowrap">
              <SubTitleTypography>{T.DEPARTMENT}:</SubTitleTypography>
              <TitleTypography ml={1}>{department}</TitleTypography>
            </Box>

            <Box display="flex" whiteSpace="nowrap">
              <SubTitleTypography>{T.DESIGNATION}:</SubTitleTypography>
              <Tooltip title={designation} placement="top">
                <TitleTypography ml={1}>{designation}</TitleTypography>
              </Tooltip>
            </Box>
            <Box display="flex" whiteSpace="nowrap">
              <SubTitleTypography>{T.LINKED_IN_URL}:</SubTitleTypography>
              <Tooltip title={linkedInUrl} placement="top">
                <TitleTypography ml={1}>{linkedInUrl}</TitleTypography>
              </Tooltip>
              {linkedInUrl && StyledContentCopyIcon(linkedInUrl, T.LINKED_IN_URL)}
            </Box>

            <Box display="flex" whiteSpace="nowrap">
              <SubTitleTypography>{T.PROFILE_LINK}:</SubTitleTypography>
              <Stack sx={{display:"inlineFlex",ml:"5px"}}>
                {
                  profileLinkWord && 
                  <Tooltip title={T.DOC} placement="top">
                    <Link href={profileLinkWord} target="_blank">
                      <StyledBox
                        component="img"
                        src={DOC}
                        pr={1}
                      />
                    </Link>
                  </Tooltip>
                }
                {
                  profileLinkPdf && 
                  <Tooltip title={T.PDF} placement="top">
                    <Link href={profileLinkPdf} target="_blank">
                      <StyledBox
                        component="img"
                        src={PDF}
                        pr={1}
                      />
                    </Link>
                  </Tooltip>
                }
              </Stack>
              
            </Box>
          </>
        ),
      };
    case COL_KEYS.contact:
      const userEmailId = get(record, "userEmailId", "");
      const userMobileNo = get(record, "userMobileNo", "");
      const workLocation = get(record, "workLocation.workLocationName", "");
      const workMode = get(record, "workMode", "");
      const wfoExceptionReason = get(record, "wfoExceptionReason", "");
      return {
        columnData: (
          <>
            <Box display="flex" alignItems="center">
            <Tooltip title={userEmailId} placement="top">
              <TitleTypography>{userEmailId}</TitleTypography>
            </Tooltip>
              {StyledContentCopyIcon(userEmailId, T.EMAIL_ID)}
            </Box>
            <Box display="flex" alignItems="center">
              <TitleTypography>{userMobileNo}</TitleTypography>

              {StyledContentCopyIcon(userMobileNo, T.PHONE)}

              {isXs && (
                <Link href={`tel:${userMobileNo}`} ml={0.8}>
                  <PhoneIcon fontSize="small" />
                </Link>
              )}
            </Box>

            <TitleTypography>{workLocation}</TitleTypography>

            <TitleTypography display="flex" alignItems="center">
              {workMode}

              {wfoExceptionReason && (
                <Tooltip title={wfoExceptionReason} placement="top">
                  <InfoIcon
                    fontSize="small"
                    sx={{ ml: 1, cursor: "pointer" }}
                  />
                </Tooltip>
              )}
            </TitleTypography>
          </>
        ),
      };
    case COL_KEYS.primaryProject: {
      const primaryProjects = project.filter((data) => data.primary);
      return {
        columnData: (
          <>
            {Children.toArray(
              primaryProjects.map((project) => {
                const projectName = get(project, "project.name", "");
                const projEndDate = new Date(get(project, "endDate", ""));
                const isProjectActive = isValid(projEndDate) && new Date() < projEndDate || new Date().getDate() === projEndDate.getDate();
                return (
                  <MainTitleTypography display="flex" alignItems="center">
                    {isProjectActive && projectName}

                    {isProjectActive && projectName && (
                      <Tooltip
                        placement="top"
                        title={
                          <>
                            <Box display="flex" whiteSpace="nowrap">
                              <SubTitleTypography>
                                {T.START_DATE}:
                              </SubTitleTypography>
                              <TitleTypography ml={1}>
                                {getFEDateFormat(
                                  get(project, "startDate", null)
                                )}
                              </TitleTypography>
                            </Box>

                            <Box display="flex" whiteSpace="nowrap">
                              <SubTitleTypography>
                                {T.END_DATE}:
                              </SubTitleTypography>
                              <TitleTypography ml={1}>
                                {getFEDateFormat(get(project, "endDate", null))}
                              </TitleTypography>
                            </Box>

                            <Box display="flex" whiteSpace="nowrap">
                              <SubTitleTypography>{T.PM}:</SubTitleTypography>
                              <TitleTypography ml={1}>
                                {
                                  get(
                                    project,
                                    "project.projectManager",
                                    {}
                                  ).name
                                }
                              </TitleTypography>
                            </Box>
                          </>
                        }
                      >
                        <InfoIcon
                          fontSize="small"
                          sx={{ ml: 1, cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </MainTitleTypography>
                );
              })
            )}
          </>
        ),
      };
    }
    case COL_KEYS.secondaryProject:
      const secondaryProjects = project.filter((data) => data.secondary);

      return {
        columnData: (
          <>
            {Children.toArray(
              secondaryProjects.map((project) => {
                const secProjectName = get(project, "project.name", "");
                const projEndDate = new Date(get(project, "endDate", ""));
                const isProjectActive = isValid(projEndDate) && new Date() < projEndDate || new Date().getDate() === projEndDate.getDate();
                
                return (
                  <MainTitleTypography display="flex" alignItems="center">
                    {isProjectActive &&secProjectName}

                    {isProjectActive && secProjectName && (
                      <Tooltip
                        placement="top"
                        title={
                          <>
                            <Box display="flex" whiteSpace="nowrap">
                              <SubTitleTypography>
                                {T.START_DATE}:
                              </SubTitleTypography>
                              <TitleTypography ml={1}>
                                {getFEDateFormat(
                                  get(project, "startDate", null)
                                )}
                              </TitleTypography>
                            </Box>

                            <Box display="flex" whiteSpace="nowrap">
                              <SubTitleTypography>
                                {T.END_DATE}:
                              </SubTitleTypography>
                              <TitleTypography ml={1}>
                                {getFEDateFormat(get(project, "endDate", null))}
                              </TitleTypography>
                            </Box>

                            <Box display="flex" whiteSpace="nowrap">
                              <SubTitleTypography>{T.PM}:</SubTitleTypography>
                              <TitleTypography ml={1}>
                                {
                                  get(
                                    project,
                                    "project.projectManager",
                                    {}
                                  ).name
                                }
                              </TitleTypography>
                            </Box>
                          </>
                        }
                      >
                        <InfoIcon
                          fontSize="small"
                          sx={{ ml: 1, cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </MainTitleTypography>
                );
              })
            )}
          </>
        ),
      };
    case COL_KEYS.experience:
      const totalDuration = joiningDate
        ? intervalToDuration({
            start: new Date(joiningDate.split(" ")[0]),
            end: new Date(),
          })
        : "";

      return {
        columnData: (
          <>
            <Box display="flex" whiteSpace="nowrap">
              <SubTitleTypography>{T.TOTAL_EXP_AS_ON_DATE}:</SubTitleTypography>
              <TitleTypography ml={1}>
                {`${get(record, "expInYears", 0)}.${get(
                  record,
                  "expInMonths",
                  0
                )} ${T.YEARS.toLowerCase()}`}
              </TitleTypography>
            </Box>

            <Box display="flex" whiteSpace="nowrap">
              <SubTitleTypography>
                {T.TENURE_WITH_NETSMARTZ}:
              </SubTitleTypography>
              <TitleTypography ml={1}>{`${get(
                totalDuration,
                "years",
                ""
              )}.${get(totalDuration, "months", "")} years`}</TitleTypography>
            </Box>
          </>
        ),
      };
    case COL_KEYS.technology: {
      const skills = get(record, "userSkills", []);
      const primarySkills = skills
        .filter((skill) => get(skill, "primary", false))
        .map((skill) => get(skill, "skills.skillName", "-"))
        .join(", ");
      const secondarySkills = skills
        .filter((skill) => get(skill, "secondary", false))
        .map((skill) => get(skill, "skills.skillName", "-"))
        .join(", ");
      return {
        columnData: (
          <>
            <Box display="flex" whiteSpace="nowrap">
              <SubTitleTypography>{`${T.PRIMARY_SKILL}s`}:</SubTitleTypography>
              <Tooltip title={primarySkills} placement="top">
                <TitleTypography ml={1}>{primarySkills}</TitleTypography>
              </Tooltip>
            </Box>
            <Box display="flex" whiteSpace="nowrap">
              <SubTitleTypography>{T.SECONDARY_SKILLS}:</SubTitleTypography>
              <Tooltip title={secondarySkills} placement="top">
                <TitleTypography ml={1}>{secondarySkills}</TitleTypography>
              </Tooltip>
            </Box>
          </>
        ),
      };
    }
    case COL_KEYS.clientProjectMode: {
      const clientProjectMode = get(record, "projectMode", "");
      return {
        columnData: <TitleTypography>{clientProjectMode}</TitleTypography>,
      };
    }
    case COL_KEYS.availability: {
      return {
        columnData: (
          <TitleTypography>
            {`${availability ? T.YES : T.NO} ${
              isPartialAvailability !== 0 ? ` - ${availabileHours} hrs` : ""
            }`}
          </TitleTypography>
        ),
      };
    }
    case COL_KEYS.availabilityDate: {
      const availabilityDate = get(record, "availabilityDate", "");
      let finalValue = availabilityDate
        ? getFEDateFormat(availabilityDate)
        : "-";

      if (availability === false) finalValue = getFEDateFormat(availabilityDate) ;
      if (availability && availabilityDate === "") finalValue = T.IMMEDIATE;

      return {
        columnData: <TitleTypography>{finalValue}</TitleTypography>,
      };
    }
    case COL_KEYS.clientJira: {
      const clientJira = get(record, "clientJira", false);

      return {
        columnData: (
          <TitleTypography>{clientJira ? T.YES : T.NO}</TitleTypography>
        ),
      };
    }
    case COL_KEYS.internalJiraExemption:
      const internalJiraExemption = get(record, "internalJiraExemption", false);
      return {
        columnData: (
          <TitleTypography>
            {internalJiraExemption ? T.YES : T.NO}
          </TitleTypography>
        ),
      };
    case COL_KEYS.reportingManager: {
      const reportingManager = get(record, "reportingManager.name", "-");

      return {
        columnData: <TitleTypography>{reportingManager}</TitleTypography>,
      };
    }

    case COL_KEYS.functionalManager: {
      const functionalManager = get(record, "functionalHead.name", "-");

      return {
        columnData: <TitleTypography>{functionalManager}</TitleTypography>,
      };
    }

    case COL_KEYS.trainings: {
      const trainings = isTrainingToBeAssigned
        ? get(record, "userTraining", [])
        : [];

      return {
        columnData: (
          <>
            {Children.toArray(
              trainings.map((training) => {
                return (
                  <>
                    <MainTitleTypography>
                      {get(training, "trainingName", "-")}
                    </MainTitleTypography>

                    <Box display="flex" whiteSpace="nowrap">
                      <SubTitleTypography>{T.START_DATE}:</SubTitleTypography>
                      <TitleTypography ml={1}>
                        {getFEDateFormat(get(training, "startDate", null))}
                      </TitleTypography>
                    </Box>

                    <Box display="flex" whiteSpace="nowrap">
                      <SubTitleTypography>{T.END_DATE}:</SubTitleTypography>
                      <TitleTypography ml={1}>
                        {getFEDateFormat(get(training, "endDate", null))}
                      </TitleTypography>
                    </Box>
                  </>
                );
              })
            )}
          </>
        ),
      };
    }

    case COL_KEYS.comments: {
      const comments = get(record, "comments", "");

      return {
        columnData: ( 
          <>
            <Tooltip title={comments} placement="top">
              <TitleTypography>
                {comments}
              </TitleTypography>
            </Tooltip>
          </>
        )
      };
    }


    case COL_KEYS.empMode: {
      const empMode = get(record, "empMode", "");

      return {
        columnData: ( 
          <>
              <TitleTypography>
                {empMode}
              </TitleTypography>
          </>
        )
      };
    }

    default:
      return { columnData: <TitleTypography /> };
  }
};
