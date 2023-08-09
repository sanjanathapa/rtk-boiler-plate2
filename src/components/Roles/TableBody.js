import React, { Children } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import {
  TableRow,
  TableCell,
  TableBody as TBody,
  Checkbox,
  Typography,
} from "@mui/material";

import {
  ROLES_PERMISSIONS,
  VIEW_PERMISSION,
  ADD_PERMISSION,
  EDIT_PERMISSION,
  DELETE_PERMISSION,
  ROLES_MAPPING,
} from "settings/constants/roles";

const TableBody = ({ access = [], handleRole = noop }) => {
  return (
    <TBody
      sx={{
        "& .MuiTableCell-body": {
          paddingTop: "6px",
          paddingBottom: "6px",
        },
      }}
    >
      {Children.toArray(
        Object.entries(ROLES_PERMISSIONS).map(([key, val]) => {
          return (
            <TableRow hover>
              <TableCell>
                <Typography fontSize={14} fontWeight={400}>
                  {key}
                </Typography>
              </TableCell>

              <TableCell align="center">
                {val.includes(VIEW_PERMISSION) && (
                  <Checkbox
                    size="small"
                    checked={access.includes(`${ROLES_MAPPING[key]}_view`)}
                    value={VIEW_PERMISSION}
                    onChange={(event) => handleRole(event, key)}
                  />
                )}
              </TableCell>

              <TableCell align="center">
                {val.includes(ADD_PERMISSION) && (
                  <Checkbox
                    size="small"
                    checked={access.includes(`${ROLES_MAPPING[key]}_add`)}
                    value={ADD_PERMISSION}
                    onChange={(event) => handleRole(event, key)}
                  />
                )}
              </TableCell>
              <TableCell align="center">
                {val.includes(EDIT_PERMISSION) && (
                  <Checkbox
                    size="small"
                    checked={access.includes(`${ROLES_MAPPING[key]}_edit`)}
                    value={EDIT_PERMISSION}
                    onChange={(event) => handleRole(event, key)}
                  />
                )}
              </TableCell>
              <TableCell align="center">
                {val.includes(DELETE_PERMISSION) && (
                  <Checkbox
                    size="small"
                    checked={access.includes(`${ROLES_MAPPING[key]}_delete`)}
                    value={DELETE_PERMISSION}
                    onChange={(event) => handleRole(event, key)}
                  />
                )}
              </TableCell>
            </TableRow>
          );
        })
      )}
    </TBody>
  );
};

TableBody.propTypes = {
  access: PropTypes.array,
  handleRole: PropTypes.func,
};

export default TableBody;
