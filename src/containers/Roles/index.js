import React, { useReducer, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Grid, Typography, Paper } from "@mui/material";

import LeftPanel from "components/Roles/LeftPanel";
import RightPanel from "components/Roles/RightPanel";
import MISLoader from "components/common/MISLoader";

import { useLazyGetRoleListQuery } from "api/roles/getRoleList";
import { useUpdateRoleMutation } from "api/roles/updateRole";

import { ROLES_MAPPING } from "settings/constants/roles";
import { PAGINATION } from "settings/constants/pagination";

import T from "T";

import { get } from "utils/lodash";
import { handleError } from "utils/error";
import useUpdateAccessFetch from "hooks/useUpdateAccessFetch";
import { GET_SIZE } from "utils/responsive";

const { INITIAL_PAGE } = PAGINATION;

const ROWS_PER_PAGE = 10000;

const Roles = () => {
  const navigate = useNavigate();

  const [getRoleList, { isFetching, data: roles }] = useLazyGetRoleListQuery();
  const [updateRole] = useUpdateRoleMutation();

  const { isXs } = GET_SIZE();

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      value: "1",
      searchInput: "",
      showOptions: false,
      showCancelIcon: false,
      page: INITIAL_PAGE,
      rowsPerPage: ROWS_PER_PAGE,
    }
  );
  const { value, searchInput, showOptions, showCancelIcon, page, rowsPerPage } =
    localState;

  useEffect(() => {
    getRoleTableData(page, rowsPerPage);
  }, []);

  const getRoleTableData = (page, rowsPerPage) => {
    getRoleList({ page, rowsPerPage }).unwrap().catch(handleError);
  };

  const roleValues = get(roles, "results", []);

  useUpdateAccessFetch();

  // const handleSearchOptionClick = (event) => {
  //   const { textContent } = event.target;

  //   setLocalState({
  //     searchInput: textContent,
  //     showOptions: false,
  //     showCancelIcon: false,
  //     roles: roles.filter((role) => role.includes(textContent)),
  //   });
  // };

  // const handleSearchChange = useCallback(
  //   debounce((value) => {
  //     setLocalState({
  //       searchInput: value,
  //       showOptions: true,
  //       showCancelIcon: true,
  //     });
  //   }, DEBOUNCE_TIME),
  //   []
  // );

  // const handleClickOutside = () => {
  //   setLocalState({
  //     showOptions: false,
  //   });
  // };

  // const handleReset = () => {
  //   setLocalState({
  //     showOptions: false,
  //     searchInput: "",
  //     showCancelIcon: false,
  //     roles: ROLES,
  //   });
  // };

  // const handleSearchClick = (event) => {
  //   setLocalState({
  //     showCancelIcon: searchInput ? true : false,
  //   });
  // };

  const handleChange = (event, newValue) => {
    setLocalState({ value: newValue });
  };

  const handleClick = () => {
    navigate("/app/role/add");
  };

  const handleRole = (event, val) => {
    if (localState[ROLES_MAPPING[val]] === undefined)
      localState[ROLES_MAPPING[val]] = [];
    localState[ROLES_MAPPING[val]].push(Number(event.target.value));
    setLocalState(localState);
  };

  const handleStatus = (e, role) => {
    const payload = {
      roleName: get(role, "roleName", ""),
      description: get(role, "description", ""),
      status: e.target.checked,
      id: get(role, "id", ""),
    };

    updateRole(payload)
      .unwrap()
      .then(() => {
        getRoleTableData(page, rowsPerPage);
      })
      .catch(handleError);
  };

  return (
    <Paper sx={{ p: "8px 16px" }}>
      {isFetching && <MISLoader />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{T.ROLE_AND_PERMISSIONS}</Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={3}
          display={isXs ? "block" : "grid"}
          minWidth={isXs ? "100%" : "auto"}
        >
          <LeftPanel
            roles={roleValues}
            value={value}
            searchInput={searchInput}
            showOptions={showOptions}
            showCancelIcon={showCancelIcon}
            handleChange={handleChange}
            handleClick={handleClick}
            handleStatus={handleStatus}
            // handleReset={handleReset}
            // handleSearchClick={handleSearchClick}
            // handleSearchOptionClick={handleSearchOptionClick}
            // handleSearchChange={handleSearchChange}
            // handleClickOutside={handleClickOutside}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <RightPanel
            record={roleValues[parseInt(value) - 1]}
            getRoleTableData={getRoleTableData}
            handleRole={handleRole}
            resetTab={() => setLocalState({ value: "1" })}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Roles;
