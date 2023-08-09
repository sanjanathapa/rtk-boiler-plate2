import React from "react";
import PropTypes from "prop-types";

import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

import Header from "components/Header/index.js";

import { getPageTitle } from "utils/seo";
import { MISCurrentUser } from "utils/validations";

import { TOAST_DISMISS_TIMEOUT } from "settings/constants/toast";

import T from "T";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";
import { Typography } from "@mui/material";

const MainContainer = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const { sessionToken } = MISCurrentUser();

  return (
    <>
      <Helmet>
        <title>{getPageTitle(pathname)}</title>
      </Helmet>

      {sessionToken && <Header />}

      {children}

      <ToastContainer
        position="top-center"
        autoClose={TOAST_DISMISS_TIMEOUT}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        transition={Zoom}
        theme="colored"
      />
      {MISCurrentUser() && (
        <Box
          position="fixed"
          bottom={0}
          p={1}
          right={0}
          left="auto"
          width="100%"
          bgcolor={BACKGROUND.white}
          textAlign="center"
        >
          <Typography variant="subtitle2" color={NETSMARTZ_THEME_COLOR}>
            {T.FOOTER_TEXT}
          </Typography>
        </Box>
      )}
    </>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContainer;
