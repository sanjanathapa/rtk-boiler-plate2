import last from "lodash/last";
import capitalize from "lodash/capitalize";

import routes from "router/routes";
import system from "settings/system";

const { title: systemTitle } = system;

const allRoutes = Object.keys(routes.app);

const PAGE_TITLE = new Map([
  // override any existing route here
  [routes.app.forgotPwd, "Forgot Password"],
  [routes.app.changePwd, "Change Password"],
  [routes.app.addRoles, "Add Role"],
  [routes.app.addMembers, "Add Member"],
  [routes.app.members, "Members"],
  [routes.app.nonCompliance, "Non Compliance"],
  [routes.app.masterSettings, "Master Settings"],
  [routes.app.preSales, "Pre Sales"],
  [routes.app.createNewProject, "Create Requirement"],
  ["default", "Error"],
]);

export const getPageTitle = (page) => {
  let title = PAGE_TITLE.get(page);

  if (!title) {
    if (page.includes("edit") && page.includes("role")) title = "Edit Role";
    else if (page.includes("edit") && page.includes("member"))
      title = "Edit Member";
    else if (page.includes("edit") && page.includes("pre-sales"))
      title = "Edit Requirement";
    else if (!["add", "edit"].includes(page) && page.includes("member"))
      title = "View Member";
    else {
      const url = last(page.split("/"));
      title = allRoutes.includes(url)
        ? capitalize(url)
        : PAGE_TITLE.get("default");
    }
  }

  return `${systemTitle} - ${title}`;
};
