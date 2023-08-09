import React, { Children } from "react";

import { useLocation } from "react-router-dom";
import { Box, Tabs } from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuIcon from "@mui/icons-material/Menu";

import HeaderLogo from "assets/Header.png";
import ProfileLogo from "assets/ProfileLogo.png";

import { getAllMenuItems } from "./menuItems";
import MenuButton from "./MenuButton";
import NavItem from "./NavItem";
import T from "T";
import { MISCurrentUser } from "utils/validations";
import { get } from "lodash";

const NavigationMenu = () => {
  const location = useLocation();
  const { pathname } = location;

  const getCurrentActiveTab = (childList) => {
    if (!childList) return;
    if (pathname.includes("edit")) {
      const editPath = pathname.split("/");
      editPath.pop();
      const remainedPath = editPath.join("/");

      return childList
        .map((data) => data.includes(remainedPath))
        .includes(true);
    }

    return childList.includes(pathname);
  };
  const {user}= MISCurrentUser();
  const userName =get(user,"username","")
  
  const menuItems = getAllMenuItems();
  
  const activeIndex = menuItems.findIndex(
    ({ childList }) => childList && childList.includes(pathname)
  );

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box component="img" src={HeaderLogo} pl={1.5} width={156} height={52} />
      <Box
        justifyContent="center"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "none", md: "flex" } }}
      >
        <Tabs
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "background.white",
            },
          }}
          value={activeIndex}
        >
          {
            (userName==="nishu.garg@netsmartz.com" || userName==="nidhi.singla@netsmartz.com" ||
            userName==="rahul.miglani@netsmartz.com" || userName==="nishant.sharma@netsmartz.net" ||
            userName==="dinesh.reddy@netsmartz.net" || userName==="surinderpal.singh@netsmartz.net" ||
            userName==="mohit.thapa@netsmartz.net" || userName==="abul.ala@netsmartz.net"||
            userName==="himmat.pratap@netsmartz.com" || userName==="anup@netsmartz.com")?
            Children.toArray(
              menuItems
                .filter((item, index) => index < 6)
                .map((menuItem, index) => {
                  const isActive = getCurrentActiveTab(menuItem.childList);
                  const { title, route, icon, permission } = menuItem;
                  if (!permission) return false;
  
                  return (
                    <NavItem
                      isActive={isActive}
                      icon={icon}
                      label={title}
                      to={route}
                      index={index}
                    />
                  );
                })
            ):
            Children.toArray(
              menuItems.filter(item=>(item.title!==T.PRE_SALES))
                .filter((item, index) => index < 5)
                .map((menuItem, index) => {
                  const isActive = getCurrentActiveTab(menuItem.childList);
                  const { title, route, icon, permission } = menuItem;
                  if (!permission) return false;
  
                  return (
                    <NavItem
                      isActive={isActive}
                      icon={icon}
                      label={title}
                      to={route}
                      index={index}
                    />
                  );
                })
            )

          }
        </Tabs>
      </Box>

      <Box
        justifyContent="end"
        sx={{ flexGrow: 1, display: { xs: "flex", sm: "flex", md: "none" } }}
      >
        <MenuButton
          iconType={<MenuIcon />}
          items={menuItems.filter((item, index) => index < 9)}
        />
      </Box>

      <Box
        display="flex"
        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
      >
        <MenuButton
          iconType={<MoreHorizIcon />}
          items={menuItems.filter((item, index) => index > 8)}
        />
        <MenuButton
          iconType={
            <Box component="img" src={ProfileLogo} width={20} height={20} />
          }
          items={menuItems.filter((item, index) => index > 5 && index < 9)}
          isHandleLogout
        />
      </Box>
    </Box>
  );
};

export default NavigationMenu;
