import React, { useEffect, useReducer } from "react";
import { Box, Tab, Paper, styled, Typography } from "@mui/material";



import { PAGINATION } from "settings/constants/pagination";


import Constants from "Constants";
import PreSalesTab from "./PresSalesTab";
import TopBar from "./Topbar";
import T from "T";
import EditPreSalesProjectInfo from "./EditPreSalesProjectInfo";
import DeletePreSalesProject from "./DeletePreSalesProject";
import { handleError } from "utils/error";
import { useLazyGetAllPreSalesListQuery } from "api/preSales/getAllPreSalesList";
import { getCurrentTableParams } from "data/members/memberTableSelectors";
import ViewJobDescription from "./ViewJobDescription";
import { orderBy } from "lodash";


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

const PreSales = () => {
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      openEditProjectDialog: false,
      openDeletePreSalesProject: false,
      tableData:[],
      page:INITIAL_PAGE,
      rowsPerPage:ROWS_PER_PAGE,
      openJd:false,
      jobDescription:{}
    }
  );

  const { 
    openEditProjectDialog,
    openDeletePreSalesProject,
    tableData,
    page,
    rowsPerPage,
    openJd,
    jobDescription
   } = localState;

  const { SERVER_URL } = Constants;
  const { allTableRows, totalTableRowsCount, totalPageCount } =
    getCurrentTableParams(tableData);
  const [ getAllPreSalesList ] = useLazyGetAllPreSalesListQuery();


  useEffect(()=>{
    refreshTable(page,rowsPerPage);
  },[])
  const  handleEditProjectInfoDialog = () =>{
    setLocalState({openEditProjectDialog:!openEditProjectDialog})
  }
  const handleDeleteProjectDialog = () =>{
    setLocalState({openDeletePreSalesProject:!openDeletePreSalesProject})
  }
  const refreshTable = (
    page = INITIAL_PAGE,
    rowPerPage = ROWS_PER_PAGE,
  ) => {
    getPreSalesTableData(page, rowPerPage);
  };
  const getPreSalesTableData = (page, size) => {
    getAllPreSalesList({ page: page, rowPerPage: size })
      .unwrap()
      .then((res) => {
        setLocalState({
          tableData: res,
        });
      })
      .catch(handleError);
  };
    // Page change handler
    const handlePageChange = (newPage) => {
      setLocalState({ page: newPage });
  
      // if (searchInput)
      //   refreshSearchTableData(newPage, rowsPerPage, tabValue, searchInput);
      // else if (startDate && endDate)
      //   getProjectTableDataByDate(newPage, rowsPerPage, startDate, endDate);
      // else refreshTable(newPage, rowsPerPage);
      refreshTable(newPage, rowsPerPage);
      document.getElementsByClassName("MuiTableContainer-root")[0].scrollTop = 0;
    };
    // Rows per page change handler
  const handleRowsPerPageChange = (event) => {
    const { value } = event.target;
    setLocalState({ page: INITIAL_PAGE, rowsPerPage: value });

    // if (searchInput)
    //   refreshSearchTableData(INITIAL_PAGE, value, tabValue, searchInput);
    // else if (startDate && endDate)
    //   getProjectTableDataByDate(INITIAL_PAGE, value, startDate, endDate);
    // else refreshTable(INITIAL_PAGE, value);
    refreshTable(INITIAL_PAGE, value);
  };
  const handleJdDialog =(jdData) =>{
    setLocalState({openJd:!openJd,jobDescription:jdData});
  }
  const handleDaysSorting =() =>{
    // orderBy()
  }
  return (
    <Paper
      display={"block"}
      justifyContent="flex-start"
      sx={{ borderRadius: 2,p:2 }}
    >
      {/* {(isFetching ||
        isSkillFetching ||
        isSearchFetching ||
        isTechnologySearchFetching ||
        isSearchByDateFetching ||
        exportLoading) && <MISLoader />} */}

      
      <Typography variant="h5" fontWeight={600} mb={1} sx={{pt:2}}>
            {T.PRE_SALES_PROJECT_LIST_VIEW}
      </Typography>
        <Box
          sx={{
            "& .MuiTabPanel-root": {
              p: 2,
              pt: 0,
            },
          }}
        >
          <TopBar
            // value={tabValue}
            // startDate={startDate}
            // endDate={endDate}
            // searchInput={searchInput}
            // showOptions={showOptions}
            // showCancelIcon={showCancelIcon}
            // searchTableData={searchTableData}
            // handleExport={handleExport}
            // onClick={handleSearchClick}
            // handleKeyChange={handleSearchKeyChange}
            // handleChange={handleSearchChange}
            // reset={resetSearch}
            // onClickOutside={handleClickOutside}
            // onHandleDateChange={onHandleDateChange}
            // handleAddEditProjectInfoDialog={handleAddEditProjectInfoDialog}
            // handleAddEditTechnologyInfoDialog={
            //   handleAddEditTechnologyInfoDialog
            // }
            // handleAddEditWorkLocationInfoDialog={
            //   handleAddEditWorkLocationInfoDialog
            // }
          />
          
            <PreSalesTab
              allTableRows={allTableRows}
              totalTableRowsCount={totalTableRowsCount}
              totalPageCount={totalPageCount}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              handleJdDialog={handleJdDialog}
              handleDaysSorting={handleDaysSorting}
              handleDeleteProjectDialog={handleDeleteProjectDialog}
            />
          
          <EditPreSalesProjectInfo
            openEditProjectDialog={openEditProjectDialog}
            handleEditProjectInfoDialog={handleEditProjectInfoDialog}
          />

          <DeletePreSalesProject
            openDeletePreSalesProject={openDeletePreSalesProject}
            handleDeleteProjectDialog={handleDeleteProjectDialog}
          />
          <ViewJobDescription
            openJd={openJd}
            record={jobDescription}
            handleJdDialog={handleJdDialog}
          />
          
        </Box>
        
      
    </Paper>
  );
};

export default PreSales;
