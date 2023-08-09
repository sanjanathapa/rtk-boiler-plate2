import React, { Children, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from "prop-types";
import { get, noop } from 'lodash';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import T from 'T';
import MISTextField from 'components/common/MISTextField';
import MISAutocomplete from 'components/common/MISAutocomplete';
import { BUDGET_TYPES, EXPERIENCE_RANGE_LIST, YES_OR_NO, NO_OF_OPENINGS, SOURCE_TYPES, SELECTION_PROCESS_LIST, SHIFT_TIMINGS, REQUIREMENT_STATUS_LIST } from './preSalesModel';
import { CLIENT_REGION_LIST, REGION_LIST } from 'components/Members/Member/memberModel';
import { BACKGROUND, ERROR, NETSMARTZ_THEME_COLOR, SUCCESS } from 'theme/colors';
import { isUrl } from 'utils/validations';
// budget:"",
//       requiredExperienceId:"",
//       goodToHaveSkills:[],
//       mustToHaveSkills:[],
//       numberOfPosts:"",
//       designation:"",
//       preRequisites:"",
const CreateProject = ({
    id="",
    leadName="",
    companyName="",
    companyWebsiteLink="",
    sourceType="",
    isExistingClient=false,
    clientsPreviousProjectId="",
    assignedTo="",
    clientRegion="",
    priorContactWithNetsmartz=false,
    desiredSelectionProcess="",
    isTrialOffered=false,
    shiftTiming="",
    clientRemarks="",
    requirementStatus="",
    projectManagerDetails=[],
    projectListDetails=[],
    skillListDetails=[],
    isRequirementStatusChanged=false,
    preSalesRequirements=[],
    savedPreSalesRequirements=[],
    expList =[],
    jobTitleList =[],
    preSalesRegionList =[],
    preSalesSourceList =[],
    shiftTimingsList =[],
    selectionProcessList =[],
    preSalesManagersList =[],
    onHandleReqAddMore= noop,
    onHandleReqRemove= noop,
    onHandleChange= noop,
    onHandleRequirementsChange= noop,
    onhandleSkillChange= noop,
    onHandleAutoCompleteChange= noop,
    onHandleRequirementsAutoCompleteChange= noop,
}) => {
    const selectedIsExistingClient= YES_OR_NO.find(item=>item.value===isExistingClient);
    const selectedPriorContactWithNetsmartz= YES_OR_NO.find(item=>item.value===priorContactWithNetsmartz);
    const selectedIsTrialOffered= YES_OR_NO.find(item=>item.value===isTrialOffered);
    const selectedClientsPreviousProject= projectListDetails.find(item=>item.id===clientsPreviousProjectId);
    const selectedShiftTiming = shiftTimingsList.find(item=>item.id===shiftTiming);
    const selectedClientRegion = preSalesRegionList.find(item=>item.id===clientRegion);
    const selectedSourceType = preSalesSourceList.find(item=>item.id===sourceType);
    const selectedPSManager = preSalesManagersList.find(item=>item.id===leadName);
    const selectedDesiredSelectionProcess = selectionProcessList.find(item=>item.id===desiredSelectionProcess);
    const filteredProjectManagers=projectManagerDetails.filter(data=>data.strategy===true)
    const selectedAssignedTo=filteredProjectManagers.find(item=>item.id===assignedTo);
    
    const [reqCount,setReqCount]=useState(0);
    let jdCount = 0;
    let jobStatusArray=[];
    preSalesRequirements.map(data=>{
        jobStatusArray.push(data.jobStatus);
    })
    
    
    
    const handleCount =(count)=>{
        setReqCount(count)
    }
    return (
        <Grid container spacing={2} >
            <Grid item md={4} xs={12}>
                <MISAutocomplete
                label={T.OS_MANAGER}
                listDetails={preSalesManagersList}
                value={selectedPSManager}
                // disabled={disableCondition()}
                required
                getByLabelText={(option) => get(option,"name","")}
                onHandleChange={(event, newValue) =>
                    onHandleAutoCompleteChange(
                    "leadName",
                    get(newValue,"id",""))
                }
                />
            </Grid>    
            <Grid item md={4} xs={12}>
                <MISTextField
                    label={T.COMPANY_NAME}
                    required
                    fullWidth
                    placeholder={T.COMPANY_NAME}
                    autoComplete="on"
                    size="small"
                    variant="outlined"
                    name="companyName"
                    value={companyName}
                    onChange={onHandleChange}
                />
            </Grid>    
            <Grid item md={4} xs={12}>
                <MISTextField
                    label={T.COMPANY_WEBSITE_LINK}
                    fullWidth
                    placeholder={T.COMPANY_WEBSITE_LINK}
                    autoComplete="on"
                    size="small"
                    sx={{
                        // mb: !isUrl(companyWebsiteLink) ? 0 : 2,
                        // mt: 0.5,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderBottom:
                          companyWebsiteLink &&
                            `3px solid ${isUrl(companyWebsiteLink) ? SUCCESS.main : ERROR.main}`,
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "9.5px 14px",
                          fontSize: 14,
                        },
                      }}
                    variant="outlined"
                    name="companyWebsiteLink"
                    value={companyWebsiteLink}
                    onChange={onHandleChange}
                />
            </Grid>    
            <Grid item md={4} xs={12}>
                <MISAutocomplete
                label={T.SOURCE}
                listDetails={preSalesSourceList}
                value={selectedSourceType}
                // disabled={disableCondition()}
                required
                getByLabelText={(option) => get(option,"sourceName","")}
                onHandleChange={(event, newValue) =>
                    onHandleAutoCompleteChange(
                    "sourceType",
                    get(newValue,"id",""))
                }
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <MISAutocomplete
                label={T.IF_EXISTING_CLIENT}
                listDetails={YES_OR_NO}
                required
                value={selectedIsExistingClient}
                // disabled={disableCondition()}
                getByLabelText={(option) => option.label}
                onHandleChange={(event, newValue) =>
                    onHandleAutoCompleteChange(
                    "isExistingClient",
                    newValue.value
                    )
                }
                />
            </Grid>
            {
                isExistingClient &&
                <Grid item md={4} xs={12}>
                    <MISAutocomplete
                    label={T.CLIENTS_PREVIOUS_PROJECT}
                    listDetails={projectListDetails}
                    value={selectedClientsPreviousProject}
                    required
                    // disabled={disableCondition()}
                    getByLabelText={(option) => get(option,"name","")}
                    onHandleChange={(event, newValue) =>
                        onHandleAutoCompleteChange(
                        "clientsPreviousProjectId",
                        get(newValue,"id",""))
                    }
                    />
                </Grid>

            }
            <Grid item md={4} xs={12}>
                <MISAutocomplete
                label={T.CLIENT_REGION}
                listDetails={preSalesRegionList}
                value={selectedClientRegion}
                required
                // disabled={disableCondition()}
                getByLabelText={(option) => get(option,"regionName","")}
                onHandleChange={(event, newValue) =>
                    onHandleAutoCompleteChange(
                    "clientRegion",
                    get(newValue,"id",""))
                }
                />
            </Grid>
            
            <Grid item md={4} xs={12}>
                <MISAutocomplete
                label={T.HAS_THE_LEAD_EVER_BEEN_IN_CONTACT_WITH_NTZ_BEFORE}
                listDetails={YES_OR_NO}
                value={selectedPriorContactWithNetsmartz}
                required
                // disabled={disableCondition()}
                getByLabelText={(option) => option.label}
                onHandleChange={(event, newValue) =>
                    onHandleAutoCompleteChange(
                    "priorContactWithNetsmartz",
                    newValue.value)
                }
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <MISAutocomplete
                label={T.SELECTION_PROCESS_DESIRED_BY_CLIENT}
                listDetails={selectionProcessList}
                value={selectedDesiredSelectionProcess}
                required
                // disabled={disableCondition()}
                getByLabelText={(option) => get(option,"selectionProcessName","")}
                onHandleChange={(event, newValue) =>
                    onHandleAutoCompleteChange(
                    "desiredSelectionProcess",
                    get(newValue,"id",""))
                }
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <MISAutocomplete
                label={T.HAS_TRIAL_PERIOD_BEEN_OFFERED}
                listDetails={YES_OR_NO}
                value={selectedIsTrialOffered}
                required
                // disabled={disableCondition()}
                getByLabelText={(option) => option.label}
                onHandleChange={(event, newValue) =>
                    onHandleAutoCompleteChange(
                    "isTrialOffered",
                    newValue.value)
                }
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <MISAutocomplete
                label={T.SPECIFIC_SHIFT_TIMINGS_MENTIONED_BY_THE_CLIENT}
                listDetails={shiftTimingsList}
                value={selectedShiftTiming}
                required
                // disabled={disableCondition()}
                getByLabelText={(option) => get(option,"shiftTimings","")}
                onHandleChange={(event, newValue) =>
                    onHandleAutoCompleteChange(
                    "shiftTiming",
                    get(newValue,"id",""))
                }
                />
            </Grid>    
            <Grid item md={4} xs={12}>
                <MISTextField
                    label={T.COMMENTS_IF_ANY}
                    fullWidth
                    placeholder={T.WRITE_YOUR_COMMENTS}
                    autoComplete="on"
                    size="small"
                    variant="outlined"
                    name="clientRemarks"
                    value={clientRemarks}
                    onChange={onHandleChange}
                />
            </Grid>
            {id && 
                <Grid item md={4} xs={12}>
                    <MISAutocomplete
                    label={T.ASSIGNED_TO}
                    listDetails={filteredProjectManagers}
                    value={selectedAssignedTo}
                    // disabled={disableCondition()}
                    required
                    getByLabelText={(option) => get(option,"name","")}
                    onHandleChange={(event, newValue) =>
                        onHandleAutoCompleteChange(
                        "assignedTo",
                        get(newValue,"id",""))
                    }
                    />
                </Grid>
            }
            {id && 
                <Grid item md={4} xs={12}>
                    <MISAutocomplete
                        label={T.REQUIREMENT_STATUS}
                        listDetails={REQUIREMENT_STATUS_LIST.filter(item=>item!==T.PARTIALLY_CLOSED)}
                        value={requirementStatus}
                        // disabled={disableCondition()}
                        getByLabelText={(option) => option}
                        onHandleChange={(event, newValue) =>
                            onHandleAutoCompleteChange(
                            "requirementStatus",
                            newValue)
                        }
                        />
                </Grid>
            }
            
            <Grid item xs={12} mt={1}>
                {Children.toArray(
                    preSalesRequirements.map((data,index)=>{
                        jdCount++;
                        const selectedExpValue=expList.find(item=>item.id===preSalesRequirements[index]["requiredExperienceId"]);
                        
                        return (
                            <Grid container spacing={2} key={index} pt={index === 0 ? 0 : 1}>
                                <Grid item xs={12} >
                                    <Grid item sx={{display:"flex" ,alignItems:"center", backgroundColor: BACKGROUND.header}}>
                                        <Typography fontSize={16} fontWeight={600}>
                                            {`${T.JOB_DESCRIPTION} ${jdCount}`}
                                        </Typography>
                                    
                                    {
                                        id ?
                                        <Grid item sx={{display:"inline-flex" ,alignItems:"center",pl:2}}>
                                        {(preSalesRequirements.length=== savedPreSalesRequirements.length)&&
                                        (index===savedPreSalesRequirements.length-1) ?
                                        <AddCircleOutlineIcon
                                        onClick={ ()=>{onHandleReqAddMore(); handleCount(preSalesRequirements.length)} }
                                        fontSize="small"
                                        sx={{
                                        cursor: "pointer",
                                        color: NETSMARTZ_THEME_COLOR,
                                        }}
                                    />
                                    :
                                    (preSalesRequirements.length>savedPreSalesRequirements.length) &&
                                    preSalesRequirements.length - 1 === index? (
                                        <>
                                        <RemoveCircleOutlineIcon
                                            onClick={() => {onHandleReqRemove(index);handleCount(preSalesRequirements.length)}}
                                            fontSize="small"
                                            sx={{
                                            cursor: "pointer",
                                            color: NETSMARTZ_THEME_COLOR,
                                            }}
                                        />
                                        <AddCircleOutlineIcon
                                            onClick={ ()=>{onHandleReqAddMore();handleCount(preSalesRequirements.length)} }
                                            fontSize="small"
                                            sx={{
                                            cursor: "pointer",
                                            color: NETSMARTZ_THEME_COLOR,
                                            }}
                                        />
                                        
                                        </>
                                    ) :
                                    (index>(savedPreSalesRequirements.length-1) && (index<(reqCount-1))) && (
                                        <>
                                        <RemoveCircleOutlineIcon
                                            onClick={() => {onHandleReqRemove(index);handleCount(preSalesRequirements.length)}}
                                            fontSize="small"
                                            sx={{
                                            cursor: "pointer",
                                            color: NETSMARTZ_THEME_COLOR,
                                            }}
                                        />
                                        
                                        </>
                                    )}
                                    </Grid>
                                    :
                                    <Grid item sx={{display:"inline-flex" ,alignItems:"center",pl:2}}>
                                    {preSalesRequirements.length=== 1 ?
                                        <AddCircleOutlineIcon
                                        onClick={ onHandleReqAddMore }
                                        fontSize="small"
                                        sx={{
                                        cursor: "pointer",
                                        color: NETSMARTZ_THEME_COLOR,
                                        }}
                                    />
                                    :
                                    preSalesRequirements.length - 1 === index ? (
                                        <>
                                        <RemoveCircleOutlineIcon
                                            onClick={() => onHandleReqRemove(index)}
                                            fontSize="small"
                                            sx={{
                                            cursor: "pointer",
                                            color: NETSMARTZ_THEME_COLOR,
                                            }}
                                        />
                                        <AddCircleOutlineIcon
                                            onClick={ ()=> onHandleReqAddMore() }
                                            fontSize="small"
                                            sx={{
                                            cursor: "pointer",
                                            color: NETSMARTZ_THEME_COLOR,
                                            }}
                                        />
                                        
                                        </>
                                    ) : (
                                        <RemoveCircleOutlineIcon
                                        onClick={() => onHandleReqRemove(index)}
                                        fontSize="small"
                                        sx={{
                                            cursor: "pointer",
                                            color: NETSMARTZ_THEME_COLOR,
                                        }}
                                        />
                                    )}
                                    </Grid>
                                    }
                                    </Grid>
                                    
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <MISAutocomplete
                                    label={T.JOB_TITLE}
                                    listDetails={jobTitleList}
                                    value={jobTitleList.find(item=>item.id===preSalesRequirements[index]["preSalesJobTitleId"]) }
                                    required
                                    disabled={id && index< savedPreSalesRequirements.length}
                                    getByLabelText={(option) => get(option,"preSalesJobTitle","")}
                                    onHandleChange={(event, newValue) =>
                                        onHandleRequirementsAutoCompleteChange(
                                        index,
                                        "preSalesJobTitleId",
                                        get(newValue,"id",""))
                                    }
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <MISAutocomplete
                                    label={T.BUDGET}
                                    listDetails={BUDGET_TYPES}
                                    value={preSalesRequirements[index]["budget"]}
                                    required
                                    disabled={id && index< savedPreSalesRequirements.length}
                                    getByLabelText={(option) => option}
                                    onHandleChange={(event, newValue) =>
                                        onHandleRequirementsAutoCompleteChange(
                                        index,
                                        "budget",
                                        newValue
                                        )
                                    }
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <MISAutocomplete
                                    label={T.EXPERIENCE_CLIENT_IS_LOOKING_FOR}
                                    listDetails={expList}
                                    value={selectedExpValue}
                                    required
                                    disabled={id && index< savedPreSalesRequirements.length}
                                    getByLabelText={(option) => `${get(option,"requiredExpMin","")}-${get(option,"requiredExpMax","")} ${T.YEARS}`}
                                    onHandleChange={(event, newValue) =>
                                        onHandleRequirementsAutoCompleteChange(
                                        index,
                                        "requiredExperienceId",
                                        get(newValue,"id",""))
                                    }
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <MISAutocomplete
                                        label={T.MUST_HAVE_SKILLS}
                                        multiple
                                        listDetails={skillListDetails}
                                        size="small"
                                        disabled={id && index< savedPreSalesRequirements.length}
                                        placeholder={T.SELECT}
                                        required
                                        getByLabelText={(option) => get(option,"skillName","")}
                                        value={preSalesRequirements[index]["mustToHaveSkills"]}
                                        onHandleChange={(event, newValue) => {
                                            onHandleRequirementsAutoCompleteChange(
                                            index,
                                            "mustToHaveSkills",
                                            newValue);
                                        }}
                                    />
                                </Grid>
                                
                                <Grid item md={4} xs={12}>
                                    <MISAutocomplete
                                        label={T.GOOD_TO_HAVE_SKILLS}
                                        multiple
                                        listDetails={skillListDetails}
                                        size="small"
                                        required
                                        disabled={id && index< savedPreSalesRequirements.length}
                                        placeholder={T.SELECT}
                                        getByLabelText={(option) => get(option,"skillName","")}
                                        value={preSalesRequirements[index]["goodToHaveSkills"]}
                                        onHandleChange={(event, newValue) => {
                                            onHandleRequirementsAutoCompleteChange(
                                            index,
                                            "goodToHaveSkills",
                                            newValue);
                                        }}
                                    />
                                </Grid>
                                
                                <Grid item md={4} xs={12}>
                                    <MISTextField
                                        label={T.JOB_OPENINGS}
                                        fullWidth
                                        placeholder={T.JOB_OPENINGS}
                                        autoComplete="on"
                                        disabled={id && index< savedPreSalesRequirements.length}
                                        required
                                        type="number"
                                        size="small"
                                        variant="outlined"
                                        name="numberOfPosts"
                                        value={preSalesRequirements[index]["numberOfPosts"]}
                                        onChange={(e)=>onHandleRequirementsChange(e,index)}
                                    />
                                    {/* <MISAutocomplete
                                    label={T.JOB_OPENINGS}
                                    listDetails={NO_OF_OPENINGS}
                                    required
                                    value={preSalesRequirements[index]["numberOfPosts"]}
                                    // disabled={disableCondition()}
                                    getByLabelText={(option) => option}
                                    onHandleChange={(event, newValue) =>
                                        onHandleRequirementsAutoCompleteChange(
                                        index,
                                        "numberOfPosts",
                                        newValue)
                                    }
                                    /> */}
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <MISTextField
                                        label={T.PREREQUISITES_MENTIONED_BY_THE_CLIENT}
                                        fullWidth
                                        // placeholder={T.NAME_OF_THE_LEAD}
                                        autoComplete="on"
                                        disabled={id && index< savedPreSalesRequirements.length}
                                        required
                                        multiline
                                        rows={3}
                                        size="small"
                                        variant="outlined"
                                        name="preRequisites"
                                        value={preSalesRequirements[index]["preRequisites"]}
                                        onChange={(e)=>onHandleRequirementsChange(e,index)}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <MISTextField
                                        label={T.DETAILED_JOB_DESCRIPTION}
                                        fullWidth
                                        // placeholder={T.NAME_OF_THE_LEAD}
                                        autoComplete="on"
                                        disabled={id && index< savedPreSalesRequirements.length}
                                        required
                                        multiline
                                        rows={3}
                                        size="small"
                                        variant="outlined"
                                        name="designation"
                                        value={preSalesRequirements[index]["designation"]}
                                        onChange={(e)=>onHandleRequirementsChange(e,index)}
                                    />
                                </Grid>
                                
                                {id && index < savedPreSalesRequirements.length &&
                                    <Grid item md={4} xs={12}>
                                        <MISAutocomplete
                                            label={T.JOB_STATUS}
                                            listDetails={REQUIREMENT_STATUS_LIST.filter(item=>item!==T.PARTIALLY_CLOSED)}
                                            value={preSalesRequirements[index]["jobStatus"]}
                                            disabled={isRequirementStatusChanged}
                                            getByLabelText={(option) => option}
                                            onHandleChange={(event, newValue) =>
                                                onHandleRequirementsAutoCompleteChange(
                                                index,
                                                "jobStatus",
                                                newValue)
                                            }
                                            />
                                    </Grid>
                                }
                                
                            </Grid>
                        )
                    })
                )

                }
            </Grid>

            
        </Grid>
    );
};

CreateProject.propTypes = {
    id:PropTypes.string,
    leadName:PropTypes.string,
    companyName:PropTypes.string,
    companyWebsiteLink:PropTypes.string,
    sourceType:PropTypes.string,
    isExistingClient:PropTypes.bool,
    clientsPreviousProjectId:PropTypes.string,
    assignedTo:PropTypes.string,
    clientRegion:PropTypes.string,
    isRequirementStatusChanged:PropTypes.bool,
    savedPreSalesRequirements:PropTypes.array,
    projectManagerDetails:PropTypes.array,
    budget:PropTypes.string,
    experienceRequired:PropTypes.string,
    openingsRequired:PropTypes.string,
    priorContactWithNetsmartz:PropTypes.bool,
    desiredSelectionProcess:PropTypes.string,
    techStack:PropTypes.string,
    isTrialOffered:PropTypes.bool,
    clientPrerequisites:PropTypes.string,
    shiftTiming:PropTypes.string,
    clientRemarks:PropTypes.string,
    requirementStatus:PropTypes.string,
    projectListDetails:PropTypes.array,
    skillListDetails:PropTypes.array,
    jobTitleList:PropTypes.array,
    goodToHaveSkills:PropTypes.array,
    mustToHaveSkills:PropTypes.array,
    onHandleChange:PropTypes.func,
    onHandleRequirementsChange:PropTypes.func,
    onhandleSkillChange:PropTypes.func,
    onHandleAutoCompleteChange:PropTypes.func,
    onHandleRequirementsAutoCompleteChange:PropTypes.func,
}

export default CreateProject;