import React, { useReducer } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import T from "T";
import MISDialog from "components/common/MISDialog";
import MISTextField from "components/common/MISTextField";
import MISFooterButton from "components/common/MISFooterButton";
import { useDeleteProjectMutation } from "api/projects/deleteProject";
import { handleError } from "utils/error";
import { TitleTypography } from "utils/members";
import { capitalize, get } from "lodash";
import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";
import styled from "@emotion/styled";

export const KeyTypography = styled(Typography)(() => ({
    fontWeight: 600,
    fontSize: 16,
    lineHeight: "22px",
    whiteSpace: "nowrap",
  }));
  
const ViewJobDescription = ({
  openJd = false,
  record = {},
  handleJdDialog = noop,
}) => {
 
const handleBack =()=>{
    handleJdDialog();
}
 

const primarySkills=get(record,"preSalesSkillsMapping",[])
                    .filter(item=>get(item,"isPrimary",false))
                    .map(item=>get(item,"tech.skillName",""))
                    .map(item=>capitalize(item)).join(", ");
const secondarySkills=get(record,"preSalesSkillsMapping",[])
                    .filter(item=>!get(item,"isPrimary",false))
                    .map(item=>get(item,"tech.skillName",""))
                    .map(item=>capitalize(item)).join(", ");;
  return (
    <MISDialog open={openJd}>
        <Box sx={{width:"400px"}}>

                <Box display="flex" alignItems="center" mb={1} pl={1} pt={2} sx={{backgroundColor:BACKGROUND.cardDefault}}>
                    <ArrowBackIcon
                    fontSize="small"
                    sx={{ cursor: "pointer" }}
                    onClick={handleBack}
                    />
                    <Typography variant="h6" fontWeight={700} ml={1}>
                    {T.JOB_DESCRIPTION.toUpperCase()}
                    </Typography>
                </Box>

            <Grid container sx={{ p: 2 }} spacing={2}>
                <Grid item xs={12} sx={{ pt: 2 }}>
                <Box display="flex" whiteSpace="nowrap" mb={3}>
                        <KeyTypography>{T.MUST_HAVE}:</KeyTypography>
                            <Tooltip title={primarySkills} placement="top">
                                <TitleTypography ml={1}>
                                    {primarySkills}
                                </TitleTypography>
                            </Tooltip>
                    </Box>
                    <Box display="flex" whiteSpace="nowrap" mb={3}>
                        <KeyTypography>{T.GOOD_TO_HAVE}:</KeyTypography>
                            <Tooltip title={secondarySkills} placement="top">
                                <TitleTypography ml={1}>
                                    {secondarySkills}
                                </TitleTypography>
                            </Tooltip>
                    </Box>
                    <Box display="flex" whiteSpace="nowrap" mb={3}>
                        <KeyTypography>{T.EXPERIENCE_REQUIRED}:</KeyTypography>
                        <TitleTypography ml={1}>{`${get(record,"requiredExperience.requiredExpMin","")}-${get(record,"requiredExperience.requiredExpMax","")} ${T.YEARS}`}</TitleTypography>
                    </Box>
                    <Box display="flex" whiteSpace="nowrap" mb={3}>
                        <KeyTypography>{T.JOB_OPENINGS}:</KeyTypography>
                        <TitleTypography ml={1}>{get(record,"numberOfPosts","")}</TitleTypography>
                    </Box>
                    <Box display="flex" whiteSpace="nowrap" mb={3}>
                        <KeyTypography>{T.BUDGET}:</KeyTypography>
                        <TitleTypography ml={1}>{get(record,"budget","s")}</TitleTypography>
                    </Box>
                    <Box display="flex" whiteSpace="nowrap" mb={3}>
                        <KeyTypography>{T.DETAILED_JD}:</KeyTypography>
                        <Tooltip title={get(record,"designation","")} placement="top">
                            <TitleTypography ml={1}>
                                {get(record,"designation","")}
                            </TitleTypography>
                        </Tooltip>
                    </Box>
                    <Box display="flex" whiteSpace="nowrap" mb={3}>
                        <KeyTypography>{T.PREREQUISITES}:</KeyTypography>
                        <Tooltip title={get(record,"preRequisites","")} placement="top">
                            <TitleTypography ml={1}>
                                {get(record,"preRequisites","")}
                            </TitleTypography>
                        </Tooltip>
                    </Box>
                    <Box display="flex" whiteSpace="nowrap" mb={3}>
                        <KeyTypography>{T.JD_STATUS}:</KeyTypography>
                        <Tooltip title={get(record,"preSalesMappingStatus","")} placement="top">
                            <TitleTypography ml={1}>
                                {get(record,"preSalesMappingStatus","")}
                            </TitleTypography>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </MISDialog>
  );
};

ViewJobDescription.propTypes = {
  openJD: PropTypes.bool,
  record: PropTypes.object,
  handleJdDialog: PropTypes.func,
};

export default ViewJobDescription;
