import React, { useReducer } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { useNavigate } from "react-router-dom";

import { Grid, Box, Button, styled, Tooltip, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import SaveIcon from "assets/SaveIcon.png";
import Upload from "assets/Upload.png";
import GridIcon from "assets/GridIcon.png";
import XLS from "assets/XLS.png";
import PDF from "assets/PDF.png";

import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";

import T from "T";



import { canAddUser } from "utils/permissions";
import { GET_SIZE } from "utils/responsive";
import { get } from "lodash";
import { MISCurrentUser } from "utils/validations";
import { useUploadExcelMutation } from "api/members/uploadExcel";
import { toast } from "react-toastify";
import Constants from "Constants";
import { handleError } from "utils/error";
import SearchBar from "../SearchBar";
import Filters from "../Filters";
import SavedViews from "../SavedViews";
import AddView from "../SavedViews/AddView";
const { SERVER_URL } = Constants;
export const StyledBox = styled(Box)(() => ({
  margin: "auto",
  maxWidth: "inherit",
  width: 45,
  height: 45,
  cursor: "pointer",
}));

const TopBar = ({
  filtersList = {},
  searchInput = "",
  showActive = false,
  selectedFilterId,
  showOptions = false,
  isFilterApplied = false,
  isFilterStoredEmpty = false,
  showCancelIcon = false,
  searchTableData = {},
  filters = {},
  projectManagers = {},
  workLocationList = {},
  skillList = {},
  departmentList = {},
  projectList = {},
  handleFilterApply = noop,
  handleFilterDelete = noop,
  onHandleFilterSelect = noop,
  handleFilterSave = noop,
  handleFilterSubmit = noop,
  handleFilterClose = noop,
  onhandleFilterChange = noop,
  handleExport = noop,
  onClick = noop,
  handleKeyChange = noop,
  handleChange = noop,
  reset = noop,
  onClickOutside = noop,
  handleConfigurator = noop,
}) => {
  const {user} = MISCurrentUser();
  const userRole = get(user,"role","");
  const navigate = useNavigate();
  const [uploadExcel]= useUploadExcelMutation()
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      addView: false,
    }
  );
  const { addView } = localState;
  const minExp= get(filters,"minExp","");
  const maxExp= get(filters,"maxExp","");
  
  const exportFilter= {
    availability : get(filters,"Availability",""),
    departmentName : get(filters,"Department",[]).map(dep=>dep.departmentName),
    empMode : get(filters,"Emp Mode",""),
    empStatus : get(filters,"Status",""),
    projectManagerName : get(filters, "Project Manager",[]).map(pm=>pm.name),
    projectMode : get(filters, "Project Mode",""),
    projectName : get(filters,"Project",[]).map(pr=>pr.name),
    primarySkillName : get(filters,"Primary Skill",[]).map(skill=>skill.skillName),
    secondarySkillName : get(filters,"Secondary Skill",[]).map(skill=>skill.skillName),
    status : showActive?T.ACTIVE:T.INACTIVE,
    workLocationName : get(filters,"Work Location",[]).map(wl=>wl.workLocationName),
    totalExp : minExp && maxExp?(`${minExp}-${maxExp}`):"",
  }
  
  const handleAdd = () => {
    navigate("/app/member/add");
  };

  const handleAddViewClose = () => {
    setLocalState({ addView: false });
  };
  // const { sessionToken } = MISCurrentUser();
  // const handleUploadFile =(e) =>{
  //   let formData = new FormData();
  //   formData.append("file",e.target.files[0]);
  //   if (!e.target.files) {
  //     return;
  //   }
  //   else{
  //     fetch(`${SERVER_URL}/user/upload/excel`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${sessionToken}`,
  //         "Accept": "application/json",
  //         'Content-Type': 'multipart/form-data', 
  //         "type": "formData"
  //       },
  //       body: formData
  //     })
  //       .then((response) => {
  //         toast.success(T.FILE_UPLOADED_SUCCESSFULLY)
  //       })
  //       .catch(handleError);
  //   }
  // }
  const { isLg } = GET_SIZE();

  return (
    <Grid
      container
      alignItems="center"
      justifyContent={isLg ? "space-between" : "center"}
      sx={{ mt: 1, p: 1, backgroundColor: "background.card" }}
    >
      <Grid item md={3} xs={12}>
        <SearchBar
          records={searchTableData}
          searchInput={searchInput}
          showOptions={showOptions}
          showCancelIcon={showCancelIcon}
          onClick={onClick}
          handleKeyChange={handleKeyChange}
          handleChange={handleChange}
          reset={reset}
          onClickOutside={onClickOutside}
        />
      </Grid>

      {/* <Grid item md={userRole===T.HR ?1.3:1.8} /> */}
      <Grid item md={1.8} />

      <Grid item md={2} xs={12}>
        <Filters
          projectManagers={projectManagers}
          workLocationList={workLocationList}
          skillList={skillList}
          departmentList={departmentList}
          projectList={projectList}
          filters={filters}
          isFilterApplied={isFilterApplied}
          isFilterStoredEmpty={isFilterStoredEmpty}
          handleFilterClose={handleFilterClose}
          handleFilterSubmit={handleFilterSubmit}
          onhandleFilterChange={onhandleFilterChange}
        />
      </Grid>

      <Grid item md={2} xs={12}>
        <SavedViews
          selectedFilterId={selectedFilterId}
          filtersList={filtersList}
          handleFilterClose={handleFilterClose}
          handleFilterApply={handleFilterApply}
          onHandleDeleteFilter={handleFilterDelete}
          onHandleFilterSelect={onHandleFilterSelect}
        />
      </Grid>

      <Grid item>
        <Box display="flex" alignItems="center">
          {/* {
            userRole===T.HR && 
            <Tooltip title={T.UPLOAD_XLS} placement="top">
              <IconButton color="primary" aria-label="upload XLS" component="label" sx={{p:0,m:0}}>
                <input hidden type="file" onChange={handleUploadFile}/>
                <StyledBox
                  component="img"
                  src={Upload}
                  pl={1}
                  // onClick={() => handleUploadFile()}
                />
              
              </IconButton>
            </Tooltip>
          } */}
          {/* <Tooltip title={T.UPLOAD_XLS} placement="top">
              <IconButton color="primary" aria-label="upload XLS" component="label" sx={{p:0,m:0}}>
                <input hidden type="file" onChange={handleUploadFile}/>
                <StyledBox
                  component="img"
                  src={Upload}
                  pl={1}
                  // onClick={() => handleUploadFile()}
                />
              
              </IconButton>
            </Tooltip> */}
          <Tooltip title={T.SAVE_FILTER} placement="top">
            <StyledBox
              component="img"
              src={SaveIcon}
              // pl={userRole!==T.HR && 1}
              pl={ 1}
              onClick={() => setLocalState({ addView: !addView })}
            />
          </Tooltip>

          <Tooltip title={T.CONFIGURATOR} placement="top">
            <StyledBox
              component="img"
              id="menu-appbar"
              src={GridIcon}
              onClick={handleConfigurator}
            />
          </Tooltip>

          <Tooltip title={T.XLS} placement="top">
            <StyledBox
              component="img"
              src={XLS}
              onClick={() => handleExport(T.XL,exportFilter)}
            />
          </Tooltip>

          <Tooltip title={T.PDF} placement="top">
            <StyledBox
              component="img"
              src={PDF}
              pr={1}
              onClick={() => handleExport(T.PDF,exportFilter)}
            />
          </Tooltip>
        </Box>

        {addView && (
          <AddView
            handleFilterSave={(viewName) => {
              handleFilterSave(viewName);
              handleAddViewClose();
            }}
            handleClose={handleAddViewClose}
          />
        )}
      </Grid>

      <Grid item>
        <Button
          size="medium"
          sx={{
            bgcolor: NETSMARTZ_THEME_COLOR,
            whiteSpace: "nowrap",
            color: BACKGROUND.white,

            "& .MuiButton-startIcon": {
              mr: 0,
            },
            "&:hover": {
              bgcolor: NETSMARTZ_THEME_COLOR,
              color: BACKGROUND.white,
            },
          }}
          disabled={!canAddUser()}
          startIcon={<AddIcon sx={{ width: 19 }} />}
          onClick={handleAdd}
        >
          {T.ADD_MEMBER}
        </Button>
      </Grid>
    </Grid>
  );
};

TopBar.propTypes = {
  filtersList: PropTypes.object,
  searchedTableData: PropTypes.object,
  searchInput: PropTypes.string,
  showActive: PropTypes.bool,
  isFilterStoredEmpty: PropTypes.bool,
  selectedFilterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showOptions: PropTypes.bool,
  showCancelIcon: PropTypes.bool,
  isFilterApplied: PropTypes.bool,
  filters: PropTypes.object,
  projectManagers: PropTypes.object,
  workLocationList: PropTypes.object,
  skillList: PropTypes.object,
  departmentList: PropTypes.object,
  projectList: PropTypes.object,
  handleFilterApply: PropTypes.func,
  handleFilterDelete: PropTypes.func,
  handleFilterSave: PropTypes.func,
  handleFilterSubmit: PropTypes.func,
  handleFilterClose: PropTypes.func,
  handleExport: PropTypes.func,
  onhandleFilterChange: PropTypes.func,
  handleClick: PropTypes.func,
  handleKeyChange: PropTypes.func,
  onChange: PropTypes.func,
  reset: PropTypes.func,
  onClickOutside: PropTypes.func,
  handleConfigurator: PropTypes.func,
  onHandleFilterSelect: PropTypes.func,
};

export default TopBar;
