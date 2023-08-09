import React from "react";

import { Typography, Box } from "@mui/material";
import T from "T";

const ProfilePage = () => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h4">{`${T.PROFILE} ${T.PAGE}`}</Typography>
    </Box>
  );
};

export default ProfilePage;
