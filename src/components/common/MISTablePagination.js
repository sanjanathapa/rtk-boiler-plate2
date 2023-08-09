import { TablePagination, styled } from "@mui/material";

const MISTablePagination = styled(TablePagination)(({ theme }) => ({
  "& .MuiInputBase-root": {
    order: 3,
    background: theme.palette.themeColor,
    color: theme.palette.background.white,
    svg: {
      path: {
        fill: theme.palette.background.white,
      },
    },
    border: "1px solid #dedfe2",
    borderRadius: 4,
  },
  "& .MuiTablePagination-toolbar": {
    minHeight: 48,
  },
  "& .MuiToolbar-gutters": {
    paddingLeft: 0,
  },
  "& .MuiTablePagination-displayedRows": {
    fontWeight: "500",
    order: 1,
    marginRight: 16,
    fontSize: 14,
  },
  "& .MuiSelect-select:focus": {
    backgroundColor: "rgba(0,0,0,0)",
  },
  "& .MuiTablePagination-selectLabel": {
    order: 2,
    marginRight: 8,
    fontSize: 14,
  },

  "& .MuiTablePagination-actions": {
    display: "none",
  },
}));

export default MISTablePagination;
