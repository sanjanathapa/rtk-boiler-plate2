import React from "react";
import { Paper, Box, styled } from "@mui/material";

import DashboardInfo from "components/Dashboard/DashboardInfo";
import DashboardDetails from "components/Dashboard/DashboardDetails";

const StyledPaper = styled(Paper)(() => ({
  borderRadius: 5,
  padding: 5,
  overflowY: "auto",
}));

const Dashboard = () => {
  return (
    <Box>
      <StyledPaper>
        <DashboardInfo />
      </StyledPaper>

      <StyledPaper sx={{ mt: 2, maxHeight: "calc(100vh - 380px)" }}>
        <DashboardDetails />
      </StyledPaper>
    </Box>
  );
};
export default Dashboard;
