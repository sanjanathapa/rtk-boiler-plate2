import { createSelector } from "reselect";

export const getCurrentTableParams = createSelector(
  [(state) => state],
  (tableData = {}) => {
    const { results = [], numberOfRecords, numberOfPages } = tableData;

    return {
      allTableRows: results,
      totalTableRowsCount: numberOfRecords,
      totalPageCount: numberOfPages,
    };
  }
);
