import React, { Children, useReducer } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { toast } from "react-toastify";

import {
  TableRow,
  TableCell,
  Typography,
  TableBody,
  styled,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useRemoveRoleMutation } from "api/members/removeRole";

import MenuButton from "components/Header/MenuButton";
import { getAllTableMenus } from "settings/constants/members";

import { BACKGROUND } from "theme/colors";

import AssignRole from "./AssignRole";
import DeactivateUser from "./DeactivateUser";
import RevokeMemberResignation from "./RevokeMemberResignation";
import DeleteUser from "./DeleteUser";

import T from "T";

import { get } from "utils/lodash";
import { memo } from "utils/react";
import { handleError } from "utils/error";
import { GET_SIZE } from "utils/responsive";
import { getMemberColumnData, handleHeaderClass } from "utils/recommendedMembers";

const StyledTableCell = styled(TableCell)(() => ({
  borderTop: "inherit",
  overflow: "hidden",
  padding: "8px 0px 8px 24px",
}));

const MISTableBody = ({
  columns = [],
  lockedColumns = [],
  records = [],
  currentScrollPosition = 0,
  refreshMemberTable = noop,
}) => {
  const { isXs } = GET_SIZE();
  const [removeRole] = useRemoveRoleMutation();

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      assignRole: false,
      deactivateMember: false,
      revokeResignation: false,
      deleteUser: false,
      userId: "",
    }
  );
  const {
    assignRole,
    deactivateMember,
    revokeResignation,
    deleteUser,
    userId,
  } = localState;

  const handleAssignDialog = (userId) => {
    setLocalState({ assignRole: !assignRole });
    setUserId(userId);
    // refreshMemberTable();
  };

  const handleDeactivateDialog = (userId) => {
    setLocalState({ deactivateMember: !deactivateMember });
    setUserId(userId);
    // refreshMemberTable();
  };

  const handleRevokeResignationDialog = (userId) => {
    setLocalState({ revokeResignation: !revokeResignation });
    setUserId(userId);
    // refreshMemberTable();
  };

  const handleDeleteUserDialog = (userId) => {
    setLocalState({ deleteUser: !deleteUser });
    setUserId(userId);
    // refreshMemberTable();
  };

  const handleRemoveRoleDialog = (id) => {
    removeRole({ memberId: id })
      .unwrap()
      .then(() => {
        toast.success(T.ROLE_REMOVED_STATEMENT);
        // refreshMemberTable();
      })
      .catch(handleError);
  };

  const getMenu = (record) => {
    const finalMenus = getAllTableMenus().filter((menu) => menu.permission);

    let values = [];
    if (record.member === null || record.member.status === false)
      values = finalMenus.filter((item) => item.title !== T.REMOVE_ROLE);
    else values = finalMenus.filter((item) => item.title !== T.ASSIGN_ROLE);

    if (record.empStatus === T.STABLE || record.empStatus === T.YET_TO_JOIN )
      return values.filter((item) => item.title !== T.REVOKE);
    else if (record.empStatus === T.RESIGNED)
      return values.filter(
        (item) => ![T.DEACTIVATE, T.ASSIGN_ROLE].includes(item.title)
      );
    else
      return values.filter(
        (item) =>
          ![T.DEACTIVATE, T.ASSIGN_ROLE].includes(
            item.title
          )
      );
  };

  const setUserId = (id) => {
    setLocalState({
      userId: id,
    });
  };

  return (
    <TableBody>
      {Children.toArray(
        records.map((record) => {
          const finalMenu = getMenu(record);
          const userId = get(record, "id", "");

          return (
            <TableRow sx={{ background: BACKGROUND.white }}>
              {/* <StyledTableCell className="sticky-col">
                <MenuButton
                  iconType={<MoreVertIcon />}
                  currentScrollPosition={currentScrollPosition}
                  items={finalMenu}
                  handleAssignDialog={() => {
                    handleAssignDialog(userId);
                  }}
                  handleDeactivateDialog={() => {
                    handleDeactivateDialog(userId);
                  }}
                  handleRevokeResignationDialog={() => {
                    handleRevokeResignationDialog(userId);
                  }}
                  handleDeleteUserDialog={() => {
                    handleDeleteUserDialog(userId);
                  }}
                  handleRemoveRoleDialog={() => {
                    const memberVal = get(record, "member", {});
                    handleRemoveRoleDialog(get(memberVal, "id", ""));
                  }}
                  id={get(record, "id", "")}
                />
              </StyledTableCell> */}
              {Children.toArray(
                columns.map((column, index) => {
                  const colKey = get(column, "columnKey", "");

                  const { columnData } = getMemberColumnData(
                    record,
                    isXs,
                    colKey
                  );
                  const isRowLocked = get(column, "locked", false);

                  return (
                    <StyledTableCell
                      className={handleHeaderClass(
                        index,
                        isRowLocked,
                        lockedColumns
                      )}
                    >
                      {columnData}
                    </StyledTableCell>
                  );
                })
              )}
            </TableRow>
          );
        })
      )}

      {records && records.length === 0 && (
        <TableRow>
          <StyledTableCell colSpan="10%" sx={{ border: "none" }}>
            <Typography variant="body1" textAlign="center">
              {T.NO_RECORDS}
            </Typography>
          </StyledTableCell>
        </TableRow>
      )}
      <AssignRole
        assign={assignRole}
        handleDialog={handleAssignDialog}
        userId={userId}
      />
      <DeactivateUser
        deactivateMember={deactivateMember}
        handleDeactivateDialog={handleDeactivateDialog}
        userId={userId}
      />
      <RevokeMemberResignation
        revokeResignation={revokeResignation}
        handleRevokeResignationDialog={handleRevokeResignationDialog}
        userId={userId}
      />
      <DeleteUser
        deleteMember={deleteUser}
        handleDeleteUserDialog={handleDeleteUserDialog}
        userId={userId}
        refreshTable={refreshMemberTable}
      />
    </TableBody>
  );
};

MISTableBody.propTypes = {
  records: PropTypes.array,
  refreshMemberTable: PropTypes.func,
};

export default memo(MISTableBody);
