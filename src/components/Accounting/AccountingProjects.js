import React from "react";
import PropTypes from "prop-types";

import { PAGINATION } from "settings/constants/pagination";

import AccountingProjectsTable from "./AccountingProjectsTable";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const AccountingProjects = ({
  allTableRows = [],
  totalHrsLogged = "",
}) => {
  return (
    <AccountingProjectsTable
      allTableRows={allTableRows}
      totalHrsLogged={totalHrsLogged}
    />
  );
};

AccountingProjects.propTypes = {
  totalHrsLogged: PropTypes.string,
  allTableRows: PropTypes.array,
};

export default AccountingProjects;
