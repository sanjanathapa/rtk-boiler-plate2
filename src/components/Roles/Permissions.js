import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Table as TableView, TableContainer, Paper } from "@mui/material";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

import { TABLE_HEADER_VALUES } from "settings/constants/roles";

const Permissions = ({ access = [], handleRole = noop }) => {
  return (
    <Paper>
      <TableContainer>
        <TableView stickyHeader>
          <TableHeader values={TABLE_HEADER_VALUES} />
          <TableBody access={access} handleRole={handleRole} />
        </TableView>
      </TableContainer>
    </Paper>
  );
};

Permissions.propTypes = {
  access: PropTypes.array,
  handleRole: PropTypes.func,
};

export default Permissions;
