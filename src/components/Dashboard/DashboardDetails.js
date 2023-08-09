import React from "react";
import { Typography, Grid, Card, styled, Box } from "@mui/material";
import { BACKGROUND } from "theme/colors";

import T from "T";
import TeamDivTechStack from "assets/DashboardAssets/TeamDivTechStack.png";
import TeamDivWorkModes from "assets/DashboardAssets/TeamDivWorkModes.png";
import ExpProjects from "assets/DashboardAssets/ExpProjects.png";
import NewProjectsThisMonth from "assets/DashboardAssets/NewProjectsThisMonth.png";
import MemberRampedTechStack from "assets/DashboardAssets/MemberRampedTechStack.png";
import NewJoinersTechStack from "assets/DashboardAssets/NewJoinersTechStack.png";
import OnBenchTechStack from "assets/DashboardAssets/OnBenchTechStack.png";
import OnBenchPerManager from "assets/DashboardAssets/OnBenchPerManager.png";
import RelievedMembers from "assets/DashboardAssets/RelievedMembers.png";
import NCsPerManager from "assets/DashboardAssets/NCsPerManager.png";
import { ON_BENCH_MEMBERS_PER_TECH_STACK_LINK } from "./DashboardLinks";
import { Link } from "react-router-dom";


const StyledTypography = styled(Typography)(() => ({
  fontSize: 13,
  margin: "3px auto",
  wordWrap: "break-word",
  textAlign: "center",
  maxWidth: 172,
}));

const DashboardDetails = () => {
  const getImg = (img) => {
    return (
      <Card
        variant="outlined"
        sx={{
          background: BACKGROUND.card,
          height: "70%",
          width: "40%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px"
        }}
      >
        <Box
          component="img"
          src={img}
          margin="auto"
          alignItems="center"
          display="flex"
          width={60}
        />
      </Card>
    );
  };

  return (
    <Grid container p={2}>
        <Grid item md={2.4} xs={12} 
          sx={{cursor:"pointer"}}
          >
          <a href={ON_BENCH_MEMBERS_PER_TECH_STACK_LINK} target="_blank" rel="noreferrer" style={{textDecoration:"none", color:"black"}}>
            {getImg(OnBenchTechStack)}
            <StyledTypography>{T.ON_BENCH_MEMBERS_PER_TECH_STACK}</StyledTypography>
          </a>
        </Grid>
      <Grid item md={2.4} xs={12} sx={{opacity:"0.5"}} >
        {getImg(TeamDivTechStack)}
        <StyledTypography>{T.TEAM_DIVISION_TECH_MSG}</StyledTypography>
      </Grid>
      <Grid item md={2.4} xs={12} sx={{opacity:"0.5"}} >
        {getImg(TeamDivWorkModes)}
        <StyledTypography>{T.TEAM_DIVISION_MODE_MSG}</StyledTypography>
      </Grid>
      <Grid item md={2.4} xs={12} sx={{opacity:"0.5"}} >
        {getImg(ExpProjects)}
        <StyledTypography>{T.EXPIRING_PROJECTS_THIS_MONTH}</StyledTypography>
      </Grid>
      <Grid item md={2.4} xs={12} sx={{opacity:"0.5"}} >
        {getImg(NewProjectsThisMonth)}
        <StyledTypography>{T.NEW_PROJECTS_THIS_MONTH}</StyledTypography>
      </Grid>
      <Grid item md={2.4} xs={12} mt={4} sx={{opacity:"0.5"}} >
        {getImg(MemberRampedTechStack)}
        <StyledTypography>
          {T.RAMPED_DOWN_MEMBERS_BASED_ON_STACK}
        </StyledTypography>
      </Grid>
      <Grid item md={2.4} xs={12} mt={4} sx={{opacity:"0.5"}} >
        {getImg(NewJoinersTechStack)}
        <StyledTypography>{T.NEW_JOINERS_MSG}</StyledTypography>
      </Grid>
      <Grid item md={2.4} xs={12} mt={4} sx={{opacity:"0.5"}} >
        {getImg(OnBenchPerManager)}
        <StyledTypography>{T.ON_BENCH_MEMBERS_PER_MANAGER}</StyledTypography>
      </Grid>
      <Grid item md={2.4} xs={12} mt={4} sx={{opacity:"0.5"}} >
        {getImg(RelievedMembers)}
        <StyledTypography>
          {T.MEMBERS_GETTING_RELIEVED_THIS_MONTH}
        </StyledTypography>
      </Grid>
      <Grid item md={2.4} xs={12} mt={4} sx={{opacity:"0.5"}} >
        {getImg(NCsPerManager)}
        <StyledTypography>{T.NC_PER_MANAGER}</StyledTypography>
      </Grid>
    </Grid>
  );
};
export default DashboardDetails;
