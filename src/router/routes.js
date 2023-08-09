const APP_PREFIX = "/app";

const routes = {
  app: {
    login: `${APP_PREFIX}/login`,
    forgotPwd: `${APP_PREFIX}/forgot-password`,
    changePwd: `${APP_PREFIX}/change-password`,
    home: `${APP_PREFIX}/home`,
    dashboard: `${APP_PREFIX}/dashboard`,
    settings: `${APP_PREFIX}/settings`,
    help: `${APP_PREFIX}/help`,
    reports: `${APP_PREFIX}/reports`,
    members: `${APP_PREFIX}/members`, 
    recommendedMembers: `${APP_PREFIX}/pre-sales/recommended-members`, 
    addMembers: `${APP_PREFIX}/member/add`,
    createNewProject: `${APP_PREFIX}/pre-sales/project-add`,
    editPreSalesProject: `${APP_PREFIX}/pre-sales/:id/edit`,
    editMembers: `${APP_PREFIX}/member/:id/edit`,
    viewMembers: `${APP_PREFIX}/member/:id`,
    nonCompliance: `${APP_PREFIX}/non-compliance`,
    roles: `${APP_PREFIX}/roles`,
    addRoles: `${APP_PREFIX}/role/add`,
    editRoles: `${APP_PREFIX}/role/edit/:id`,
    masterSettings: `${APP_PREFIX}/master-settings`,
    preSales: `${APP_PREFIX}/pre-sales`,
    profile: `${APP_PREFIX}/profile`,
    test: `${APP_PREFIX}/test`,
    accounting: `${APP_PREFIX}/accounting`,
  },
};

export default routes;
