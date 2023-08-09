import React, { useReducer } from "react";
import cloneDeep from "lodash/cloneDeep";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { Typography, Paper, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useSaveRoleMutation } from "api/roles/saveRole";
import { ROLES_MAPPING } from "settings/constants/roles";
import { handleError } from "utils/error";

import Form from "./Form";

import T from "T";

const AddRole = ({ setAddRoles }) => {
  const navigate = useNavigate();
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      roleName: "",
      description: "",
      access: [],
    }
  );
  const { roleName, description, access } = localState;

  const [saveRole] = useSaveRoleMutation();

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setLocalState({ [name]: value });
  };
  const handleAddRole = () => {
    const payload = {
      roleName,
      description,
      access,
      status: true,
    };

    saveRole(payload)
      .unwrap()
      .then(() => {
        toast.success(T.ROLE_CREATED_SUCCESSFULLY)
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
          {T.ADD_ROLE}
        </Typography>
      </Box>

      <Form
        roleName={roleName}
        description={description}
        access={access}
        handleBack={handleBack}
        setAddRoles={setAddRoles}
        onHandleChange={onHandleChange}
        handleRole={handleRole}
        handleAddRole={handleAddRole}
      />
    </Paper>
  );
};

export default AddRole;
