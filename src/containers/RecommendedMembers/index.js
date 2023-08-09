import React, { useCallback, useEffect, useReducer } from "react";
import cloneDeep from "lodash/cloneDeep";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";

import { Typography, Paper, Menu, Switch, Tooltip, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useUpdateAccessFetch from "hooks/useUpdateAccessFetch";
import { debounce, get, isEqual } from "lodash";
import { memberFilterStore } from "slices/memberFilterSlice";
import { memberSearchStore } from "slices/memberSearchSlice"; 
import { savedFilterStore } from "slices/savedFilterSlice";
import { useLazyGetUserListQuery } from "api/members/getUserList";
import { useLazyGetUserSearchListQuery } from "api/members/getUserSearchList";
import usePMFetch from "hooks/usePMFetch";
import { useApplyFiltersMutation } from "api/members/filters/applyFilters";
import { useSaveFiltersMutation } from "api/members/filters/saveFilters";
import { useDeleteFilterMutation } from "api/members/filters/deleteFilter";
import { useLazyGetFiltersByMemberIdQuery } from "api/members/filters/getFiltersByMemberId";
import { useLazyGetFilterByIdQuery } from "api/members/filters/getFilterById";
import { TABLE_COLUMNS } from "settings/constants/members";
import { getCurrentTableParams } from "data/members/memberTableSelectors";
import { MISCurrentUser } from "utils/validations";
import { PAGINATION } from "settings/constants/pagination";
import Constants from "Constants";
import { handleError } from "utils/error";

import T from "T";
import { memberStore } from "slices/memberSlice";
import { toast } from "react-toastify";
import { downloadFile } from "utils/file";
import Table from "components/PreSales/RecommendedMembers/Table";
import MISLoader from "components/common/MISLoader";
import { handleConfigurationChange, handleConfiguratorDragEnd } from "data/configurator/configuratorSelector";
import MISTableConfigurator from "components/common/MISTableConfigurator";
import TopBar from "components/PreSales/RecommendedMembers/TopBar";

const RENDER_TABLE_DATA_TIME = 20;
const DEBOUNCE_TIME = 300;
const SCROLL_DEBOUNCE_TIME = 1000;
const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;
const { SERVER_URL } = Constants;
const defaultStoredFilters= {};
const SCROLL_ORIGIN = 0;
const defaultFiltervalues={
  availability: "", 
  departmentName: [],
  empMode: "",
  empStatus: "",
  page: 0,
  projectManagerName: [],
  projectMode: "",
  projectName: [],
  size: 50,
  primarySkillName: [],
  secondarySkillName: [],
  status: T.ACTIVE,
  totalExp: "",
  workLocationName: []}
  
const RecommendedMembers = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, pag, rowsPerPag, storedScrollPosition } = useSelector(
    (state) => ({
      user: get(state, "LoginSlice.user", null),
      pag: get(location, "state.showActive", true)? get(state, "MemberSlice.pag", INITIAL_PAGE): INITIAL_PAGE,
      rowsPerPag: get(state, "MemberSlice.rowsPerPage", ROWS_PER_PAGE),
      storedScrollPosition: get(state, "MemberSlice.storedScrollPosition", SCROLL_ORIGIN),
    }),
    shallowEqual
  );

  const memberId = get(user, "id", "");

  const [getUserList, { isFetching }] = useLazyGetUserListQuery();
  const [getUserSearchList, { isFetching: isSearchFetching }] =
    useLazyGetUserSearchListQuery();

  const [projectManagers,functionalManagers, workLocationList, skillList, projectList, departmentList] =
    usePMFetch();
    
  const [applyFilters, { isFetching: isApplyfetching }] =
    useApplyFiltersMutation();
  const [saveFilters, { isFetching: isSavefetching }] =
    useSaveFiltersMutation();
  const [deleteFilter, { isFetching: isDeleteFetching }] =
    useDeleteFilterMutation();
  const [getFiltersByMemberId] = useLazyGetFiltersByMemberIdQuery();

  const [getFilterById, { isFetching: isFilterFetching }] =
    useLazyGetFilterByIdQuery();

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      isOpenConfigurator: false,
      configuratorColumns: cloneDeep(TABLE_COLUMNS),
      pastConfiguratorColumns: cloneDeep(TABLE_COLUMNS),
      page: pag,
      rowsPerPage: rowsPerPag,
      totalTableRowsCount: 0,
      totalPageCount: 0,
      showActive: get(location, "state.showActive", true),
      searchInput: "",
      showOptions: false,
      showCancelIcon: false,
      isFilterApplied: false,
      selectedFilterId: "",
      filters: get(location, "state.filters", {}),
      filtersList: {},
      tableData:[],
      exportLoading: false,
      currentScrollPosition:0
    }
  );
  

  const {
    isOpenConfigurator,
    configuratorColumns,
    pastConfiguratorColumns,
    page,
    rowsPerPage,
    showActive,
    searchInput,
    showOptions,
    showCancelIcon,
    filters,
    isFilterApplied,
    selectedFilterId,
    tableData,
    searchTableData,
    filtersList,
    exportLoading,
    currentScrollPosition
  } = localState;
  
  const { storedFilterId } = useSelector(
    (state) => ({
      storedFilterId: get(state, "SavedFilterSlice.storedFilterId", ""),
    }),
    shallowEqual
  );

  const { storedFilters } = useSelector(
    (state) => ({
      storedFilters: get(state, "MemberFilterSlice.storedFilters", {}),
    }),
    shallowEqual
  );
  
  const { storedSearchInput } = useSelector(
    (state) => ({
      storedSearchInput: get(state, "MemberSearchSlice.storedSearchInput", ""),
    }),
    shallowEqual
  );

const isFilterStored = JSON.stringify(storedFilters)!==JSON.stringify(defaultStoredFilters);
const isFilterStoredEmpty = isEqual(storedFilters,defaultFiltervalues) || isEqual(defaultStoredFilters,storedFilters);

  const findFiltersByMemberId = () => {
    setTimeout(()=>{
      getFiltersByMemberId(memberId)
        .unwrap()
        .then((res) => {
          setLocalState({
            filtersList: res,
          });
        })
        .catch(handleError);

    },RENDER_TABLE_DATA_TIME)
  };

  const refreshMemberTable = () => {
    setTimeout(()=>{
      getMemberTableData(page, rowsPerPage);
    },RENDER_TABLE_DATA_TIME)
  };
 
  // const isFilterNotRendred = isEqual(storedFilters,defaultStoredFilters);
// useEffect(()=>{
//   if(!storedSearchInput && !storedFilterId && !isFilterStored) refreshMemberTable();
//   findFiltersByMemberId();
// },[])
// useEffect(()=>{
//   if(!isFilterNotRendred)
//   {
//     const renderedFilters =loadFetchedFilters (storedFilters);
//     setLocalState({filters:renderedFilters})
//   }
// },[])

useEffect(()=>{
  
  getMemberFilterTableData(page, rowsPerPage);

},[])

// useEffect(()=>{
//     if(storedFilterId && filtersList)
//     {
//       onHandleFilterSelect(storedFilterId)
//       handleFilterApply(storedFilterId);
//     } 
//   },[storedFilterId,filtersList])

// useEffect(()=>{
//     if(storedSearchInput && filtersList)
//     {
//       setLocalState(
//         {
//           searchInput:storedSearchInput,
//           showCancelIcon:true,
//         })
//       getMemberSearchTableData(
//         page,
//         rowsPerPage,
//         showActive,
//         storedSearchInput
//       );
//     } 
//   },[storedSearchInput,filtersList])

  useUpdateAccessFetch();

  const { allTableRows, totalTableRowsCount, totalPageCount } =
    getCurrentTableParams(tableData);

  const getMemberTableData = (page, rowsPerPage, status = showActive) => {
    
    getUserList({
      page,
      rowsPerPage,
      status: (status || showActive === T.STABLE) ? T.ACTIVE : T.INACTIVE,
    })
      .unwrap()
      .then((res) => {
        setLocalState({
          tableData: res,
        });
      })
      .catch(handleError);
  };

  const getMemberSearchTableData = (
    page,
    rowsPerPage,
    status = showActive,
    search = "",
    type = ""
  ) => {
    if (search === "" && type !== T.RESET) return;
    getUserSearchList({
      page,
      rowsPerPage,
      status: status ? T.ACTIVE : T.INACTIVE,
      search,
    })
      .unwrap()
      .then((res) => {
        dispatch(memberFilterStore({storedFilters:defaultStoredFilters}))
        dispatch(savedFilterStore({selectedFilterId:""}))
        setLocalState({
          page,
          searchTableData: res,
          tableData: res,
          filters: {},
          selectedFilterId:""
        });
      })
      .catch(handleError);
  };

  // Page change handler
  const handlePageChange = (newPage) => {
    setLocalState({ page: newPage });

    if (searchInput)
      getMemberSearchTableData(newPage, rowsPerPage, showActive, searchInput);
    else if (Object.keys(filters).length > 0)
      getMemberFilterTableData(newPage, rowsPerPage);
    else getMemberTableData(newPage, rowsPerPage);

    dispatch(memberStore({ page: newPage, rowsPerPage }));

    document.getElementsByClassName("MuiTableContainer-root")[0].scrollTop = 0;
  };

  // Rows per page change handler
  const handleRowsPerPageChange = (event) => {
    const { value } = event.target;

    setLocalState({ page: INITIAL_PAGE, rowsPerPage: value });

    if (searchInput)
      getMemberSearchTableData(INITIAL_PAGE, value, showActive, searchInput);
    else if (Object.keys(filters).length > 0)
      getMemberFilterTableData(INITIAL_PAGE, value);
    else getMemberTableData(INITIAL_PAGE, value);

    dispatch(memberStore({ page: INITIAL_PAGE, rowPerPage: value }));
  };

  const handleStatusSwitch = () => {
    navigate("/app/members", { state: { showActive: !showActive } });
    setLocalState({
      showActive: !showActive,
      page: INITIAL_PAGE,
      rowsPerPage: ROWS_PER_PAGE,
      filters:{},
      searchInput:"",
      selectedFilterId:""
    });

    getMemberTableData(INITIAL_PAGE, ROWS_PER_PAGE, !showActive);
    dispatch(memberFilterStore({storedFilters:defaultStoredFilters}))
    dispatch(savedFilterStore({selectedFilterId:""}))
    dispatch(memberFilterStore({storedFilters:{}}))
    dispatch(savedFilterStore({selectedFilterId:""}))
  };

  const renderTabContent = () => ({
    columns: pastConfiguratorColumns.filter((column) => column.checked),
    lockedColumns: pastConfiguratorColumns.filter(
      (column) => column.locked && column.checked
    ),
    page,
    rowsPerPage,
    totalTableRowsCount,
    totalPageCount,
    refreshMemberTable: refreshMemberTable,
    onPageChange: handlePageChange,
    onRowsPerPageChange: handleRowsPerPageChange,
    // handleScroll,
    // tableData,
    storedScrollPosition,
    currentScrollPosition,
    allTableRows,
  });

  const handleConfigurator = () => {
    setLocalState({ isOpenConfigurator: !isOpenConfigurator });
  };

  const handleSearchClick = (value) => {
    setLocalState({
      showOptions: false,
      showCancelIcon: false,
      searchInput: value,
    });
    getMemberSearchTableData(INITIAL_PAGE, rowsPerPage, showActive, value);
  };
  
  const handleSearchChange = (event) => {
    
    const { value, dataset } = event.currentTarget;

    const searchValue = value || get(dataset, "val", "");

    if (searchValue === "")
    {
      dispatch(memberSearchStore({storedSearchInput:searchValue}));
      refreshMemberTable();
    } 

    setLocalState({
      showOptions: event.key === "Enter" ? false : true,
      showCancelIcon: searchValue !== "",
      searchInput: searchValue,
    });

    if (
      event.key === "Enter" ||
      event.currentTarget.nodeName === "svg" ||
      searchValue === ""
    )
    {
      dispatch(memberSearchStore({storedSearchInput:searchValue}))
      getMemberSearchTableData(
        INITIAL_PAGE,
        rowsPerPage,
        showActive,
        searchValue
      );

    }
  };

  const handleSearchKeyChange = () => {
    dispatch(memberSearchStore({storedSearchInput:searchInput}))
    getMemberSearchTableData(
      INITIAL_PAGE,
      rowsPerPage,
      showActive,
      searchInput
    );
  };

  const resetSearch = () => {
    setLocalState({
      showOptions: false,
      searchInput: "",
      showCancelIcon: false,
    });
    dispatch(memberSearchStore({storedSearchInput:""}))
    refreshMemberTable();
  };

  const handleClickOutside = () => {
    setLocalState({
      showOptions: false,
    });
  };

  const onhandleFilterChange = (newValue, item) => {
    dispatch(memberFilterStore({storedFilters:defaultStoredFilters}))
    dispatch(savedFilterStore({selectedFilterId:""}))
    filters[item] = newValue;
    setLocalState({ filters });
  };

  const getAvailabilityVal = (availability) => {
    if (availability === T.FULL) return 1;
    if (availability === T.NO) return 0;
    if (availability === T.PARTIAL) return 2;
    return "";
  };

  const getAvailabilityValById = (availability) => {
    if (availability === "1") return T.FULL;
    if (availability === "0") return T.NO;
    if (availability === "2") return T.PARTIAL;
    return "";
  };

  const getFilterPayload = (page = INITIAL_PAGE, rowsPerPage) => {
    if(isFilterStored)
    {
      const payload = {...storedFilters};
      payload.page= page;
      payload.size= rowsPerPage;
      return payload;
    }
    else{

      const minExp = get(filters, "minExp", "");
      const maxExp = get(filters, "maxExp", "");
  
      const availability = get(filters, T.AVAILABILITY, "");
  
      const payload = {
        primarySkillName: get(filters, `[${T.PRIMARY_SKILL}]`, []).map(
          (data) => data.skillName
        ),
        secondarySkillName: get(filters, `[${T.SECONDARY_SKILL}]`, []).map(
          (data) => data.skillName
        ),
        workLocationName: get(filters, `[${T.WORK_LOCATION}]`, []).map(
          (data) => data.workLocationName
        ),
        departmentName: get(filters, `[${T.DEPARTMENT}]`, []).map(
          (data) => data.departmentName
        ),
        empMode: get(filters, T.EMP_MODE, ""),
        empStatus: get(filters, T.STATUS, ""),
        projectName: get(filters, `[${T.PROJECT}]`, []).map((data) => data.name),
        projectMode: get(filters, T.PROJECT_MODE, ""),
        availability: getAvailabilityVal(availability),
        projectManagerName: get(filters, `[${T.PROJECT_MANAGER}]`, []).map(
          (data) => data.name
        ),
        totalExp:
          minExp && maxExp
            ? `${get(filters, "minExp", "")}-${get(filters, "maxExp", "")}`
            : "",
        status: showActive ? T.ACTIVE : T.INACTIVE,
        page,
        size: rowsPerPage,
      };
      return payload;
    }
  };

  const getMemberFilterTableData = (page, rowsPerPage) => {
    const payload = getFilterPayload(page, rowsPerPage);
    // dispatch(memberFilterStore({storedFilters:payload}));
    
    applyFilters(payload)
      .unwrap()
      .then((res) => {
        
        // if(isFilterStored)
        // {
        //   setLocalState({filters:loadFetchedFilters(storedFilters)})
        // }
        setLocalState({
          tableData: res,
          searchInput: "",
          page,
        });
      })
      .catch(handleError);
  };

  const handleFilterSubmit = () => {
    dispatch(memberSearchStore({storedSearchInput:""}))
    setLocalState({selectedFilterId:""})
    getMemberFilterTableData(INITIAL_PAGE, rowsPerPage);
  };

  const handleFilterClose = () => {
    setLocalState({ filters: {}, selectedFilterId: "" });
    dispatch(memberFilterStore({storedFilters:defaultStoredFilters}))
    refreshMemberTable();
  };


  const handleFilterSave = (filterName) => {
    if (Object.keys(filters).length === 0) {
      toast.error(T.NO_FILTER_SELECTED);
      return;
    }

    if (filterName === "") {
      toast.error(T.PLEASE_ADD_FILTER_NAME);
      return;
    }

    if (
      get(filtersList, "results", [])
        .map((data) => data.name)
        .includes(filterName)
    ) {
      toast.error(T.FILTER_NAME_ALREADY_EXISTS);
      return;
    }

    const payload = {
      filter: getFilterPayload(),
      memberId,
      name: filterName,
    };

    payload["filter"].page = page;
    payload["filter"].size = rowsPerPage;

    saveFilters(payload)
      .unwrap()
      .then(() => {
        toast.success(T.FILTER_ADDED_SUCCESSFULLY);
        findFiltersByMemberId();
      })
      .catch(handleError);
  };

  const loadFetchedFilters = (records) => {
    const totalExp = get(records, "totalExp", "");
    const exp = totalExp.split("-");
    filters[T.PRIMARY_SKILL] = get(skillList, "results", []).filter((rec) =>
      get(records, "primarySkillName", []).includes(rec.skillName)
    );  

    filters[T.SECONDARY_SKILL] = get(skillList, "results", []).filter((rec) =>
      get(records, "secondarySkillName", []).includes(rec.skillName)
    );

    filters[T.WORK_LOCATION] = get(workLocationList, "results", []).filter(
      (rec) =>
        get(records, "workLocationName", []).includes(rec.workLocationName)
    );
    filters[T.EMP_MODE] = get(records, "empMode", "");
    filters[T.STATUS] = get(records, "empStatus", "");
    filters[T.DEPARTMENT] = get(departmentList, "results", []).filter((rec) =>
      get(records, "departmentName", []).includes(rec.departmentName)
    )
    filters[T.PROJECT] = get(projectList, "results", []).filter((rec) =>
      get(records, "projectName", []).includes(rec.name)
    );
    filters[T.PROJECT_MODE] = get(records, "projectMode", "");
    filters[T.AVAILABILITY] = getAvailabilityValById(
      get(records, "availability", "")
    );
    filters[T.PROJECT_MANAGER] = get(projectManagers, "results", []).filter(
      (rec) => get(records, "projectManagerName", []).includes(rec.name)
    );
    filters.minExp = exp[0] || "";
    filters.maxExp = exp[1] || "";

    return filters;
  };
  
  const handleBack = () => {
    navigate("/app/pre-sales");
  };
  const onHandleFilterSelect = (id) => {
    setLocalState({
      selectedFilterId: id,
    });
  };
  const toastFilterAppliedMessage = useCallback(debounce(()=>{
    toast.success(T.FILTER_APPLIED_SUCCESSFULLY);
  },DEBOUNCE_TIME),[])

  const handleFilterApply = (storedFilterId="") => {
    const storedId=storedFilterId || selectedFilterId;
    dispatch(memberSearchStore({storedSearchInput:""}));
    dispatch(memberFilterStore({storedFilters:defaultStoredFilters}))
    setLocalState({searchInput:""})
    getFilterById({
      id: storedId,
    })
      .unwrap()
      .then((res) => {
        const filterListResults = get(filtersList, "results", []);
        if (filterListResults.length > 0) {
          const selectedFilterResults = filterListResults.find(
            (result) => result.id === storedId
          );
          const parsedRecords = JSON.parse(
            get(selectedFilterResults, "filters", "")
          );
          setLocalState({
            filters: loadFetchedFilters(parsedRecords),
          });
        }
        setLocalState({
          tableData: res,
        });
        !storedFilterId && toastFilterAppliedMessage();
      })
      .catch(handleError);
  };

  const handleFilterDelete = (id) => {
    deleteFilter({
      id,
    })
      .unwrap()
      .then(() => {
        findFiltersByMemberId();
        toast.success(T.FILTER_DELETED_SUCCESSFULLY);
      })
      .catch(handleError);
  };
  // const handleScrollChange= (e) =>{
  //   const scrollPosition = e.target.scrollTop;
  //   setLocalState({currentScrollPosition:scrollPosition})
  //   dispatch(memberStore({storedScrollPosition:scrollPosition}))
  // }

  // const handleScroll = useCallback(debounce(handleScrollChange,SCROLL_DEBOUNCE_TIME),[]);
  
  const { sessionToken } = MISCurrentUser();
  const exportFilterInitial= {
    availability : "",
    departmentName : [],
    empMode : "",
    empStatus : "",
    projectManagerName : [],
    projectMode : "",
    projectName : [],
    primarySkillName : [],
    secondarySkillName : [],
    status : showActive?T.ACTIVE:T.INACTIVE,
    workLocationName : [],
    totalExp : `-`,
  }
  const handleExport = async (type,exportFilter) => {
    setLocalState({ exportLoading: true });
    const filterRequestDto= {...exportFilter};
    if((JSON.stringify(exportFilter))===(JSON.stringify(exportFilterInitial)))
    {
      
      fetch(`${SERVER_URL}/user/export?type=${type}`, {
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
    }
    else
    {
      fetch(`${SERVER_URL}/user/filter/export?type=${type}`, {
        method: "POST",
        body :JSON.stringify(filterRequestDto),
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          'content-type': 'application/json'
        },
      })
        .then((res) => res.blob())
        .then((response) => {
          downloadFile(response, type);
  
          setLocalState({ exportLoading: false });
        })
        .catch(handleError);
    }
  };

  const renderSearchFilterContent = () => ({
    searchInput,
    showOptions,
    showCancelIcon,
    searchTableData,
    filters,
    showActive,
    projectManagers,
    workLocationList,
    skillList,
    departmentList,
    projectList,
    filtersList,
    selectedFilterId,
    isFilterStoredEmpty,
    isFilterApplied,
    handleFilterApply: handleFilterApply,
    handleFilterDelete: handleFilterDelete,
    onHandleFilterSelect: onHandleFilterSelect,
    handleFilterSave: handleFilterSave,
    handleFilterSubmit: handleFilterSubmit,
    handleFilterClose: handleFilterClose,
    handleExport: handleExport,
    onhandleFilterChange: onhandleFilterChange,
    onClick: handleSearchClick,
    handleChange: handleSearchChange,
    handleKeyChange: handleSearchKeyChange,
    reset: resetSearch,
    onClickOutside: handleClickOutside,
    handleConfigurator: handleConfigurator,
  });

  return (
    <Paper sx={{ p: 2 }}>
      {(isFetching ||
        isSearchFetching ||
        isApplyfetching ||
        isSavefetching ||
        isFilterFetching ||
        exportLoading ||
        isDeleteFetching) && <MISLoader />}
        <Box display="flex" alignItems="center" mb={1}>
        <ArrowBackIcon
          fontSize="small"
          sx={{ cursor: "pointer" }}
          onClick={handleBack}
        />
        <Typography variant="h5" ml={1}>
        {T.RECOMMENDED_MEMBERS_LIST}

        {/* <Tooltip
          placement="top"
          title={
            showActive
              ? T.TOGGLE_TO_SHOW_INACTIVE_MEMBERS
              : T.TOGGLE_TO_SHOW_ACTIVE_MEMBERS
          }
        >
          <Switch
            color="warning"
            checked={showActive}
            onChange={handleStatusSwitch}
          />
        </Tooltip> */}
      </Typography>
      </Box>

      {/* <TopBar {...renderSearchFilterContent()} /> */}
      <Table {...renderTabContent()} />

      <Menu
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setLocalState({ isOpenConfigurator: null })}
        open={Boolean(isOpenConfigurator)}
        anchorEl={isOpenConfigurator}
        PaperProps={{
          style: {
            left: "50%",
            transform: "translateX(65%) translateY(-15%)",
          },
        }}
      >
        <MISTableConfigurator
          configData={configuratorColumns}
          handleOnDragEnd={(result) =>
            setLocalState({
              configuratorColumns: handleConfiguratorDragEnd({
                result,
                columns: configuratorColumns,
              }),
            })
          }
          handleCancel={() =>
            setLocalState({
              isOpenConfigurator: null,
              configuratorColumns: pastConfiguratorColumns,
            })
          }
          handleConfChange={(index, type, confData) =>
            setLocalState({
              configuratorColumns: handleConfigurationChange({
                index,
                type,
                confData,
              }),
            })
          }
          saveConfigSettings={() =>
            setLocalState({
              isOpenConfigurator: null,
              pastConfiguratorColumns: configuratorColumns,
            })
          }
        />
      </Menu>
    </Paper>
  );
};

export default RecommendedMembers;
