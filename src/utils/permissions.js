import { ALL_PERMISSION_KEYS } from "settings/constants/roles";

import T from "T";
import { store } from "providers/store";
import { get } from "utils/lodash";

export const isHR = (role) => {
  return role === T.HR;
};

export const isPMO = (role) => {
  return role === T.PMO;
};

export const isSuperAdmin = (role) => {
  return role === T.SUPER_ADMIN;
};

const {
  DASHBOARD_VIEW_KEY,
  REPORT_VIEW_KEY,
  REPORT_ADD_KEY,
  REPORT_EDIT_KEY,
  REPORT_DELETE_KEY,
  USER_VIEW_KEY,
  USER_ADD_KEY,
  USER_EDIT_KEY,
  USER_DELETE_KEY,
  ROLE_VIEW_KEY,
  ROLE_ADD_KEY,
  ROLE_EDIT_KEY,
  ROLE_DELETE_KEY,
  NC_VIEW_KEY,
  NC_ADD_KEY,
  NC_EDIT_KEY,
  NC_DELETE_KEY,
  MASTER_SETTINGS_VIEW_KEY,
  MASTER_SETTINGS_ADD_KEY,
  MASTER_SETTINGS_EDIT_KEY,
  MASTER_SETTINGS_DELETE_KEY,
  ACCOUNTING_VIEW_KEY,
  ACCOUNTING_ADD_KEY,
  ACCOUNTING_EDIT_KEY,
  ACCOUNTING_DELETE_KEY,
  PRE_SALES_VIEW_KEY,
  PRE_SALES_ADD_KEY,
  PRE_SALES_EDIT_KEY,
  PRE_SALES_DELETE_KEY,
} = ALL_PERMISSION_KEYS;

export const ACCESSES = () => {
  const state = store.getState();
  return get(state, "LoginSlice.accesses", []);
};

export const hasViewPermissions = (code) => code.includes("view");

export const hasAddPermissions = (code) => code.includes("add");

export const hasEditPermissions = (code) => code.includes("edit");

export const hasDeletePermissions = (code) => code.includes("delete");

export const canViewDashboard = () =>
  hasViewPermissions(DASHBOARD_VIEW_KEY) &&
  ACCESSES().includes(DASHBOARD_VIEW_KEY);

export const canViewReport = () =>
  hasViewPermissions(REPORT_VIEW_KEY) && ACCESSES().includes(REPORT_VIEW_KEY);

export const canAddReport = () =>
  hasAddPermissions(REPORT_ADD_KEY) && ACCESSES().includes(REPORT_ADD_KEY);

export const canEditReport = () =>
  hasEditPermissions(REPORT_EDIT_KEY) && ACCESSES().includes(REPORT_EDIT_KEY);

export const canDeleteReport = () =>
  hasDeletePermissions(REPORT_DELETE_KEY) &&
  ACCESSES().includes(REPORT_DELETE_KEY);

export const canViewUser = () =>
  hasViewPermissions(USER_VIEW_KEY) && ACCESSES().includes(USER_VIEW_KEY);

export const canAddUser = () =>
  hasAddPermissions(USER_ADD_KEY) && ACCESSES().includes(USER_ADD_KEY);

export const canEditUser = () =>
  hasEditPermissions(USER_EDIT_KEY) && ACCESSES().includes(USER_EDIT_KEY);

export const canDeleteUser = () =>
  hasDeletePermissions(USER_DELETE_KEY) && ACCESSES().includes(USER_DELETE_KEY);

export const canViewRole = () =>
  hasViewPermissions(ROLE_VIEW_KEY) && ACCESSES().includes(ROLE_VIEW_KEY);

export const canAddRole = () =>
  hasAddPermissions(ROLE_ADD_KEY) && ACCESSES().includes(ROLE_ADD_KEY);

export const canEditRole = () =>
  hasEditPermissions(ROLE_EDIT_KEY) && ACCESSES().includes(ROLE_EDIT_KEY);

export const canDeleteRole = () =>
  hasDeletePermissions(ROLE_DELETE_KEY) && ACCESSES().includes(ROLE_DELETE_KEY);

export const canViewNC = () =>
  hasViewPermissions(NC_VIEW_KEY) && ACCESSES().includes(NC_VIEW_KEY);

export const canAddNC = () =>
  hasAddPermissions(NC_ADD_KEY) && ACCESSES().includes(NC_ADD_KEY);

export const canEditNC = () =>
  hasEditPermissions(NC_EDIT_KEY) && ACCESSES().includes(NC_EDIT_KEY);

export const canDeleteNC = () =>
  hasDeletePermissions(NC_DELETE_KEY) && ACCESSES().includes(NC_DELETE_KEY);

export const canViewMasterSettings = () =>
  hasViewPermissions(MASTER_SETTINGS_VIEW_KEY) &&
  ACCESSES().includes(MASTER_SETTINGS_VIEW_KEY);

export const canAddMasterSettings = () =>
  hasAddPermissions(MASTER_SETTINGS_ADD_KEY) &&
  ACCESSES().includes(MASTER_SETTINGS_ADD_KEY);

export const canEditMasterSettings = () =>
  hasEditPermissions(MASTER_SETTINGS_EDIT_KEY) &&
  ACCESSES().includes(MASTER_SETTINGS_EDIT_KEY);

export const canDeleteMasterSettings = () =>
  hasDeletePermissions(MASTER_SETTINGS_DELETE_KEY) &&
  ACCESSES().includes(MASTER_SETTINGS_DELETE_KEY);

  
export const canViewAccounting = () =>
  hasViewPermissions(ACCOUNTING_VIEW_KEY) &&
  ACCESSES().includes(ACCOUNTING_VIEW_KEY);

export const canAddAccounting = () =>
  hasAddPermissions(ACCOUNTING_ADD_KEY) &&
  ACCESSES().includes(ACCOUNTING_ADD_KEY);

export const canEditAccounting = () =>
  hasEditPermissions(ACCOUNTING_EDIT_KEY) &&
  ACCESSES().includes(ACCOUNTING_EDIT_KEY);

export const canDeleteAccounting = () =>
  hasDeletePermissions(ACCOUNTING_DELETE_KEY) &&
  ACCESSES().includes(ACCOUNTING_DELETE_KEY);


export const canViewPreSales = () =>
  hasViewPermissions(PRE_SALES_VIEW_KEY) &&
  ACCESSES().includes(PRE_SALES_VIEW_KEY);

export const canAddPreSales = () =>
  hasAddPermissions(PRE_SALES_ADD_KEY) &&
  ACCESSES().includes(PRE_SALES_ADD_KEY);

export const canEditPreSales = () =>
  hasEditPermissions(PRE_SALES_EDIT_KEY) &&
  ACCESSES().includes(PRE_SALES_EDIT_KEY);

export const canDeletePreSales = () =>
  hasDeletePermissions(PRE_SALES_DELETE_KEY) &&
  ACCESSES().includes(PRE_SALES_DELETE_KEY);
