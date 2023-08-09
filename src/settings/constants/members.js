import T from "T";
import allRoutes from "router/routes";
import {
  canViewRole,
  canEditUser,
  canViewUser,
  canDeleteUser,
} from "utils/permissions";


const {
  PERSONAL_INFO,
  CONTACT_INFO,
  PRIMARY_PROJECT,
  SECONDARY_PROJECT,
  EXPERIENCE,
  TECHNOLOGY,
  CLIENT_PROJECT_MODE,
  AVAILABILITY,
  AVAILABILITY_DATE,
  CLIENT_JIRA,
  INTERNAL_JIRA_EXEMPTION,
  REPORTING_MANAGER,
  ACCOUNT_MANAGER,
  JIRA_NOT_FILLED,
  COMMENTS_MISSING,
  SVN_CHECKIN,
  DELETED,
  SVN,
  LOGGED_HRS,
  FUNCTIONAL_MANAGER,
  TRAINING,
  COMMENTS,
  EMP_MODE,
  S_NO,
  TYPE_OF_NC,
  PROPOSAL_NAME,
  STATUS,
  ASSIGNED_TO,
  BUDGET,
  RECOMMENDATIONS,
  DELETE_PROJECT,
  DATES,
  LEAD_DATE,
  COMPANY_INFO,
  LEAD_INFO,
  DAYS_IN_OPERATION,
  OS_MANAGER,
  REQUIREMENTS,
  NC_MONTH,
  NC_COUNT,
  DELETED_NC_COUNT,
  DATE_OF_NC,
  DELETE_NC,
  NC_STATUS,
  PROJECT_NAME,
  START_DATE,
  END_DATE,
  FEEDBACK,
  PROJECT_MANAGER,
  EDIT_INFO,
  DELETE_PROJECT_INFO,
  TECHNOLOGY_NAME,
  DELETE_TECHNOLOGY,
  WORK_LOCATIONS,
  DELETE_LOCATION,
  DATE,
  EMP_NAME,
  SELECT_ALL,
  EMP_CODE
} = T;

export const COL_KEYS = {
  info: "personalInfo",
  contact: "contactInfo",
  primaryProject: "primaryProject",
  secondaryProject: "secondaryProject",
  experience: "experience",
  workLocation: "workLocation",
  technology: "technology",
  clientProjectMode: "clientProjectMode",
  availability: "availability",
  availabilityDate: "availabilityDate",
  clientJira: "clientJira",
  internalJiraExemption: "internalJiraExemption",
  reportingManager: "reportingManager",
  functionalManager: "functionalManager",
  trainings: "trainings",
  comments: "comments",
  empMode: "empMode",
};

export const TABLE_COLUMNS = [
  {
    position: 0,
    label: PERSONAL_INFO,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.info,
  },
  {
    position: 1,
    label: CONTACT_INFO,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.contact,
  },
  {
    position: 2,
    label: PRIMARY_PROJECT,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.primaryProject,
  },
  {
    position: 3,
    label: SECONDARY_PROJECT,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.secondaryProject,
  },
  {
    position: 4,
    label: EXPERIENCE,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.experience,
  },
  {
    position: 5,
    label: TECHNOLOGY,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.technology,
  },
  {
    position: 6,
    label: CLIENT_PROJECT_MODE,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.clientProjectMode,
  },
  {
    position: 7,
    label: AVAILABILITY,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.availability,
  },
  {
    position: 8,
    label: AVAILABILITY_DATE,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.availabilityDate,
  },
  {
    position: 9,
    label: CLIENT_JIRA,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.clientJira,
  },
  {
    position: 10,
    label: INTERNAL_JIRA_EXEMPTION,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.internalJiraExemption,
  },
  {
    position: 11,
    label: REPORTING_MANAGER,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.reportingManager,
  },
  {
    position: 12,
    label: FUNCTIONAL_MANAGER,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.functionalManager,
  },
  {
    position: 13,
    label: `${TRAINING}s`,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.trainings,
  },
  {
    position: 14,
    label: COMMENTS,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.comments,
  },
  {
    position: 15,
    label: EMP_MODE,
    checked: true,
    locked: false,
    columnKey: COL_KEYS.empMode,
  },
];

const { VIEW, EDIT, DEACTIVATE, ASSIGN_ROLE, REMOVE_ROLE, REVOKE, DELETE } = T;

const { app } = allRoutes;
const { viewMembers, editMembers } = app;

export const getAllTableMenus = () => {
  return [
    {
      title: VIEW,
      route: viewMembers,
      permission: canViewUser(),
    },
    {
      title: EDIT,
      route: editMembers,
      permission: canEditUser(),
    },
    {
      title: DEACTIVATE,
      permission: canEditUser(),
    },
    {
      title: REVOKE,
      permission: canEditUser(),
    },
    {
      title: ASSIGN_ROLE,
      permission: canViewRole(),
    },
    {
      title: REMOVE_ROLE,
      permission: canViewRole(),
    },
    {
      title: DELETE,
      permission: canDeleteUser(),
    },
  ];
};

export const NC_TABLE_HEADER = [NC_MONTH, TYPE_OF_NC, NC_COUNT,DELETED_NC_COUNT];
export const HISTORY_TABLE_HEADER = [
  S_NO,
  PROJECT_NAME,
  START_DATE,
  END_DATE,
  PROJECT_MANAGER,
  FUNCTIONAL_MANAGER,
  FEEDBACK,
];

export const PROJECTS_TABLE_HEADER = [
  { label: S_NO },
  { label: PROJECT_NAME },
  { label: START_DATE },
  { label: END_DATE },
  { label: REPORTING_MANAGER },
  { label: FUNCTIONAL_MANAGER },
  { label: EDIT_INFO, align: "center" },
  { label: DELETE_PROJECT_INFO, align: "center" },
];
export const ACCOUNTS_TABLE_HEADER = [
  { label: S_NO },
  { label: EMP_NAME },
  { label: PROJECT_MANAGER },
  { label: ACCOUNT_MANAGER },
  { label: LOGGED_HRS },
]
export const PRE_SALES_TABLE_HEADER = [
  
  { label: LEAD_DATE },
  { label: LEAD_INFO },
  { label: DAYS_IN_OPERATION ,align: "center"},
  { label: STATUS },
  // { label: PROPOSAL_NAME },
  // { label: START_DATE },
  // { label: END_DATE },
  { label: OS_MANAGER },
  { label: ASSIGNED_TO },
  { label: REQUIREMENTS },
  { label: EDIT_INFO, align: "center" },
  // { label: BUDGET },
  // { label: RECOMMENDATIONS, align: "center" },
  // { label: DELETE_PROJECT, align: "center" }
];

export const TECHNOLOGY_TABLE_HEADER = [
  { label: S_NO },
  { label: TECHNOLOGY_NAME },
  { label: EDIT_INFO, align: "center" },
  { label: DELETE_TECHNOLOGY, align: "center" },
];

export const WORK_LOCATION_TABLE_HEADER = [
  { label: S_NO },
  { label: WORK_LOCATIONS },
  { label: EDIT_INFO, align: "center" },
  { label: DELETE_LOCATION, align: "center" },
];

export const USER_NC_BY_DATE_HEADER = [
  
  { label: S_NO },
  { label: PROJECT_NAME },
  { label: PROJECT_MANAGER },
  { label: FUNCTIONAL_MANAGER },
  { label: LOGGED_HRS, align: "center" },
  
];

export const JIRA_NOT_FILLED_USER_ACTIVE_NC_HEADER = [
  S_NO ,
  DATE_OF_NC ,
  PROJECT_NAME ,
  PROJECT_MANAGER ,
  REPORTING_MANAGER ,
  ACCOUNT_MANAGER ,
  TYPE_OF_NC ,
  LOGGED_HRS
];

export const COMMENTS_MISSING_USER_ACTIVE_NC_HEADER = [
  S_NO ,
  DATE_OF_NC ,
  PROJECT_NAME ,
  PROJECT_MANAGER ,
  REPORTING_MANAGER ,
  ACCOUNT_MANAGER ,
  TYPE_OF_NC ,
];

export const USER_DELETED_NC_HEADER = [
  
  S_NO ,
  DATE_OF_NC ,
  PROJECT_NAME ,
  PROJECT_MANAGER ,
  REPORTING_MANAGER ,
  ACCOUNT_MANAGER ,
  TYPE_OF_NC ,
  COMMENTS ,

];
export const TIME_SHEET_TABLE_HEADER_PM = [
  // { label: S_NO },
  { label: DATE },
  { label: EMP_NAME },
  { label: TYPE_OF_NC },
  // { label: LOGGED_HRS ,align:"center"},
  { label: NC_STATUS},
  { label: COMMENTS},
  { label: DELETE_NC ,align:"center"},
];

export const TIME_SHEET_TABLE_HEADER_FM = [
  // { label: S_NO },
  { label: DATE },
  { label: EMP_NAME },
  { label: TYPE_OF_NC },
  { label: REPORTING_MANAGER },
  // { label: LOGGED_HRS ,align:"center"},
  { label: NC_STATUS},
  { label: COMMENTS},
  { label: DELETE_NC ,align:"center"},
];

export const TIME_SHEET_TABLE_HEADER_PMO = [
  // { label: S_NO },
  { label: DATE },
  { label: EMP_NAME },
  { label: TYPE_OF_NC },
  { label: REPORTING_MANAGER },
  // { label: FUNCTIONAL_MANAGER },
  // { label: LOGGED_HRS ,align:"center"},
  { label: NC_STATUS},
  { label: COMMENTS},
  { label: DELETE_NC ,align:"center"},
];
export const CONSOLIDATED_NC_TABLE_HEADER = [
  // { label: S_NO },
  { label: EMP_NAME },
  { label: EMP_CODE },
  { label: REPORTING_MANAGER },
  { label: JIRA_NOT_FILLED, align:"center"},
  { label: COMMENTS_MISSING, align:"center" },
  { label: SVN_CHECKIN, align:"center" },
  { label: DELETED, align:"center" },
];
export const DELETED_NC_TABLE_HEADER = [
  // { label: S_NO },
  { label: SELECT_ALL },
  { label: DATE },
  { label: EMP_NAME },
  { label: REPORTING_MANAGER },
  { label: FUNCTIONAL_MANAGER },
  { label: TYPE_OF_NC },
  { label: NC_STATUS},
  { label: COMMENTS},
  { label: DELETE_NC, align:"center" },
];
