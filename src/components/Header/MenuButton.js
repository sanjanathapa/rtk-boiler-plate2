import React, { useState } from "react";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import { NETSMARTZ_THEME_COLOR, BACKGROUND } from "theme/colors";

import { handleLogout } from "utils/logout";
import T from "T";

const MenuButton = ({
  iconType = "",
  items = [],
  handleAssignDialog = noop,
  handleDeactivateDialog = noop,
  handleRevokeResignationDialog = noop,
  handleDeleteUserDialog = noop,
  handleRemoveRoleDialog = noop,
  id = "",
  isHandleLogout = false,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (title, route) => {
    handleCloseNavMenu();
    switch (title) {
      case T.LOGOUT:
        return handleLogout();
      case T.ASSIGN_ROLE:
        return handleAssignDialog();
      case T.DEACTIVATE:
        return handleDeactivateDialog();
      case T.REVOKE:
        return handleRevokeResignationDialog();
      case T.DELETE:
        return handleDeleteUserDialog();
      case T.REMOVE_ROLE:
        return handleRemoveRoleDialog();
      default:
        return id ? navigate(route.replace(":id", id)) : navigate(route);
    }
  };

  const Wrapper = iconType;

  return (
    <Box>
      <IconButton
        aria-label="account"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
      >
        {Wrapper}
      </IconButton>
      <Menu
        sx={{
          zIndex: theme.zIndex.modal + 3,
          "& .MuiMenu-list": {
            pt: 0,
            pb: 0,
            minWidth: 150,
          },

          "& .MuiMenuItem-root": {
            "&:hover": {
              backgroundColor: NETSMARTZ_THEME_COLOR,
              color: BACKGROUND.white,

              img: {
                filter:
                  "invert(100%) sepia(0%) saturate(0%) hue-rotate(254deg) brightness(106%) contrast(101%)",
              },
            },
          },
        }}
        id="menu-appbar"
        anchorEl={anchorElNav}
        open={Boolean(anchorElNav)}
        keepMounted
        onClose={handleCloseNavMenu}
      >
        {items.map(({ icon, title, permission, route }, i) => {
          if (!permission) return false;
          return (
            <MenuItem
              divider={i < items.length - 1}
              key={title}
              sx={{ pl: 2 }}
              onClick={() => handleNavigate(title, route)}
            >
              {icon && (
                <Box
                  component="img"
                  src={icon}
                  margin="auto 0px"
                  pl={1}
                  pr={1}
                  width={18}
                  height={18}
                />
              )}

              <Typography variant="subtitle1">{title}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

MenuButton.propTypes = {
  iconType: PropTypes.object,
  items: PropTypes.array,
  isHandleLogout: PropTypes.bool,
  id: PropTypes.number,
  handleAssignDialog: PropTypes.func,
  handleDeactivateDialog: PropTypes.func,
  handleRevokeResignationDialog: PropTypes.func,
  handleDeleteUserDialog: PropTypes.func,
  handleRemoveRoleDialog: PropTypes.func,
};

export default MenuButton;
