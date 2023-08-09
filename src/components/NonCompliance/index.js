import { Box } from '@mui/system';
import React, { useEffect, useReducer } from 'react';
import NCList from './NCList/NCList';
import NCTopBar from './NCTopBar';
import { PAGINATION } from "settings/constants/pagination";
import Constants from "Constants";
import { MISCurrentUser } from 'utils/validations';
import { BACKEND_DATE_FORMAT } from "settings/constants/date";
import { get } from 'lodash';
import { format, getTime, isValid, parseISO } from 'date-fns';
import { getCurrentTableParams } from 'data/members/memberTableSelectors';
import AddNCInfo from './NCList/AddNCInfo';
import DeleteNC from './NCList/DeleteNC';
import UserNCByDate from './NCList/NcByUser/UserNCByDate';
import usePMFetch from 'hooks/usePMFetch';
import { StyledTab } from 'components/MasterSetting';
import { Button, Paper } from '@mui/material';
import { BACKGROUND, NETSMARTZ_THEME_COLOR } from 'theme/colors';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import T from 'T';
import ConsolidatedNc from './NCList/ConsolidatedNc';
import { useGetJiraByFilterMutation } from 'api/Jira/getJiraByFilter';
import { useGetConsolidatedNcMutation } from 'api/Jira/getConsolidatedNc';
import DeletedNc from './NCList/DeletedNc';
import { useLazyGetRemovedNcListQuery } from 'api/Jira/getRemovedNcList';
import { useDeleteAllNcByIdMutation } from 'api/Jira/deleteAllNcById';
import { toast } from 'react-toastify';
import { handleError } from 'utils/error';
import DeleteAllNC from './NCList/DeleteAllNc';
const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;
const defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate()-1);
defaultDate.getDay()===0 && defaultDate.setDate(defaultDate.getDate()-1);

const NonCompliance = () => {
  const getBEDateFormat = (val) => format(val, BACKEND_DATE_FORMAT);
    const [localState, setLocalState] = useReducer(
        (prevState, newState) => ({ ...prevState, ...newState }),
        {
          tabValue:"1",
          editId: "",
          startDate: getBEDateFormat(defaultDate),
          endDate: getBEDateFormat(defaultDate),
          searchInput: "",
          tableData: [],
          showOptions: false,
          showCancelIcon: false,
          searchTableData: {},
          exportLoading: false,
          page: INITIAL_PAGE,
          rowsPerPage: ROWS_PER_PAGE,
          openAddNCInfo: false,
          openDeleteNC: false,
          openNcByDate: false,
          selectedUserName: "",
          ncType: "",
          reportingManager: "",
          selectedDate: null,
          ncId: "",
          ncUserId: "",
          deleteUserId: "",
          deleteComments:"",
          deleteChecks:[],
          selectAllCheck:false,
          deleteTableData:[],
          openDeleteAllNC:false,
          allNcId:[]
        }
      );
    
      const {
        tabValue,
        editId,
        startDate,
        endDate,
        searchInput,
        showOptions,
        showCancelIcon,
        tableData,
        searchTableData,
        openDeleteNC,
        openNcByDate,
        selectedUserName,
        selectedDate,
        ncType,
        reportingManager,
        ncId,
        ncUserId,
        deleteUserId,
        exportLoading,
        page,
        rowsPerPage,
        openAddNCInfo,
        deleteComments,
        deleteChecks,
        selectAllCheck,
        deleteTableData,
        openDeleteAllNC,
        allNcId
      } = localState;
      const { SERVER_URL } = Constants;
      // const { sessionToken } = MISCurrentUser();
      const [projectManagers] = usePMFetch();
      const {user}= MISCurrentUser();
      const userId= get(user,"id","");
      const userRole = get(user,"role","");
      
      const {  allTableRows,totalTableRowsCount, totalPageCount } = getCurrentTableParams(tableData);
      
      const [getJiraByFilter]= useGetJiraByFilterMutation();
      const [getConsolidatedNc]= useGetConsolidatedNcMutation();
      const [getRemovedNcList]= useLazyGetRemovedNcListQuery();
      
      
      useEffect(()=>{
        getNcDataByFilter(userId,page, rowsPerPage);
      },[tabValue])
      
      useEffect(() => {
        if ((startDate && endDate )|| !openDeleteNC) {
          
          getNcDataByFilter(userId,page, rowsPerPage);
        }
      }, [startDate, endDate]);

       useEffect(()=>{
        getNcDataByFilter(userId,page,rowsPerPage)
       },[reportingManager,ncType])
       
       useEffect(()=>{
        if(!searchInput)
        { setTimeout(()=>{
          getNcDataByFilter(userId,page, rowsPerPage);
        },10)
        }
      },[searchInput])

      useEffect(()=>{
          refreshTable(page ,rowsPerPage);
      },[openDeleteNC])


       useEffect(()=>{
        if(tabValue==="3" && deleteTableData)
        {
          let checkedData=[];
          // checkedData=[...deleteChecks];
          deleteTableData.map(item=>checkedData.push({label:item.id,isChecked:false}))
          setLocalState({deleteChecks:checkedData,selectAllCheck:false});
        }
        else if(tabValue!=="3")
        {
          setLocalState({deleteChecks:[],selectAllCheck:false});
        }
      },[tabValue,deleteTableData])
      
      const refreshTable = (
        page ,
        rowsPerPage 
      ) => {  
          setLocalState({deleteChecks:[],selectAllCheck:false})
          getNcDataByFilter(userId,page, rowsPerPage);
      };
    
      const getNcDataByFilter = (id, page, rowPerPage)=>{
        if(tabValue==="1")
        {
            const payload ={
              reportingManager:reportingManager,
              typeOfNc:ncType,
              startDate:startDate,
              endDate:endDate,
              userName:searchInput
            }
            getJiraByFilter({
              id,
              page,
              rowPerPage,
              ncFilterRequestDto:payload
            })
            .unwrap()
            .then((res)=>{
              setLocalState({
                tableData:res
              })
            })
        }
        
        if(tabValue==="2")
        {
          const payload ={
            reportingManager:reportingManager,
            searchStr:searchInput
          }
          getConsolidatedNc({
            id,
            page,
            rowPerPage,
            consolidatedNcDto:payload
          })
          .unwrap()
          .then((res)=>{
            setLocalState({
              tableData:res
            })
          })
        }
        if(tabValue==="3")
        {
          getRemovedNcList({id})
          .unwrap()
          .then((res)=>{
            let checkedData=[];
            get(res,"results",[]).map(item=>checkedData.push({label:item.id,isChecked:false}))
            // setLocalState({deleteChecks:checkedData});
            setLocalState({
              tableData:res,
              deleteChecks:checkedData,
              selectAllCheck:false
            })
          })
        }
      }
    
      // const setDeleteChecksIntialData=(deleteChecksData)=>{
      //   setLocalState({deleteTableData:deleteChecksData})
      // }
      const handleExport = async (type) => {
        const url = `${SERVER_URL}/location/export`;
    
        setLocalState({ exportLoading: true });
    
        // fetch(url, {
        //   method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${sessionToken}`,
        //   },
        // })
        //   .then((res) => res.blob())
        //   .then((response) => {
        //     downloadFile(response, type);
        //     setLocalState({ exportLoading: false });
        //   })
        //   .catch(handleError);
      };

      
        //NC Adding handler
      const handleAddNCInfoDialog = () => {
        setLocalState({
          openAddNCInfo: !openAddNCInfo,
        });
      };

        //NC Deleting Handler
      const handleDeleteNCDialog = (ncId = "",userId="",comments="") => {
        setLocalState({
          openDeleteNC: !openDeleteNC,
          ncId: ncId,
          deleteUserId: userId,
          deleteComments:comments
        });
        
      };
      
      //By Date NC dialog Opening Handler
      const handleByDateUserNCDialog = ( ncUserId="", userName= "",selectedDate="") => {
        setLocalState({
          ncUserId:ncUserId,
          openNcByDate: !openNcByDate,
          selectedUserName:userName,
          selectedDate:selectedDate
        });
      };
      
      // type of NC handler
      const onHandleChange = (event) => {
        const { name, value } = event.target;
        setLocalState({ [name]: value });
      };
    
      //Reporting manager handler
      const onHandleAutoCompleteChange =(type,value)=>{
        setLocalState({ [type]: value });
      }
      const handleSearchClick = (value) => {
        setLocalState({
          showOptions: false,
          showCancelIcon: false,
          searchInput: value,
        });
      
        getNcDataByFilter(userId,page, rowsPerPage);
      };
    
      const handleClickOutside = () => {
        setLocalState({
          showOptions: false,
        });
      };
      const handleSearchKeyChange = () => {
        setLocalState({
          page: INITIAL_PAGE,
        });
        getNcDataByFilter(userId,page, rowsPerPage);
      };
      
      const handleDeleteCheckBoxChange = (event,index) => {
        const {name, checked, id} =event.target;
        
        if(name===T.SELECT_ALL)
        {
          if(checked)
          {
            let checkedData=[...deleteChecks];  
            checkedData.map(record=>record.isChecked=true)
            setLocalState({deleteChecks:checkedData,selectAllCheck:true})
          }
          else
          {
            let checkedData=[...deleteChecks];
            checkedData.map(record=>record.isChecked=false)
            setLocalState({deleteChecks:checkedData,selectAllCheck:false});
          }
        }
        else
          {
            if(checked)
            {
              let checkedData=[...deleteChecks];
              checkedData[index].isChecked=true;
              setLocalState({deleteChecks:checkedData});
            }
            else
            {
              let checkedData=[...deleteChecks];
              checkedData[index].isChecked=false;
              setLocalState({deleteChecks:checkedData});
            }
        }
      };
      
      const deleteChecksPayload = deleteChecks.filter(data=>data.isChecked===true).map(item=>item.label);
      const handleDeleteAllNcDialog=()=>{
        setLocalState({
          openDeleteAllNC: !openDeleteAllNC,
          allNcId: deleteChecksPayload,
          deleteUserId: userId
        });
        
      }
     
      const handleTabChange = (event, newValue) => {
        setLocalState({
          tabValue: newValue,
          page: INITIAL_PAGE,
          rowsPerPage: ROWS_PER_PAGE,
          searchInput: "",
          reportingManager:""
        });
      }
      const handleSearchChange = (event) => {
        const { value, dataset } = event.currentTarget;
        const searchValue = value || get(dataset, "val", "");
        // if (searchValue === "") getNcDataByFilter(userId,page, rowsPerPage);
        
        setLocalState({
          showOptions: event.key === "Enter" ? false : true,
          showCancelIcon: searchValue !== "",
          searchInput: searchValue,
        });
    
        if (event.currentTarget.nodeName === "svg")
        {
          getNcDataByFilter(userId,page, rowsPerPage);

        }
      };
      const resetSearch = () => {
        setLocalState({
          showOptions: false,
          searchInput: "",
          showCancelIcon: false,
        });
          getNcDataByFilter(userId,page, rowsPerPage);
        
        
      };
      const onHandleDateChange = (newValue, type) => {
        const validDate = newValue ? new Date(newValue) : null;
    
        setLocalState({
          [type]:
            validDate && isValid(validDate) ? getBEDateFormat(validDate) : null,
        });
      };
      
        // Page change handler
  const handlePageChange = (newPage) => {
    setLocalState({ page: newPage });
    getNcDataByFilter(userId,newPage, rowsPerPage);
    document.getElementsByClassName("MuiTableContainer-root")[0].scrollTop = 0;
  };

  // Rows per page change handler
  const handleRowsPerPageChange = (event) => {
    const { value } = event.target;
    setLocalState({ page: INITIAL_PAGE, rowsPerPage: value });

    getNcDataByFilter(userId,INITIAL_PAGE, value);
    
  };
  return (
      <Paper
      display={"block"}
      justifyContent="flex-start"
      sx={{ borderRadius: 2 }}
       >

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
            label={T.NC_LIST_VIEW.toUpperCase()}
            value="1"
          />
          <StyledTab 
            label={T.CONSOLIDATED_NC_LIST.toUpperCase()}
            sx={{ borderTopRightRadius:  (userRole === T.VP || userRole=== T.PMO)? "0px":"10px" }}
            value="2" 
          />
          {
            (userRole === T.VP || userRole=== T.PMO) &&
              <StyledTab 
                sx={{ borderTopRightRadius: "10px" }}
                label={T.DELETED_NC_LIST.toUpperCase()}
                value="3" 
              />
          }
          
        </TabList>

        <Box
          sx={{
            "& .MuiTabPanel-root": {
              p: 2,
              pt: 0,
            },
          }}
        >
          {
            tabValue!=="3" &&
              <NCTopBar
                tabValue={tabValue}
                startDate={startDate}
                endDate={endDate}
                searchInput={searchInput}
                ncType={ncType}
                reportingManager={reportingManager}
                showOptions={showOptions}
                showCancelIcon={showCancelIcon}
                searchTableData={searchTableData}
                handleExport={handleExport}
                onClick={handleSearchClick}
                handleAddNCInfoDialog={handleAddNCInfoDialog}
                handleKeyChange={handleSearchKeyChange}
                handleChange={handleSearchChange}
                reset={resetSearch}
                onClickOutside={handleClickOutside}
                onHandleDateChange={onHandleDateChange}
                onHandleChange={onHandleChange}
                onHandleAutoCompleteChange={onHandleAutoCompleteChange}
                projectManagers={projectManagers}
                
             />
          }
          <TabPanel value="1">
            <NCList
                allTableRows={allTableRows}
                totalTableRowsCount={totalTableRowsCount}
                totalPageCount={totalPageCount}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                handleDeleteNCDialog={handleDeleteNCDialog}
                handleByDateUserNCDialog={handleByDateUserNCDialog}
                
            />
          </TabPanel>
          <TabPanel value="2">
          <ConsolidatedNc
                allTableRows={allTableRows}
                totalTableRowsCount={totalTableRowsCount}
                totalPageCount={totalPageCount}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                handleDeleteNCDialog={handleDeleteNCDialog}
                handleByDateUserNCDialog={handleByDateUserNCDialog}
                
            />
          </TabPanel>
          {
            (userRole === T.VP || userRole=== T.PMO) &&
            <TabPanel value="3">
            <DeletedNc
                  allTableRows={allTableRows}
                  totalTableRowsCount={totalTableRowsCount}
                  totalPageCount={totalPageCount}
                  page={page}
                  selectAllCheck={selectAllCheck}
                  rowsPerPage={rowsPerPage}
                  deleteChecks={deleteChecks}
                  onPageChange={handlePageChange}
                  // setDeleteChecksIntialData={setDeleteChecksIntialData}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  handleDeleteNCDialog={handleDeleteNCDialog}
                  handleByDateUserNCDialog={handleByDateUserNCDialog}
                  handleDeleteCheckBoxChange={handleDeleteCheckBoxChange}
                  deleteChecksPayload={deleteChecksPayload}
                  
              />
            </TabPanel>

          }
        </Box>
        {
          deleteChecksPayload.length>0 &&
          <Box
            sx={{
              "& .MuiTabPanel-root": {
                p: 2,
                pt: 0,
              },
              display:"flex",
              justifyContent:"flex-end"
            }}
          >
            <Button
              variant="contained"
              size={"small"}
              sx={{
                ml: 2,
                mt:4,
                mr:3,
                mb:1,
                minWidth: 80,
                bgcolor: NETSMARTZ_THEME_COLOR,
                "&:hover": {
                  bgcolor: NETSMARTZ_THEME_COLOR,
                },
              }}
              // onClick={handleNcDelete}
               onClick={handleDeleteAllNcDialog}
            >
              {T.DELETE_SELECTED_NCS}
            </Button>
          </Box>

        }
        
      </TabContext>

      <AddNCInfo
        editId={editId}
        refreshTable={refreshTable}
        openAddNCInfo={openAddNCInfo}
        handleAddNCInfoDialog={handleAddNCInfoDialog}
      />
      <DeleteNC
        ncId={ncId}
        userId={deleteUserId}
        deleteComments={deleteComments}
        openDeleteNC={openDeleteNC}
        refreshView={refreshTable}
        handleDeleteNCDialog={handleDeleteNCDialog}
      />
      <DeleteAllNC
        allNcId={allNcId}
        userId={deleteUserId}
        openDeleteAllNC={openDeleteAllNC}
        refreshView={refreshTable}
        handleDeleteAllNcDialog={handleDeleteAllNcDialog}
      />
      <UserNCByDate
        id={ncUserId}
        openNcByDate={openNcByDate}
        selectedUserName={selectedUserName}
        selectedDate={selectedDate}
        handleByDateUserNCDialog={handleByDateUserNCDialog}
      />
    </Paper>
    );
};

export default NonCompliance;