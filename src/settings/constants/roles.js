import T from "T";

export const VIEW_PERMISSION = "view";
export const ADD_PERMISSION = "add";
export const EDIT_PERMISSION = "edit";
export const DELETE_PERMISSION = "delete";

const {
  DASHBOARD,
  REPORTS,
  MEMBERS,
  NON_COMPLIANCE,
  ROLES,
  MASTER_SETTINGS,
  ACCOUNTING,
  PRE_SALES,
  ACCOUNTANT,
  PERMISSIONS,
  VIEW,
  ADD,
  EDIT,
  DELETE,
} = T;

export const ALL_PERMISSION_KEYS = {
  DASHBOARD_VIEW_KEY: "dashboard_view",
  REPORT_VIEW_KEY: "report_view",
  REPORT_ADD_KEY: "report_add",
  REPORT_EDIT_KEY: "report_edit",
  REPORT_DELETE_KEY: "report_delete",
  USER_VIEW_KEY: "user_view",
  USER_ADD_KEY: "user_add",
  USER_EDIT_KEY: "user_edit",
  USER_DELETE_KEY: "user_delete",
  ROLE_VIEW_KEY: "role_view",
  ROLE_ADD_KEY: "role_add",
  ROLE_EDIT_KEY: "role_edit",
  ROLE_DELETE_KEY: "role_delete",
  NC_VIEW_KEY: "nc_view",
  NC_ADD_KEY: "nc_add",
  NC_EDIT_KEY: "nc_edit",
  NC_DELETE_KEY: "nc_delete",
  MASTER_SETTINGS_VIEW_KEY: 'master_view',
  MASTER_SETTINGS_ADD_KEY: 'master_add',
  MASTER_SETTINGS_EDIT_KEY: 'master_edit',
  MASTER_SETTINGS_DELETE_KEY: 'master_delete',
  ACCOUNTING_VIEW_KEY: 'accounting_view',
  ACCOUNTING_EDIT_KEY: 'accounting_edit',
  ACCOUNTING_ADD_KEY: 'accounting_add',
  ACCOUNTING_DELETE_KEY: 'accounting_delete',
  PRE_SALES_VIEW_KEY: 'pre_sales_view',
  PRE_SALES_EDIT_KEY: 'pre_sales_edit',
  PRE_SALES_ADD_KEY: 'pre_sales_add',
  PRE_SALES_DELETE_KEY: 'pre_sales_delete',
};

export const ROLES_MAPPING = {
  [DASHBOARD]: "dashboard",
  [REPORTS]: "report",
  [MEMBERS]: "user",
  [NON_COMPLIANCE]: "nc",
  [ROLES]: "role",
  [MASTER_SETTINGS]: "master",
  [ACCOUNTING]: "accounting",
  [PRE_SALES]: "pre_sales",
};

export const ROLES_PERMISSIONS = {
  [DASHBOARD]: [VIEW_PERMISSION],
  [REPORTS]: [
    VIEW_PERMISSION,
    ADD_PERMISSION,
    EDIT_PERMISSION,
    DELETE_PERMISSION,
  ],
  [MEMBERS]: [
    VIEW_PERMISSION,
    ADD_PERMISSION,
    EDIT_PERMISSION,
    DELETE_PERMISSION,
  ],
  [NON_COMPLIANCE]: [
    VIEW_PERMISSION,
    ADD_PERMISSION,
    EDIT_PERMISSION,
    DELETE_PERMISSION,
  ],
  [ROLES]: [
    VIEW_PERMISSION,
    ADD_PERMISSION,
    EDIT_PERMISSION,
    DELETE_PERMISSION,
  ],
  [MASTER_SETTINGS]: [
    VIEW_PERMISSION,
    ADD_PERMISSION,
    EDIT_PERMISSION,
    DELETE_PERMISSION,
  ],
  [ACCOUNTING]: [
    VIEW_PERMISSION,
    ADD_PERMISSION,
    EDIT_PERMISSION,
    DELETE_PERMISSION,
  ],
  [PRE_SALES]: [
    VIEW_PERMISSION,
    ADD_PERMISSION,
    EDIT_PERMISSION,
    DELETE_PERMISSION,
  ],
};

export const TABLE_HEADER_VALUES = [PERMISSIONS, VIEW, ADD, EDIT, DELETE];
