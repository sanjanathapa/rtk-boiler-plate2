import React, { useEffect, useReducer } from "react";
import cloneDeep from "lodash/cloneDeep";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { Typography, Paper, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useLazyGetRoleByIdQuery } from "api/roles/getRoleById";
import { useUpdateRoleMutation } from "api/roles/updateRole";

import { ROLES_MAPPING } from "settings/constants/roles";
import { get } from "utils/lodash";
import { handleError } from "utils/error";

import Form from "./Form";

import T from "T";

const EditRole = ({ setAddRoles }) => {
  const { user } = useSelector(
    (state) => ({
      user: get(state, "LoginSlice.user", null),
    }),
    shallowEqual
  );
  const memberId = get(user, "id", "");

  const navigate = useNavigate();
  const location = useLocation();

  const [getRoleById] = useLazyGetRoleByIdQuery();
  const [updateRole] = useUpdateRoleMutation();

  const url = location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      roleName: "",
      description: "",
      status: false,
      access: [],
    }
  );
  const { roleName, description, status, access } = localState;

  useEffect(() => {
    if (id)
      getRoleById({ id })
        .unwrap()
        .then((res) => {
          setLocalState({
            roleName: get(res, "roleName", ""),
            description: get(res, "description", ""),
            status: get(res, "status", false),
            access: get(res, "accessMapping", [])
              .map((rec) => rec.access)
              .map((acc) => acc.code),
          });
        })
        .catch(handleError);
  }, [id]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setLocalState({ [name]: value });
  };
  const handleUpdateRole = () => {
    const payload = {
      id,
      roleName,
      description,
      access,
      status,
    };
    updateRole(payload)
      .unwrap()
      .then(() => {
        toast.success(T.ROLE_UPDATED_SUCCESSFULLY);
        handleBack();
      })
      .catch(handleError);
  };

  const handleRole = (event, val) => {
    let clonedaccess = cloneDeep(access);

    const accessName = `${ROLES_MAPPING[val]}_${event.target.value}`;

    if (clonedaccess.includes(accessName))
      clonedaccess = clonedaccess.filter((data) => data !== accessName);
    else clonedaccess.push(accessName);

    setLocalState({ access: clonedaccess });
  };

  const handleBack = () => {
    navigate("/app/roles");
  };

  return (
    <Paper
      sx={{
        p: "8px 16px 20px",
        maxHeight: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      <Box display="flex" alignItems="center">
        <ArrowBackIcon
          fontSize="small"
          sx={{ cursor: "pointer" }}
          onClick={handleBack}
        />
        <Typography variant="h6" fontWeight={700} ml={1}>
          {T.EDIT_ROLE}
        </Typography>
      </Box>

      <Form
        id={id}
        roleName={roleName}
        description={description}
        access={access}
        setAddRoles={setAddRoles}
        onHandleChange={onHandleChange}
        handleBack={handleBack}
        handleRole={handleRole}
        handleAddRole={handleUpdateRole}
      />
    </Paper>
  );
};

export default EditRole;
