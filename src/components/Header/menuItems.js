import allRoutes from "router/routes";

import Dashboard from "assets/Dashboard.png";
import Reports from "assets/Reports.png";
import Users from "assets/Users.png";
import NonCompliance from "assets/NonCompliance.png";
import Roles from "assets/Roles.png";
import Profile from "assets/Profile.png";
import MasterSettings from 'assets/MasterSettings.png'
import ChangePassword from "assets/ChangePassword.png";
import PreSales from "assets/PreSales.png";
import Logout from "assets/Logout.png";

import T from "T";

import {
  canViewDashboard,
  canViewReport,
  canViewUser,
  canViewNC,
  canViewRole,
  canViewMasterSettings,
  canViewPreSales,
} from "utils/permissions";

const {
  DASHBOARD,
  REPORTS,
  MEMBERS,
  NON_COMPLIANCE,
  ROLE,
  MASTER_SETTINGS,
  PRE_SALES,
  PROFILE,
  CHANGE_PWD,
  LOGOUT,
} = T;

const { app } = allRoutes;
const {
  dashboard,
  reports,
  members,
  addMembers,
  editMembers,
  viewMembers,
  nonCompliance,
  roles,
  addRoles,
  editRoles,
  masterSettings,
  preSales,
  createNewProject,
  editPreSalesProject,
  recommendedMembers,
  profile,
  changePwd,
  test,
} = app;

export const getAllMenuItems = () => {
  return [
    {
      title: DASHBOARD,
      route: dashboard,
      icon: Dashboard,
      permission: canViewDashboard(),
      childList: [dashboard],
    },
    // {
    //   title: REPORTS,
    //   route: reports,
    //   icon: Reports,
    //   permission: canViewReport(),
    //   childList: [reports],
    // },
    {
      title: MEMBERS,
      route: members,
      icon: Users,
      permission: canViewUser(),
      childList: [members, addMembers, editMembers, viewMembers],
    },
    {
      title: NON_COMPLIANCE,
      route: nonCompliance,
      icon: NonCompliance,
      permission: canViewNC(),
      childList: [nonCompliance],
    },
    {
      title: `${ROLE}s`,
      route: roles,
      icon: Roles,
      permission: canViewRole(),
      childList: [roles, addRoles, editRoles],
    },
    {
      title: MASTER_SETTINGS,
      route: masterSettings,
      icon: MasterSettings,
      permission: canViewMasterSettings(),
      childList: [masterSettings],
    },
    {
      title: PRE_SALES,
      route: preSales,
      icon: PreSales,
      permission: canViewPreSales(),
      childList: [preSales,createNewProject,editPreSalesProject,recommendedMembers],
    },
    {
      title: PROFILE,
      route: profile,
      icon: Profile,
      permission: true,
      childList: [profile],
    },
    {
      title: CHANGE_PWD,
      route: changePwd,
      icon: ChangePassword,
      permission: true,
      childList: [changePwd],
    },
    {
      title: LOGOUT,
      icon: Logout,
      permission: true,
    },
    {
      title: "Test",
      route: test,
      permission: true,
    },
  ];
};
