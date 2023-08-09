import { useEffect } from "react";

import { useLazyGetProjectManagerQuery } from "api/projects/getProjectManager";
import { useLazyGetFunctionalManagerQuery } from "api/members/getFunctionalHead";

import { PAGINATION } from "settings/constants/pagination";
import { useLazyGetWorkLocationQuery } from "api/members/getWorkLocation";
import { useLazyGetSkillListQuery } from "api/skills/getSkillList";
import { useLazyGetProjectListQuery } from "api/projects/getProjectList";
import { useLazyGetAllDepartmentQuery } from "api/members/getDepartmentList";

const { INITIAL_PAGE } = PAGINATION;
const FULL_ROWS_PER_PAGE = 10000;

const usePMFetch = () => {
  const [getProjectManager, { data: projectManagers }] =
    useLazyGetProjectManagerQuery();
  const [getFunctionalManager, { data: functionalManagers }] =
    useLazyGetFunctionalManagerQuery();
  const [getWorkLocation, { data: workLocationList }] =
    useLazyGetWorkLocationQuery();
  const [getAllDepartment, { data: departmentList }] = useLazyGetAllDepartmentQuery();
  const [getSkillList, { data: skillList }] = useLazyGetSkillListQuery();
  const [getProjectList, { data: projectList }] = useLazyGetProjectListQuery();

  useEffect(() => {
    getWorkLocation({ page: INITIAL_PAGE, rowPerPage: FULL_ROWS_PER_PAGE });
    getProjectManager({ page: INITIAL_PAGE, rowPerPage: FULL_ROWS_PER_PAGE });
    getFunctionalManager({
      page: INITIAL_PAGE,
      rowPerPage: FULL_ROWS_PER_PAGE,
    });
    getSkillList({ page: INITIAL_PAGE, rowPerPage: FULL_ROWS_PER_PAGE });
    getProjectList({ page: INITIAL_PAGE, rowPerPage: FULL_ROWS_PER_PAGE });
    getAllDepartment({ page: INITIAL_PAGE, rowPerPage: FULL_ROWS_PER_PAGE });
  }, []);

  return [
    projectManagers,
    functionalManagers,
    workLocationList,
    skillList,
    projectList,
    departmentList,
  ];
};

export default usePMFetch;
