import React from "react";
import { Tab, Icon, styled, useMediaQuery, Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { BACKGROUND } from "theme/colors";

const NavIcon = ({ icon, isActive }) => (
  <Icon
    sx={{
      display: "flex",
      height: "inherit",
      width: "inherit",
      mr: 1,
      mb: 0.6,
      filter: isActive
        ? "invert(50%) sepia(94%) saturate(887%) hue-rotate(348deg) brightness(101%) contrast(92%)"
        : BACKGROUND.black,
    }}
  >
    <Box
      component="img"
      src={icon}
      margin="auto"
      pl={1}
      width={20}
      height={20}
    />
  </Icon>
);

const StyledTab = styled(Tab)(({ theme, isactive }) => ({
  textTransform: "capitalize",
  display: "block",
  color: isactive === "true" ? theme.palette.themeColor : theme.palette.background.black,
  fontSize: "14px",
  padding: 1.5,
  minHeight: "unset",
  opacity: 1,
}));

const NavItem = ({ label, icon, to, isActive = false, index }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.only("md"));

  return (
    <StyledTab
      isactive={isActive.toString()}
      iconPosition={!isTablet ? "start" : "top"}
      icon={<NavIcon icon={icon} isActive={isActive} />}
      component={Link}
      label={!isTablet && label}
      to={to}
      value={index}
    />
  );
};

NavItem.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.string,
  isActive: PropTypes.bool,
  index: PropTypes.number,
};

export default NavItem;
