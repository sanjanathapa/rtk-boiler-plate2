import React, { Children } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import {
  Card,
  Box,
  Typography,
  Button,
  Tab,
  Switch,
  styled,
  Divider,
} from "@mui/material";

import { TabContext, TabList, TabPanel } from "@mui/lab";

import AddIcon from "@mui/icons-material/Add";

import { get } from "utils/lodash";

import SearchBar from "./SearchBar";

import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";

import T from "T";
import { canAddRole } from "utils/permissions";

export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "capitalize",
  fontWeight: 600,
  alignItems: "center",
  justifyContent: "space-between",
  color: theme.palette.background.black,
  minHeight: "unset",
  borderTop: `1px solid ${theme.palette.border.tabsGrey}`,
}));

const LeftPanel = ({
  roles = [],
  value = "1",
  searchInput = "",
  showOptions = false,
  showCancelIcon = false,
  handleStatus = noop,
  handleChange = noop,
  handleClick = noop,
  handleReset = noop,
  handleSearchClick = noop,
  handleSearchOptionClick = noop,
  handleSearchChange = noop,
  resetSearch = noop,
  handleClickOutside = noop,
}) => {
  return (
    <Card sx={{ bgcolor: "background.card" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p="8px 16px"
        bgcolor={NETSMARTZ_THEME_COLOR}
      >
        <Typography variant="body1" color="background.white">
          {T.ROLES}
        </Typography>

        {canAddRole() && (
          <Button
            variant="outlines"
            size="small"
            startIcon={<AddIcon />}
            sx={{
              color: "background.white",
              borderColor: "background.white",
              border: "1px solid",
              p: "2px 10px",
            }}
            onClick={handleClick}
          >
            {T.ROLES}
          </Button>
        )}
      </Box>

      <Box p="12px 16px">
        {/* <SearchBar
          roles={roles}
          searchInput={searchInput}
          showOptions={showOptions}
          showCancelIcon={showCancelIcon}
          handleReset={handleReset}
          handleSearchClick={handleSearchClick}
          handleSearchOptionClick={handleSearchOptionClick}
          handleSearchChange={handleSearchChange}
          handleClickOutside={handleClickOutside}
        /> */}
      </Box>

      <Box>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            orientation="vertical"
            sx={{
              "& .MuiTab-labelIcon.Mui-selected": {
                color: BACKGROUND.black,
              },
              "& .MuiTabs-indicator": {
                left: 0,
                backgroundColor: NETSMARTZ_THEME_COLOR,
              },
            }}
          >
            {Children.toArray(
              roles.map((role, index) => {
                return (
                  <StyledTab
                    label={get(role, "roleName", "")}
                    value={`${index + 1}`}
                    iconPosition="end"
                    icon={
                      <Switch
                        color="warning"
                        checked={get(role, "status", false)}
                        onChange={(e) => handleStatus(e, role)}
                      />
                    }
                  />
                );
              })
            )}
            <Divider />
          </TabList>
        </TabContext>
      </Box>
    </Card>
  );
};

LeftPanel.propTypes = {
  roles: PropTypes.array,
  value: PropTypes.string,
  searchInput: PropTypes.string,
  showOptions: PropTypes.bool,
  showCancelIcon: PropTypes.bool,
  handleStatus: PropTypes.func,
  handleClick: PropTypes.func,
  handleChange: PropTypes.func,
  handleReset: PropTypes.func,
  handleSearchOptionClick: PropTypes.func,
  handleSearchClick: PropTypes.func,
  handleSearchChange: PropTypes.func,
  resetSearch: PropTypes.func,
  handleClickOutside: PropTypes.func,
};

export default LeftPanel;
