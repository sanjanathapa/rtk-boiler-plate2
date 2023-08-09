import React, { useEffect } from "react";
import { Typography, Divider, Grid, Card, styled, Box, Button, Badge } from "@mui/material";
import { get } from "lodash";

import T from "T";
import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";
import ExpiringProjects from "assets/DashboardAssets/ExpiringProjects.png";
import MembersRamped from "assets/DashboardAssets/MembersRamped.png";
import NewProjects from "assets/DashboardAssets/NewProjects.png";
import OnBench from "assets/DashboardAssets/OnBench.png";
import MembersJoining from "assets/DashboardAssets/MembersJoining.png";
import MembersGettingRelieved from "assets/DashboardAssets/MembersGettingRelieved.png";
import PendingTaskButton from "assets/DashboardAssets/PendingTaskButton.png";
import { useLazyGetDashboardCountViewQuery } from "api/Dashboard/dashboardCountView";
import { Stack } from "@mui/system";

const StyledTypography = styled(Typography)(() => ({
  fontSize: 13,
  margin: "3px auto",
  wordWrap: "break-word",
  textAlign: "center",
  maxWidth: 175,
}));

const DashboardInfo = () => {
  const [getDashboardCountView,{data:dashboardCount}] = useLazyGetDashboardCountViewQuery();
  const records= get(dashboardCount,"results","");
  useEffect(()=>{
      getDashboardCountView()    
  },[])
  
  const coloredCard = (val) => {
    return (
      <Card
        sx={{
          background: NETSMARTZ_THEME_COLOR,
          height: "45%",
          width: "35%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          boxShadow: "3px 3px 3px #a9a9a9"
        }}
      >
        <Typography variant="h5" color={BACKGROUND.white} margin="auto">
          {val}
        </Typography>
      </Card>
    );
  };

  const getImg = (img) => {
    return (
      <Box
        component="img"
        src={img}
        margin="auto"
        alignItems="center"
        display="flex"
        width={40}
        height={40}
      />
    );
  };
  const pendingTaskButton = (
    <Box
      component="img"
      src={PendingTaskButton}
      margin="auto"
      alignItems="center"
      display="flex"
      width={200}
      height={50}
      cursor="pointer"
      marginRight={0}
      sx={{cursor:"pointer"}}
      />
  )

  return (
    <Box p="10px 20px">
      <Typography variant="h6" fontWeight={600} mb={1}>
            {T.DASHBOARD_VIEW}
      </Typography>
      {/* <Stack sx={{display:"inlineFlex",alignItems:"center",justifyContent:"space-between",mb:1}} >
          <Typography variant="h6" fontWeight={600} mb={1}>
            {T.DASHBOARD_VIEW}
          </Typography>
          <Badge badgeContent={3} color="warning">
            {pendingTaskButton}
          </Badge>
      </Stack> */}
      <Divider />
      <Grid container p={3} spacing={3}>
        <Grid item md={2} xs={12}>
          {getImg(ExpiringProjects)}
          <StyledTypography>{T.EXPIRING_PROJECTS}</StyledTypography>
          {coloredCard(get(records,"expiringProjects",""))}
        </Grid>
        <Grid item md={2} xs={12}>
          {getImg(MembersRamped)}
          <StyledTypography>{T.RAMPED_DOWN_MEMBERS}</StyledTypography>
          {coloredCard(get(records,"rampedDown",""))}
        </Grid>
        <Grid item md={2} xs={12}>
          {getImg(NewProjects)}
          <StyledTypography>{T.NEW_PROJECTS_NUMBERS}</StyledTypography>
          {coloredCard(get(records,"newProjects",""))}
        </Grid>
        <Grid item md={2} xs={12}>
          {getImg(OnBench)}
          <StyledTypography>{T.ON_BENCH_NUMBERS}</StyledTypography>
          {coloredCard(get(records,"onBench",""))}
        </Grid>
        <Grid item md={2} xs={12}>
          {getImg(MembersJoining)}
          <StyledTypography>{T.MEMBERS_JOINING_THIS_MONTH}</StyledTypography>
          {coloredCard(get(records,"newJoining",""))}
        </Grid>
        <Grid item md={2} xs={12}>
          {getImg(MembersGettingRelieved)}
          <StyledTypography>{T.MEMBERS_RELIEVING}</StyledTypography>
          {coloredCard(get(records,"relieving",""))}
        </Grid>
      </Grid>
    </Box>
  );
};
export default DashboardInfo;
