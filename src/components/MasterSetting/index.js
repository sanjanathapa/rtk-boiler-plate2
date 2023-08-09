import React, { useEffect, useReducer } from "react";
import { Box, Tab, Paper, styled } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { get } from "lodash";
import { format, isValid } from "date-fns";

import TopBar from "components/MasterSetting/TopBar";
import MISLoader from "components/common/MISLoader";

import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";

import { handleError } from "utils/error";
import { MISCurrentUser } from "utils/validations";
import { downloadFile } from "utils/file";

import { BACKEND_DATE_FORMAT } from "settings/constants/date";
import { PAGINATION } from "settings/constants/pagination";
import { getCurrentTableParams } from "data/members/memberTableSelectors";

import { useLazyGetProjectSearchListByDateQuery } from "api/projects/searchProjectByDate";
import { useLazyGetSkillListQuery } from "api/skills/getSkillList";
import { useLazyGetTechnologySearchListQuery } from "api/skills/searchSkills";
import { useLazyGetProjectSearchListQuery } from "api/projects/searchProjects";
import { useLazyGetProjectListQuery } from "api/projects/getProjectList";

import Constants from "Constants";
import T from "T";

import Projects from "./Projects/Projects";
import DeleteProject from "./Projects/DeleteProject";
import AddEditProjectInfo from "./Projects/AddEditProjectInfo";

import AddEditTechnologyInfo from "./Technology/AddEditTechnologyInfo";
import DeleteTechnology from "./Technology/DeleteTechnology";
import Technology from "./Technology/Technology";
import { useLazyGetWorkLocationQuery } from "api/members/getWorkLocation";
import { useLazyGetLocationSearchListQuery } from "api/workLocation/searchLocation";
import WorkLocation from "./WorkLocations/WorkLocation";
import AddEditWorkLocationInfo from "./WorkLocations/AddEditWorkLocationInfo";
import DeleteWorkLocation from "./WorkLocations/DeleteWorkLocation";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "capitalize",
  fontWeight: 700,
  fontSize: "14px",
  alignItems: "center",
  justifyContent: "space-between",
  color: theme.palette.background.black,
  minHeight: "unset",
  border: `1px solid ${theme.palette.border.tabsGrey}`,
}));

const MasterSetting = () => {
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      tabValue: "1",
      editId: "",
      skillEditId: "",
      locationEditId: "",
      projectId: "",
      skillId: "",
      locationId: "",
      startDate: null,
      endDate: null,
      searchInput: "",
      tableData: [],
      showOptions: false,
      showCancelIcon: false,
      searchTableData: {},
      openAddEditProjectInfo: false,
      openDeleteProject: false,
      openAddEditTechnologyInfo: false,
      openAddEditWorkLocationInfo: false,
      openDeleteTechnology: false,
      openDeleteWorkLocation: false,
      exportLoading: false,
      page: INITIAL_PAGE,
      rowsPerPage: ROWS_PER_PAGE,
    }
  );

  const {
    tabValue,
    editId,
    skillEditId,
    locationEditId,
    projectId,
    skillId,
    locationId,
    startDate,
    endDate,
    searchInput,
    showOptions,
    showCancelIcon,
    tableData,
    searchTableData,
    openDeleteProject,
    openDeleteTechnology,
    openDeleteWorkLocation,
    openAddEditProjectInfo,
    openAddEditTechnologyInfo,
    openAddEditWorkLocationInfo,
    exportLoading,
    page,
    rowsPerPage,
  } = localState;

  const { SERVER_URL } = Constants;

  const [getProjectList, { isFetching }] = useLazyGetProjectListQuery();
  const [getSkillList, { isFetching: isSkillFetching }] =
    useLazyGetSkillListQuery();
  const [getWorkLocation, { isFetching: isLocationFetching }] =
  useLazyGetWorkLocationQuery();

  const [getProjectSearchList, { isFetching: isSearchFetching }] =
    useLazyGetProjectSearchListQuery();
  const [getProjectSearchListByDate, { isFetching: isSearchByDateFetching }] =
    useLazyGetProjectSearchListByDateQuery();
  const [getTechnologySearchList, { isFetching: isTechnologySearchFetching }] =
    useLazyGetTechnologySearchListQuery();
  const [getLocationSearchList, { isFetching: isLocationSearchFetching }] =
  useLazyGetLocationSearchListQuery();

  const refreshTable = (
    page = INITIAL_PAGE,
    rowPerPage = ROWS_PER_PAGE,
    tab = tabValue
  ) => {
    if (tab === "1") getProjectTableData(page, rowPerPage);
    if (tab === "2") getTechnologyTableData(page, rowPerPage);
    if (tab === "3") getWorkLocationTableData(page, rowPerPage);
  };

  const refreshSearchTableData = (
    pag,
    rowPerPag,
    tab = tabValue,
    search = searchInput
  ) => {
    if (search === "") return;

    if (tab === "1") getProjectSearchTableData(pag, rowPerPag, search);
    else if (tab === "2") getTechnologySearchTableData(pag, rowPerPag, search);
    else if (tab === "3") getWorkLocationSearchTableData(pag, rowPerPag, search);
  };

  useEffect(() => {
    refreshTable(page, rowsPerPage);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      getProjectTableDataByDate(page, rowsPerPage, startDate, endDate);
    } else refreshTable(page, rowsPerPage);
  }, [startDate, endDate]);

  const { allTableRows, totalTableRowsCount, totalPageCount } =
    getCurrentTableParams(tableData);

  const getProjectTableData = (page, size) => {
    getProjectList({ page: page, rowPerPage: size })
      .unwrap()
      .then((res) => {
        setLocalState({
          tableData: res,
        });
      })
      .catch(handleError);
  };
  const getTechnologyTableData = (page, size) => {
    getSkillList({ page: page, rowPerPage: size })
      .unwrap()
      .then((res) => {
        setLocalState({
          tableData: res,
        });
      })
      .catch(handleError);
  };

  const getWorkLocationTableData = (page, size) => {
    getWorkLocation({ page: page, rowPerPage: size })
      .unwrap()
      .then((res) => {
        setLocalState({
          tableData: res,
        });
      })
      .catch(handleError);
  };

  const getProjectSearchTableData = (page, size, search = "") => {
    getProjectSearchList({
      page,
      rowsPerPage: size,
      search,
    })
      .unwrap()
      .then((res) => {
        setLocalState({
          tableData: res,
        });
      })
      .catch(handleError);
  };

  const getProjectTableDataByDate = (page, rowsPerPage, startDate, endDate) => {
    getProjectSearchListByDate({
      page,
      rowsPerPage,
      end: endDate,
      start: startDate,
    })
      .unwrap()
      .then((res) => {
        setLocalState({
          tableData: res,
        });
      })
      .catch(handleError);
  };

  const getTechnologySearchTableData = (page, rowsPerPage, search = "") => {
    getTechnologySearchList({
      page,
      rowsPerPage,
      search,
    })
      .unwrap()
      .then((res) => {
        setLocalState({
          tableData: res,
        });
      })
      .catch(handleError);
  };
  const getWorkLocationSearchTableData = (page, rowsPerPage, search = "") => {
    getLocationSearchList({
      page,
      rowsPerPage,
      search,
    })
      .unwrap()
      .then((res) => {
        setLocalState({
          tableData: res,
        });
      })
      .catch(handleError);
  };

  const resetSearch = () => {
    setLocalState({
      showOptions: false,
      searchInput: "",
      showCancelIcon: false,
    });
    refreshTable(page, rowsPerPage);
  };

  const handleSearchChange = (event) => {
    const { value, dataset } = event.currentTarget;
    const searchValue = value || get(dataset, "val", "");
    if (searchValue === "") refreshTable(page, rowsPerPage);

    setLocalState({
      showOptions: event.key === "Enter" ? false : true,
      showCancelIcon: searchValue !== "",
      searchInput: searchValue,
    });

    if (event.currentTarget.nodeName === "svg" || searchValue === "")
      refreshSearchTableData(page, rowsPerPage, tabValue, searchValue);
  };

  const handleSearchKeyChange = () => {
    setLocalState({
      page: INITIAL_PAGE,
    });
    refreshSearchTableData(INITIAL_PAGE, rowsPerPage, tabValue, searchInput);
  };

  const getBEDateFormat = (val) => format(val, BACKEND_DATE_FORMAT);

  const handleTabChange = (event, newValue) => {
    setLocalState({
      tabValue: newValue,
      page: INITIAL_PAGE,
      rowsPerPage: ROWS_PER_PAGE,
      searchInput: "",
    });

    refreshTable(INITIAL_PAGE, ROWS_PER_PAGE, newValue);
    refreshSearchTableData(INITIAL_PAGE, ROWS_PER_PAGE, newValue, "");
  };

  const handleAddEditProjectInfoDialog = (id = "") => {
    setLocalState({
      openAddEditProjectInfo: !openAddEditProjectInfo,
      editId: id,
    });
  };

  const handleAddEditTechnologyInfoDialog = (id = "") => {
    setLocalState({
      openAddEditTechnologyInfo: !openAddEditTechnologyInfo,
      skillEditId: id,
    });
  };
  const handleAddEditWorkLocationInfoDialog = (id = "") => {
    setLocalState({
      openAddEditWorkLocationInfo: !openAddEditWorkLocationInfo,
      locationEditId: id,
    });
  };

  const handleDeleteProjectDialog = (id = "") => {
    setLocalState({
      openDeleteProject: !openDeleteProject,
      projectId: id,
    });
  };

  const handleDeleteTechnologyDialog = (id = "") => {
    setLocalState({
      openDeleteTechnology: !openDeleteTechnology,
      skillId: id,
    });
  };
  const handleDeleteWorkLocationDialog = (id = "") => {
    setLocalState({
      openDeleteWorkLocation: !openDeleteWorkLocation,
      locationId: id,
    });
  };

  const handleSearchClick = (value) => {
    setLocalState({
      showOptions: false,
      showCancelIcon: false,
      searchInput: value,
    });

    refreshSearchTableData(INITIAL_PAGE, ROWS_PER_PAGE, tabValue, value);
  };

  const handleClickOutside = () => {
    setLocalState({
      showOptions: false,
    });
  };

  const onHandleDateChange = (newValue, type) => {
    const validDate = newValue ? new Date(newValue) : null;

    setLocalState({
      [type]:
        validDate && isValid(validDate) ? getBEDateFormat(validDate) : null,
    });
  };

  const { sessionToken } = MISCurrentUser();

  const handleExport = async (type) => {
    let url = "";
    if (tabValue === "1") url = `${SERVER_URL}/projects/export`;
    else if (tabValue === "2") url = `${SERVER_URL}/skill/export`;
    else if (tabValue === "3") url = `${SERVER_URL}/location/export`;

    setLocalState({ exportLoading: true });

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then((res) => res.blob())
      .then((response) => {
        downloadFile(response, type);
        setLocalState({ exportLoading: false });
      })
      .catch(handleError);
  };

  // Page change handler
  const handlePageChange = (newPage) => {
    setLocalState({ page: newPage });

    if (searchInput)
      refreshSearchTableData(newPage, rowsPerPage, tabValue, searchInput);
    else if (startDate && endDate)
      getProjectTableDataByDate(newPage, rowsPerPage, startDate, endDate);
    else refreshTable(newPage, rowsPerPage);

    document.getElementsByClassName("MuiTableContainer-root")[0].scrollTop = 0;
  };

  // Rows per page change handler
  const handleRowsPerPageChange = (event) => {
    const { value } = event.target;
    setLocalState({ page: INITIAL_PAGE, rowsPerPage: value });

    if (searchInput)
      refreshSearchTableData(INITIAL_PAGE, value, tabValue, searchInput);
    else if (startDate && endDate)
      getProjectTableDataByDate(INITIAL_PAGE, value, startDate, endDate);
    else refreshTable(INITIAL_PAGE, value);
  };

  return (
    <Paper
      display={"block"}
      justifyContent="flex-start"
      sx={{ borderRadius: 2 }}
    >
      {(isFetching ||
        isSkillFetching ||
        isSearchFetching ||
        isTechnologySearchFetching ||
        isSearchByDateFetching ||
        exportLoading) && <MISLoader />}

      <TabContext value={tabValue}>
        <TabList
          variant="fullWidth"
          indicatorColor="false"
          onChange={handleTabChange}
          aria-label="lab API tabs example"
          sx={{
            "& .MuiTab-root.Mui-selected": {
              color: BACKGROUND.white,
              backgroundColor: NETSMARTZ_THEME_COLOR,
            },
            "& .MuiTab-root": {
              fontWeight: 600,
            },
          }}
        >
          <StyledTab
            sx={{ borderTopLeftRadius: "10px" }}
            label={T.PROJECTS.toUpperCase()}
            value="1"
          />
          <StyledTab label={T.TECHNOLOGY.toUpperCase()} value="2" />
          <StyledTab
            sx={{ borderTopRightRadius: "10px" }}
            label={T.WORK_LOCATIONS.toUpperCase()}
            value="3"
          />
        </TabList>

        <Box
          sx={{
            "& .MuiTabPanel-root": {
              p: 2,
              pt: 0,
            },
          }}
        >
          <TopBar
            value={tabValue}
            startDate={startDate}
            endDate={endDate}
            searchInput={searchInput}
            showOptions={showOptions}
            showCancelIcon={showCancelIcon}
            searchTableData={searchTableData}
            handleExport={handleExport}
            onClick={handleSearchClick}
            handleKeyChange={handleSearchKeyChange}
            handleChange={handleSearchChange}
            reset={resetSearch}
            onClickOutside={handleClickOutside}
            onHandleDateChange={onHandleDateChange}
            handleAddEditProjectInfoDialog={handleAddEditProjectInfoDialog}
            handleAddEditTechnologyInfoDialog={
              handleAddEditTechnologyInfoDialog
            }
            handleAddEditWorkLocationInfoDialog={
              handleAddEditWorkLocationInfoDialog
            }
          />
          <TabPanel value="1">
            <Projects
              allTableRows={allTableRows}
              totalTableRowsCount={totalTableRowsCount}
              totalPageCount={totalPageCount}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              handleAddEditProjectInfoDialog={handleAddEditProjectInfoDialog}
              handleDeleteProjectDialog={handleDeleteProjectDialog}
            />
          </TabPanel>
          <TabPanel value="2">
            <Technology
              allTableRows={allTableRows}
              totalTableRowsCount={totalTableRowsCount}
              totalPageCount={totalPageCount}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              handleAddEditTechnologyInfoDialog={
                handleAddEditTechnologyInfoDialog
              }
              handleDeleteTechnologyDialog={handleDeleteTechnologyDialog}
            />
          </TabPanel>
          <TabPanel value="3">
          <WorkLocation
              allTableRows={allTableRows}
              totalTableRowsCount={totalTableRowsCount}
              totalPageCount={totalPageCount}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              handleAddEditWorkLocationInfoDialog={
                handleAddEditWorkLocationInfoDialog
              }
              handleDeleteWorkLocationDialog={handleDeleteWorkLocationDialog}
            />
          </TabPanel>
        </Box>
      </TabContext>

      <AddEditProjectInfo
        editId={editId}
        refreshTable={refreshTable}
        openAddEditProjectInfo={openAddEditProjectInfo}
        handleAddEditProjectInfoDialog={handleAddEditProjectInfoDialog}
      />

      <DeleteProject
        projectId={projectId}
        openDeleteProject={openDeleteProject}
        refreshView={refreshTable}
        handleDeleteProjectDialog={handleDeleteProjectDialog}
      />

      <AddEditTechnologyInfo
        editId={skillEditId}
        openAddEditTechnologyInfo={openAddEditTechnologyInfo}
        handleAddEditTechnologyInfoDialog={handleAddEditTechnologyInfoDialog}
        refreshTable={refreshTable}
      />

      <DeleteTechnology
        skillId={skillId}
        openDeleteTechnology={openDeleteTechnology}
        refreshView={refreshTable}
        handleDeleteTechnologyDialog={handleDeleteTechnologyDialog}
      />

      <AddEditWorkLocationInfo
        editId={locationEditId}
        openAddEditWorkLocationInfo={openAddEditWorkLocationInfo}
        handleAddEditWorkLocationInfoDialog={handleAddEditWorkLocationInfoDialog}
        refreshTable={refreshTable}
      />

      <DeleteWorkLocation
        locationId={locationId}
        openDeleteWorkLocation={openDeleteWorkLocation}
        refreshView={refreshTable}
        handleDeleteWorkLocationDialog={handleDeleteWorkLocationDialog}
      />
    </Paper>
  );
};

export default MasterSetting;
