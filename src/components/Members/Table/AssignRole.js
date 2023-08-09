import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Button, Divider, Grid, Stack, Typography } from "@mui/material";

import MISDialog from "components/common/MISDialog";
import MISAutocomplete from "components/common/MISAutocomplete";

import { useLazyGetRoleListQuery } from "api/roles/getRoleList";
import { useAssignRoleMutation } from "api/members/assignRole";

import T from "T";

import { NETSMARTZ_THEME_COLOR } from "theme/colors";
import { PAGINATION } from "settings/constants/pagination";
import { get } from "utils/lodash";
import { handleError } from "utils/error";
import { toast } from "react-toastify";
import MISFooterButton from "components/common/MISFooterButton";

const { INITIAL_PAGE } = PAGINATION;

const ROWS_PER_PAGE = 10000;

const AssignRole = ({ assign = false, userId = "", handleDialog = noop }) => {
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      roleId: "",
    }
  );
  const { roleId } = localState;

  const [getRoleList, { data: roles }] = useLazyGetRoleListQuery();
  const [assignRole] = useAssignRoleMutation();

  useEffect(() => {
    getRoles(INITIAL_PAGE, ROWS_PER_PAGE);
  }, []);

  const getRoles = (page, rowsPerPage) => {
    getRoleList({ page, rowsPerPage });
  };

  const handleChange = (event, newValue) => {
    setLocalState({ roleId: get(newValue, "id", "") });
  };

  const handleRoleAssign = (e) => {
    const payload = { roleId, userId };

    assignRole(payload)
      .unwrap()
      .then(() => {
        toast.success(T.ROLE_ASSIGNED_SUCCESSFULLY);
        setLocalState({ roleId: "" });
        handleDialog();
      })
      .catch(handleError);
  };

  const filtered = get(roles, "results", []).map((role) => ({
    label: role.roleName,
    id: role.id,
  }));

  return (
    <MISDialog open={assign}>
      <Typography variant="h5" textAlign="center" p={`10px 100px`}>
        {`${T.ASSIGN} ${T.ROLE}`}
      </Typography>
      <Divider />
      <Grid container p={`30px 8px`} spacing={2}>
        <Grid item xs={12}>
          <MISAutocomplete
            listDetails={filtered}
            getByLabelText={(option) => get(option, "label", "")}
            value={filtered.find((role) => role.id === roleId)}
            sx={{
              padding: "10px",
              ".MuiAutocomplete-popper": {
                zIndex: 1100,
              },
            }}
            onHandleChange={(event, newValue) => {
              handleChange(event, newValue);
            }}
          />
        </Grid>
      </Grid>

      <Divider />

      <MISFooterButton
        proceedButtonText={T.ASSIGN}
        justify="center"
        sx={{ p: 1.5 }}
        size="medium"
        disableProceed={!roleId}
        handleClose={() => {
          setLocalState({ roleId: "" });
          handleDialog();
        }}
        handleSubmit={handleRoleAssign}
      />
    </MISDialog>
  );
};

AssignRole.propTypes = {
  assignRole: PropTypes.bool,
  userId: PropTypes.string,
  handleDialog: PropTypes.func,
};

export default AssignRole;
