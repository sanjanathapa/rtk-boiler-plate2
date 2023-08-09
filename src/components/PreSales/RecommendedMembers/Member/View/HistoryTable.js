import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Table as TableView, TableContainer } from "@mui/material";

import { HISTORY_TABLE_HEADER } from "settings/constants/members";

import TableHeader from "./TableHeader";
import HistoryTableBody from "./HistoryTableBody";

const HistoryTable = ({ allTableRows, handleAddFeedback = noop }) => {
  return (
    <TableContainer>
      <TableView stickyHeader sx={{ borderSpacing: "0 8px" }}>
        <TableHeader columns={HISTORY_TABLE_HEADER} />
        <HistoryTableBody
          records={allTableRows}
          handleAddFeedback={handleAddFeedback}
        />
      </TableView>
    </TableContainer>
  );
};

HistoryTable.propTypes = {
  allTableRows: PropTypes.array,
  handleDelete: PropTypes.func,
};

export default HistoryTable;
