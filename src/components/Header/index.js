import React from "react";

import { AppBar, Box } from "@mui/material";

import NavigationMenu from "./NavigationMenu";

const Header = () => {
  return (
    <Box display="block" mb={6.5}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "background.white" }}
      >
        <NavigationMenu />
      </AppBar>
    </Box>
  );
};

export default Header;
