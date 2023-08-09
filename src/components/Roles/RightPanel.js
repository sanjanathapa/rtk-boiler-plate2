import React, { useState } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Card,
  Typography,
  Chip,
  Badge,
  Box,
  Divider,
  Button,
} from "@mui/material";

import { useDeleteRoleMutation } from "api/roles/deleteRole";

import Permissions from "./Permissions";

import T from "T";
import { NETSMARTZ_THEME_COLOR, BACKGROUND } from "theme/colors";
import MISConfirmationModal from "components/common/MISConfirmationModal";
import { PAGINATION } from "settings/constants/pagination";
import { get } from "utils/lodash";
import { canDeleteRole, canEditRole } from "utils/permissions";
import { handleError } from "utils/error";

const { INITIAL_PAGE } = PAGINATION;

const ROWS_PER_PAGE = 10000;

const RightPanel = ({
  record = {},
  getRoleTableData = noop,
  handleRole = noop,
  resetTab = noop,
}) => {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteRole] = useDeleteRoleMutation();

  const status = get(record, "status", false);

  const handleDeleteSubmit = () => {
    deleteRole({ id: record.id })
      .unwrap()
      .then((res) => {
        setOpenConfirm(false);
        toast.success(T.ROLE_DELETED_SUCCESSFULLY);
        getRoleTableData(INITIAL_PAGE, ROWS_PER_PAGE);
        resetTab();
      })
      .catch(handleError);
  };

  const handleEdit = () => {
    navigate(`/app/role/edit/${record.id}`);
  };

  return (
    <Card
      sx={{
        bgcolor: "background.card",
      }}
    >
      <Box sx={{ maxHeight: "calc(100vh - 235px)", overflowY: "scroll" }}>
        <Box display="flex" p={1.5}>
          <Typography variant="body1" fontWeight={700}>
            {get(record, "roleName", "")}
          </Typography>

          <Chip
            sx={{ height: 25, p: 1, ml: 1 }}
            color={status ? "success" : "error"}
            variant="outlined"
            icon={<Badge color={status ? "success" : "error"} variant="dot" />}
            label={
              <Typography variant="body2" color="black" ml={0.5}>
                {status ? T.ACTIVE : T.INACTIVE}
              </Typography>
            }
          />
        </Box>

        <Box p="0 16px 20px">
          <Typography variant="subtitle1">
            {get(record, "description", "")}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ pointerEvents: "none" }}>
          <Permissions
            handleRole={handleRole}
            access={get(record, "accessMapping", [])
              .map((rec) => rec.access)
              .map((acc) => acc.code)}
          />
        </Box>
      </Box>

      <Divider />
      <Box display="flex" p={2} justifyContent="end">
        {canDeleteRole() && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => setOpenConfirm(true)}
            sx={{
              borderColor: BACKGROUND.black,
              color: BACKGROUND.black,
              "&:hover": {
                background: "none",
                borderColor: BACKGROUND.black,
              },
            }}
          >
            {T.DELETE}
          </Button>
        )}

        {canEditRole() && (
          <Button
            size="small"
            variant="contained"
            onClick={handleEdit}
            sx={{
              background: NETSMARTZ_THEME_COLOR,
              ml: 2,
              color: "white",
              "&:hover": {
                background: NETSMARTZ_THEME_COLOR,
              },
            }}
          >
            {T.EDIT}
          </Button>
        )}
      </Box>

      <MISConfirmationModal
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleConfirm={handleDeleteSubmit}
      >
        <Typography variant="body1" textAlign="center">
          {T.DELETE_CONFIRMATION}
          <br />
          <strong>{get(record, "roleName", "")}?</strong>
        </Typography>
      </MISConfirmationModal>
    </Card>
  );
};

RightPanel.propTypes = {
  handleRole: PropTypes.func,
  getRoleTableData: PropTypes.func,
  resetTab: PropTypes.func,
  record: PropTypes.object,
};

export default RightPanel;
