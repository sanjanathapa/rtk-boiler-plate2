import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Table as TableView, TableContainer } from "@mui/material";

import { NC_TABLE_HEADER } from "settings/constants/members";

import TableHeader from "./TableHeader";
import NCTableBody from "./NCTableBody";

const NCTable = ({
  allTableRows,
  refreshTable = noop,
  handleActiveNcCountDialog = noop,
  handleDeleteNcCountDialog = noop,
}) => {
  return (
    <TableContainer>
      <TableView stickyHeader sx={{ borderSpacing: "0 8px" }}>
        <TableHeader columns={NC_TABLE_HEADER} />
        <NCTableBody
          records={allTableRows}
          refreshTable={refreshTable}
          handleActiveNcCountDialog={handleActiveNcCountDialog}
          handleDeleteNcCountDialog={handleDeleteNcCountDialog}
        />
      </TableView>
    </TableContainer>
  );
};

NCTable.propTypes = {
  allTableRows: PropTypes.array,
  refreshTable: PropTypes.func,
  handleActiveNcCountDialog: PropTypes.func,
  handleDeleteNcCountDialog: PropTypes.func,
};

export default NCTable;
