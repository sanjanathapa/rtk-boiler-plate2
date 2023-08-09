import T from "T";

const {
  BYT,
  DEVEOPS,
  FIXED,
  ON_BENCH,
  OPERATIONS,
  PRODUCT,
  T_N_M,
  TRAINING,
  STABLE,
  YET_TO_JOIN,
  RESIGNED,
  SEPARATED,
  RELIEVED,
  CHANDIGARH,
  MOHALI,
  NOIDA,
  GURUGRAM,
  WFO,
  WFH,
  HYBRID,
  SHADOW,
  PARTIAL,
  FULL,
  NO,
  DID_NOT_JOIN,
  ABSCONDED,
  POSITIVE,
  NEGATIVE,
  FEEDBACK,
  CUSTOM,
  DAILY,
  WEEKLY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
  INHOUSE,
  CONSULTANT,
  AUSTRALIA,
  CANADA,
  INDIA,
  SINGAPORE,
  USA,
  NORTH_AMERICAN,
  SOUTH_AMERICAN,
  NORWEGIAN,
  EUROPEAN,
  APAC,
  OTHERS,
  JIRA,
  JIRA_NOT_FILLED,
  SVN,
  COMMENTS_MISSING,
  SVN_CHECKIN,
  JAN, 
  FEB, 
  MAR, 
  APR, 
  MAY, 
  JUN, 
  JUL, 
  AUG, 
  SEP, 
  OCT, 
  NOV, 
  DEC
} = T;
const SELECTED_WORKING_DAYS = [MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY];
const WEEK_DAYS_LIST = [
  {label:MONDAY,check:false},
  {label:TUESDAY,check:false},
  {label:WEDNESDAY,check:false},
  {label:THURSDAY,check:false},
  {label:FRIDAY,check:false},
  {label:SATURDAY,check:false},
  {label:SUNDAY,check:false}];
  
export const MEMBER_MODEL = {
  userId: "",
  fullName: "",
  jiraName:"",
  previousJiraName:"",
  empCode: "",
  empStatus: "",
  departmentId: "",
  email: "",
  phone: "",
  reportingManager: "",
  functionalHeadId: "",
  empMode:T.INHOUSE,
  designation: "",
  isFieldAvailable: false,
  confirmJiraName: false,
  openConfirmCancel: false,
  joiningDateInNetsmartz: null,
  careerStartDate: null,
  totalExpAsOnDate: "",
  workLocation: "",
  workMode: "",
  workModeExceptionReason: "",
  profileLinkWord: "",
  profileLinkPdf: "",
  clientJira: "",
  isMemberShadow: "",
  internalJiraExemption: "",
  isTrainingToBeAssigned: "",
  projectMode: "",
  trainingName: "",
  trainingStartDate: null,
  trainingEndDate: null,
  comments: "",
  jiraFrequency: "",
  region: "",
  workingDays:SELECTED_WORKING_DAYS,
  weekDaysList:WEEK_DAYS_LIST,
  isWorking:true,
  resignationDate: null,
  relievingDate: null,
  releavingComments: "",
  technologyDetails: [
    {
      skillId: "",
      skillRating: 0,
      isPrimary: false,
      isSecondary: true,
    },
  ],
  projectDetails: [
    {
      projectId: "",
      startDate: null,
      endDate: null,
      projectManagerId: "",
      hoursAllocation: "",
      hoursAllocationCustom: "",
      isPrimary: false,
      isSecondary: true,
    },
  ],
  tableData: {},
  searchTableData: {},
  empCodeExist:false,
  mobileNoExist:false,
  emailExist:false,
};

export const PROJECT_MODE = [
  BYT,
  DEVEOPS,
  FIXED,
  ON_BENCH,
  OPERATIONS,
  PRODUCT,
  T_N_M,
  TRAINING,
  SHADOW
];
export const REGION_LIST = [
  AUSTRALIA,
  CANADA,
  INDIA,
  SINGAPORE,
  USA
];
export const CLIENT_REGION_LIST = [
  NORTH_AMERICAN,
  SOUTH_AMERICAN,
  NORWEGIAN,
  EUROPEAN,
  APAC,
  INDIA,
  OTHERS
];

export const RESIGN_STATUS_LIST = [RESIGNED, DID_NOT_JOIN, ABSCONDED];
export const EMP_STATUS = [STABLE, DID_NOT_JOIN , RESIGNED, ABSCONDED,YET_TO_JOIN, SEPARATED,RELIEVED];
export const EMP_MODE_LIST = [INHOUSE,CONSULTANT];
export const WORK_LOCATION = [CHANDIGARH, MOHALI, NOIDA, GURUGRAM];
export const AVAILABILITY = [PARTIAL, FULL, NO];
export const WORK_MODE = [WFO, WFH, HYBRID ];
export const JIRA_FREQUENCY = [DAILY,WEEKLY];
export const TYPES_OF_NC = [JIRA_NOT_FILLED, COMMENTS_MISSING, SVN_CHECKIN ];
export const MONTH_LIST = [JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC];
export const FEEDBACK_TYPES =[`${POSITIVE} ${FEEDBACK}`,`${NEGATIVE} ${FEEDBACK}`]

export const PROJECT_ALLOCATION = [20, 40, 60, 80, 100, 120, 140, 160, CUSTOM];

export const YES_NO_VALUES = {
  Yes: true,
  No: false,
};
