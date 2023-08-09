import { Pagination, styled } from "@mui/material";

const MISPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPagination-ul li button": {
    fontSize: 14,
  },
  "& .MuiPagination-ul li button.Mui-selected": {
    background: theme.palette.themeColor,
    color: theme.palette.background.white,
  },
}));

export default MISPagination;
