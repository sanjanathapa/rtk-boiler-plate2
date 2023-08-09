import React, { Children } from "react";

import { Grid, Box, Typography } from "@mui/material";

import NetsmartzLogo from "assets/NetsmartzLogo.png";
import LoginImage from "assets/LoginImage.png";
import LoginImage2 from "assets/LoginImage-2.png";

import ForgotPwdForm from "components/ForgotPwdForm";
import MISCarousel from "components/common/MISCarousel";

import { FORGOT_PWD_CAROUSAL_DATA } from "settings/constants/auth";

import T from "T";
import { GET_SIZE } from "utils/responsive";

const ForgotPassword = () => {
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
            FORGOT_PWD_CAROUSAL_DATA.map((record, index) => (
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
      <Grid item xs={12} sm={3} m="auto">
        <ForgotPwdForm />
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
