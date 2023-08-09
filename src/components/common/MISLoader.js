import React from "react";

import { CircularProgress, Backdrop } from "@mui/material";

import { NETSMARTZ_THEME_COLOR, BACKGROUND } from "theme/colors";

const MISLoader = () => (
  <Backdrop open sx={{ color: BACKGROUND.white, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <CircularProgress sx={{ color: NETSMARTZ_THEME_COLOR }} />
  </Backdrop>
);

export default MISLoader;
