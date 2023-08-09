import { Box } from '@mui/system';
import { useLazyGetProjectListQuery } from 'api/projects/getProjectList';
import { useLazyGetSkillListQuery } from 'api/skills/getSkillList';
import MISFooterButton from 'components/common/MISFooterButton';
import { get } from 'lodash';
import React, { useEffect, useReducer } from 'react';
import { PAGINATION } from 'settings/constants/pagination';
import T from 'T';
import CreateProject from './CreateProject';
import { useLazyGetAllSelectionProcessQuery } from 'api/preSales/getAllSelectionProcess';
import { useLazyGetExpListQuery } from 'api/preSales/getExpList';
import { useLazyGetPreSalesRegionQuery } from 'api/preSales/getPreSalesRegions';
import { useLazyGetPreSalesSourceQuery } from 'api/preSales/getPreSalesSource';
import { useLazyGetShiftTimingsListQuery } from 'api/preSales/getShiftTimingsList';
import { useLazyGetPreSalesManagersQuery } from 'api/preSales/getPreSalesManagers';
import { useSavePreSalesProjectMutation } from 'api/preSales/addPreSalesProject';
import { toast } from 'react-toastify';
import { handleError } from 'utils/error';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLazyFindPreSalesByIdQuery } from 'api/preSales/findPreSalesById';
import { useUpdatePreSalesProjectMutation } from 'api/preSales/updatePreSalesProject';
import { useLazyGetProjectManagerQuery } from 'api/projects/getProjectManager';
import { useLazyGetAllJobTitleQuery } from 'api/preSales/getPreSalesJobTitle';
import ConfirmCancel from './ConfirmCancel';
const { INITIAL_PAGE } = PAGINATION;
const ROWS_PER_PAGE = 10000;

const Form = () => {
    const navigate =useNavigate();
    const location = useLocation();
    const url = location.pathname;
    const id = url.includes("edit") && Number(url.replace(/\D+/g, ""));
    const [localState, setLocalState] = useReducer(
        (prevState, newState) => ({ ...prevState, ...newState }),
        {
          leadName:"",
          companyName:"",
          companyWebsiteLink:"",
          sourceType:"",
          startDate:null,
          endData:null,
          isExistingClient:false,
          clientsPreviousProjectId:"",
          clientRegion:"",
          priorContactWithNetsmartz:false,
          desiredSelectionProcess:"",
          isTrialOffered:false,
          shiftTiming:"",
          clientRemarks:"",
          requirementStatus:"",
          assignedTo:"",
          isRequirementStatusChanged:false,
          preSalesRequirements:[{
            preSalesJobTitleId:"",
            budget:"",
            requiredExperienceId:"",
            goodToHaveSkills:[],
            mustToHaveSkills:[],
            numberOfPosts:"",
            designation:"",
            preRequisites:"",
          }],
          updatePreSalesRequirements:[{
            id:"",
            preSalesJobTitleId:"",
            budget:"",
            requiredExperienceId:"",
            goodToHaveSkills:[],
            mustToHaveSkills:[],
            primaryskillsIds:[],
            secondaryskillsIds:[],
            numberOfPosts:"",
            designation:"",
            preRequisites:"",
            jobStatus:"",
            openConfirmCancel:false
          }],
          savedPreSalesRequirements:[]
        }
      );

    const { 
      leadName, 
      companyName, 
      companyWebsiteLink, 
      sourceType, 
      startDate,
      endDate,
      isExistingClient,
      clientsPreviousProjectId,
      clientRegion,
      priorContactWithNetsmartz,
      desiredSelectionProcess,
      isTrialOffered,
      shiftTiming,
      clientRemarks,
      assignedTo,
      requirementStatus,
      isRequirementStatusChanged,
      preSalesRequirements,
      updatePreSalesRequirements,
      savedPreSalesRequirements,
      openConfirmCancel
    }=localState;
    
    
    const [savePreSalesProject] = useSavePreSalesProjectMutation();
    const [updatePreSalesProject] = useUpdatePreSalesProjectMutation();
    const [getProjectList, { data: projectList }] = useLazyGetProjectListQuery();
    const [getProjectManager, { data: projectManagerList }] = useLazyGetProjectManagerQuery();
    const [getSkillList, { data: skillList }] = useLazyGetSkillListQuery();
    const [getExpList, { data: expList }] = useLazyGetExpListQuery();
    const [getAllJobTitle, { data: jobTitleList }] = useLazyGetAllJobTitleQuery();
    const [getPreSalesRegion, { data: preSalesRegionList }] = useLazyGetPreSalesRegionQuery();
    const [getPreSalesSource, { data: preSalesSourceList }] = useLazyGetPreSalesSourceQuery();
    const [getShiftTimingsList, { data: shiftTimingsList }] = useLazyGetShiftTimingsListQuery();
    const [getPreSalesManagers, { data: preSalesManagersList }] = useLazyGetPreSalesManagersQuery();
    const [getAllSelectionProcess, { data: selectionProcessList }] = useLazyGetAllSelectionProcessQuery();
    const [findPreSalesById] = useLazyFindPreSalesByIdQuery();
    
    useEffect(()=>{
      getExpList();
      getAllJobTitle();
      getPreSalesRegion();
      getPreSalesSource();
      getShiftTimingsList();
      getAllSelectionProcess();
      getPreSalesManagers();
      getProjectManager({ page: INITIAL_PAGE, rowPerPage: ROWS_PER_PAGE });
      getProjectList({ page: INITIAL_PAGE, rowPerPage: ROWS_PER_PAGE });
      getSkillList({ page: INITIAL_PAGE, rowPerPage: ROWS_PER_PAGE });
    },[]);
    useEffect(()=>{
      if(!isExistingClient)
      {
        setLocalState({clientsPreviousProjectId:""})
      }
    },[isExistingClient])
    useEffect(()=>{
      if(id)
      {
        findPreSalesById({id})
        .unwrap()
        .then(res=>{
          const requirements = get(res,"preSalesMapping",[]);
          const prevRequirements ={
            leadName:get(res,"salesManagers.id",""),
            companyName:get(res,"companyName",""),
            startDate:get(res,"startDate",null),
            endDate:get(res,"endDate",null),
            companyWebsiteLink:get(res,"companyLink",""),
            sourceType:get(res,"source.id",""),
            isExistingClient:get(res,"isExistingClient",false),
            clientsPreviousProjectId:get(res,"existingProject.id",""),
            clientRegion:get(res,"clientRegion.id",""),
            priorContactWithNetsmartz:get(res,"hasContactedNtzBefore",false),
            desiredSelectionProcess:get(res,"selectionProcess.id",""),
            isTrialOffered:get(res,"isTrialPeriodOffered",false),
            shiftTiming:get(res,"shiftTimings.id",""),
            clientRemarks:get(res,"remarks",""),
            requirementStatus:get(res,"preSalesStatus",""),
            assignedTo:get(res,"projectManager.id",""),
            updatePreSalesRequirements:
              requirements.length > 0
                ? requirements.map((data) => 
                {
                const primarySkills = get(data,"preSalesSkillsMapping",[])
                                .filter(rec=>rec.isPrimary===true)
                                .map(item=>item.tech);
                const secondarySkills = get(data,"preSalesSkillsMapping",[])
                                .filter(rec=>rec.isPrimary===false)
                                .map(item=>item.tech);
                const primaryskillsIds = get(data,"preSalesSkillsMapping",[])
                                        .filter(rec=>rec.isPrimary===true)
                                        .map(item=>item.id);
                const secondaryskillsIds = get(data,"preSalesSkillsMapping",[])
                                        .filter(rec=>rec.isPrimary===false)
                                        .map(item=>item.id);
                  return({
                    id:id,
                    preSalesJobTitleId:get(data, "preSalesJobTitleId", ""),
                    preSalesId:get(data, "id", ""),
                    budget: get(data, "budget", ""),
                    requiredExperienceId: get(data,"requiredExperience.id", ""),
                    goodToHaveSkills: secondarySkills,
                    mustToHaveSkills: primarySkills,
                    primaryskillsIds: primaryskillsIds,
                    secondaryskillsIds: secondaryskillsIds,
                    numberOfPosts: get(data, "numberOfPosts", ""),
                    designation: get(data, "designation", ""),
                    preRequisites: get(data, "preRequisites", ""),
                    jobStatus: get(data, "preSalesMappingStatus", ""),
                  })

                }
                )
                : [emptyPreSalesRequirements],
              savedPreSalesRequirements:
              requirements.length > 0
                ? requirements.map((data) => 
                {
                const primarySkills = get(data,"preSalesSkillsMapping",[])
                                .filter(rec=>rec.isPrimary===true)
                                .map(item=>item.tech);          
                const secondarySkills = get(data,"preSalesSkillsMapping",[])
                .filter(rec=>rec.isPrimary===false)
                .map(item=>item.tech);
                  return({
                    id:get(data, "id", ""),
                    budget: get(data, "budget", ""),
                    preSalesJobTitleId: get(data, "preSalesJobTitleId", ""),
                    requiredExperienceId: get(data,"requiredExperience.id", ""),
                    goodToHaveSkills: secondarySkills,
                    mustToHaveSkills: primarySkills,
                    numberOfPosts: get(data, "numberOfPosts", ""),
                    designation: get(data, "designation", ""),
                    preRequisites: get(data, "preRequisites", ""),
                    jobStatus: get(data, "preSalesMappingStatus", ""),
                  })

                }
                )
                : [emptyPreSalesRequirements],
          }
          setLocalState(prevRequirements)
        })
        .catch(handleError)
      }
    },[id])
    const emptyPreSalesRequirements ={
      preSalesJobTitleId:"",
      budget:"",
      requiredExperienceId:"",
      goodToHaveSkills:[],
      mustToHaveSkills:[],
      numberOfPosts:"",
      designation:"",
      preRequisites:"",
    };
    

    const projectListDetails = get(projectList, "results", []);
    const projectManagerDetails = get(projectManagerList, "results", []);
    const skillListDetails = get(skillList, "results", []);
    
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setLocalState({ [name]: value });
      };
    const onHandleRequirementsChange = (event,index) => {
        const { name, value } = event.target;
        if(id)
        {
          updatePreSalesRequirements[index][name] = value;
          setLocalState({ updatePreSalesRequirements });
        }
        else
        {
          preSalesRequirements[index][name] = value;
          setLocalState({ preSalesRequirements });

        }
      };
    const onHandleAutoCompleteChange = (type,value) => {
        if( id && type==="requirementStatus")
        {
          setLocalState({[type]:value})
          if(value!==T.PARTIALLY_CLOSED)
          {
            preSalesRequirements.map(item=>item["jobStatus"]=value);
            setLocalState({preSalesRequirements});
            setLocalState({isRequirementStatusChanged:true})
          }
          else{
            setLocalState({isRequirementStatusChanged:false})
          }
        }
        setLocalState({ [type]: value });
      };
    const onHandleRequirementsAutoCompleteChange = (index,type,value) => {
      if(id)
      {
        updatePreSalesRequirements[index][type]= value;
        setLocalState({ updatePreSalesRequirements });
      }
      else
      {
        preSalesRequirements[index][type]= value;
        setLocalState({ preSalesRequirements });

      }
      };
      
    const onhandleSkillChange = (type,value) => {
        
        setLocalState({ [type]: value });
      };
      
    const onHandleReqAddMore = () => {
      if(id)
      {
        updatePreSalesRequirements.push(emptyPreSalesRequirements);
        setLocalState({ updatePreSalesRequirements });
      }
      else
      {
        preSalesRequirements.push(emptyPreSalesRequirements);
        setLocalState({ preSalesRequirements });
      }
    };
    const onHandleReqRemove = (index) => {
      if(id)
      {
        updatePreSalesRequirements.splice(index, 1);
        setLocalState({ updatePreSalesRequirements });
      }
      preSalesRequirements.splice(index, 1);
      setLocalState({ preSalesRequirements });
    };
    const handleClose =() =>{
      navigate("/app/pre-sales")
    }
    const renderNewProjectDetails = () => ({
       id,
       leadName,
       companyName,
       companyWebsiteLink,
       sourceType,
       isExistingClient,
       clientsPreviousProjectId,
       assignedTo,
       clientRegion,
       priorContactWithNetsmartz,
       desiredSelectionProcess,
       isTrialOffered,
       shiftTiming,
       clientRemarks,
       requirementStatus,
       projectListDetails,
       projectManagerDetails,
       skillListDetails,
       isRequirementStatusChanged,
       preSalesRequirements:id?updatePreSalesRequirements:preSalesRequirements,
       savedPreSalesRequirements,
       expList,
       jobTitleList,
       preSalesRegionList,
       preSalesSourceList,
       shiftTimingsList,
       selectionProcessList,
       preSalesManagersList,
       getPreSalesManagers,
       onHandleReqAddMore,
       onHandleReqRemove,
       onHandleRequirementsAutoCompleteChange,
       onHandleChange,
       onHandleRequirementsChange,
       onhandleSkillChange,
       onHandleAutoCompleteChange,
      });
      const getPreSalesRequirements = ()=>{
        let requirements =[];
        preSalesRequirements.map(req=>{
          
          let technologyDetails =[];
          const primarySkills = get(req,"mustToHaveSkills",[]);
          const secondarySkills = get(req,"goodToHaveSkills",[]);
          primarySkills.map(skills=>technologyDetails.push({isPrimary:true,techId:get(skills,"id","")}))
          secondarySkills.map(skills=>technologyDetails.push({isPrimary:false, techId:get(skills,"id","")}));
          requirements.push({budget:get(req,"budget",""),
          requiredExperienceId:get(req,"requiredExperienceId",""),
          preSalesJobTitleId:get(req,"preSalesJobTitleId",""),
          numberOfPosts:get(req,"numberOfPosts",""),
          designation:get(req,"designation",""),
          preRequisites:get(req,"preRequisites",""),
          preSalesSkillsMappingRequestDto : technologyDetails})
        return requirements;
        }
        )
        return requirements;
      }
      const getPreSalesUpdateRequirements = ()=>{
        let requirements =[];
        updatePreSalesRequirements.map(req=>{
          let technologyDetails =[];
          const primarySkills = get(req,"mustToHaveSkills",[]);
          const secondarySkills = get(req,"goodToHaveSkills",[]);
          const primaryskillsIds = get(req,"primaryskillsIds",[]);
          const secondaryskillsIds = get(req,"secondaryskillsIds",[]);
          primarySkills.map((skills,index)=>technologyDetails.push({id:primaryskillsIds[index]||"",isPrimary:true,techId:get(skills,"id","")}))
          secondarySkills.map((skills,index)=>technologyDetails.push({id:secondaryskillsIds[index]||"",isPrimary:false, techId:get(skills,"id","")}));
          requirements.push({budget:get(req,"budget",""),
          requiredExperienceId:get(req,"requiredExperienceId",""),
          preSalesJobTitleId:get(req,"preSalesJobTitleId",""),
          numberOfPosts:get(req,"numberOfPosts",""),
          designation:get(req,"designation",""),
          preSalesId:id,
          id:get(req,"preSalesId",""),
          preRequisites:get(req,"preRequisites",""),
          preSalesMappingStatus:get(req,"jobStatus",""),
          preSalesSkillsMappingCommonUpdateRequestDto : technologyDetails})
        return requirements;
        }
        )
        return requirements;
      }
      
      const handleSubmit=()=>{
        if(
          !leadName || 
          !companyName || 
          !sourceType ||
          !clientRegion ||
          !desiredSelectionProcess ||
          !shiftTiming ||
          (isExistingClient && !clientsPreviousProjectId) ||
          preSalesRequirements.find(item=>(!item.budget ||!item.preSalesJobTitleId || !item.requiredExperienceId ||!item.goodToHaveSkills ||
            !item.mustToHaveSkills || !item.numberOfPosts || !item.designation
            || !item.preRequisites))
          )
        {
          toast.error(T.REQUIRED_FIELDS_EMPTY)
          return
        }
        if(preSalesRequirements.find(item=>(item.numberOfPosts>9)))
        {
          toast.error(T.POSTS_MORE_THAN_9)
          return
        }
        else
        {
          const psRequirements= getPreSalesRequirements();
          const payload ={
            clientRegionId: clientRegion,
            companyLink:companyWebsiteLink,
            companyName:companyName,
            isExistingClient:isExistingClient,
            existingProjectId:clientsPreviousProjectId,
            hasContactedNtzBefore:priorContactWithNetsmartz,
            isTrialPeriodOffered:isTrialOffered,
            preSalesMappingRequests:psRequirements,
            remarks:clientRemarks,
            salesManagerId:leadName,
            selectionProcessId:desiredSelectionProcess,
            shiftTimingsId:shiftTiming,
            sourceId:sourceType,
          }
          
          savePreSalesProject(payload)
          .unwrap()
          .then(res=>
            {
              toast.success(T.REQUIREMENT_ADDED_SUCCESSFULLY);
              handleClose();

            }
            )
          .catch(handleError)
        }
      }
      const handleUpdate=()=>{
        if(
          !leadName || 
          !companyName || 
          !sourceType ||  
          !clientRegion ||
          !desiredSelectionProcess ||
          !shiftTiming ||
          !assignedTo ||
          (isExistingClient && !clientsPreviousProjectId) ||
          updatePreSalesRequirements.find(item=>(!item.budget ||!item.preSalesJobTitleId || !item.requiredExperienceId ||!item.goodToHaveSkills ||
            !item.mustToHaveSkills || !item.numberOfPosts || !item.designation
            || !item.preRequisites))
          )
        {
          toast.error(T.REQUIRED_FIELDS_EMPTY)
          return
        }
        if(updatePreSalesRequirements.find(item=>(item.numberOfPosts>9)))
        {
          toast.error(T.POSTS_MORE_THAN_9)
          return
        }
        else
        {
          const psRequirements= getPreSalesUpdateRequirements();
          const payload ={
            clientRegionId: clientRegion,
            companyLink:companyWebsiteLink,
            companyName:companyName,
            startDate:startDate
            ? startDate.split(" ")[0]
            : null,
            endDate:endDate
            ? endDate.split(" ")[0]
            : null,
            isExistingClient:isExistingClient,
            existingProjectId:clientsPreviousProjectId,
            hasContactedNtzBefore:priorContactWithNetsmartz,
            id:id,
            isTrialPeriodOffered:isTrialOffered,
            preSalesMappingCommonUpdateRequestDto:psRequirements,
            remarks:clientRemarks,
            salesManagerId:leadName,
            selectionProcessId:desiredSelectionProcess,
            shiftTimingsId:shiftTiming,
            sourceId:sourceType,
            preSalesStatus:requirementStatus,
            assignedTo:assignedTo,
          }
          updatePreSalesProject({id,preSalesUpdateRequestDto:payload})
          .unwrap()
          .then(res=>
            {
              
              toast.success(T.REQUIREMENT_UPDATED_SUCCESSFULLY);
              handleClose();

            }
            )
          .catch(handleError)
        }
      }
      const confrmCancelModal =() =>{
        setLocalState({openConfirmCancel:!openConfirmCancel})
      }

    return (
      <>
          <Box
              // mb={2}
              sx={{
              height: "calc(100vh - 205px)",
              overflowY: "auto",
              }}
          >
              <CreateProject {...renderNewProjectDetails()} />
          </Box>
          <MISFooterButton
          proceedButtonText={id?T.UPDATE:T.SUBMIT}
          justify="end"
          sx={{ pb: 0.5 }}
          handleClose={confrmCancelModal}
          handleSubmit={id?handleUpdate:handleSubmit }
        />
        <ConfirmCancel
          openConfirmCancel={openConfirmCancel}
          confrmCancelModal={confrmCancelModal}
          handleClose={handleClose}
              
          />
      </>
    );
};

export default Form;