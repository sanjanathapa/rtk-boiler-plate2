import React, { Children } from "react";

import { Box, Grid, Typography } from "@mui/material";

import NetsmartzLogo from "assets/NetsmartzLogo.png";
import LoginImage from "assets/LoginImage.png";
import LoginImage2 from "assets/LoginImage-2.png";

import ChangePwdForm from "components/ChangePwdForm";
import MISCarousel from "components/common/MISCarousel";
import { CHANGE_PWD_CAROUSAL_DATA } from "settings/constants/auth";
import { GET_SIZE } from "utils/responsive";

const ChangePassword = () => {
  const { isXs } = GET_SIZE();
  return (
    <Grid container p="6px 32px">
      <Grid
        item
        xs={12}
        sm={9}
        display={isXs ? "block" : "grid"}
        minWidth={isXs ? "100%" : "auto"}
        textAlign="center"
        sx={{
          ".carousel .slide img": {
            maxWidth: "36%",
          },
        }}
      >
        <Box component="img" src={NetsmartzLogo} margin="auto" maxWidth="22%" />

        <MISCarousel>
          {Children.toArray(
            CHANGE_PWD_CAROUSAL_DATA.map((record, index) => (
              <>
                <Box
                  component="img"
                  src={index < 1 ? LoginImage : LoginImage2}
                  mt={3}
                  margin="auto"
                  maxWidth="inherit"
                />
                <Typography variant="h5" fontSize={19}>
                  {record.title}
                </Typography>
                <Typography
                  variant="body1"
                  mt={2}
                  mb={5}
                  p="0 50px"
                  fontSize={14}
                >
                  {record.details}
                </Typography>
              </>
            ))
          )}
        </MISCarousel>
      </Grid>
      <Grid item xs={12} sm={3}>
        <ChangePwdForm />
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
