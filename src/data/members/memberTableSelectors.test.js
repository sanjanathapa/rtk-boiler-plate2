import { getCurrentTableParams } from "./memberTableSelectors";

describe("[Selectors] Billing Table Selectors", () => {
  describe("#getCurrentTableParams", () => {
    it("should return valid table data", () => {
      expect(getCurrentTableParams()).toEqual({
        allTableRows: [],
        totalTableRowsCount: undefined,
        totalPageCount: undefined,
      });
      expect(getCurrentTableParams({})).toEqual({
        allTableRows: [],
        totalTableRowsCount: undefined,
        totalPageCount: undefined,
      });
      expect(
        getCurrentTableParams({
          results: [{ userName: "Vijay" }],
          numberOfRecords: 1,
          numberOfPages: 1,
        })
      ).toEqual({
        allTableRows: [{ userName: "Vijay" }],
        totalTableRowsCount: 1,
        totalPageCount: 1,
      });
      expect(
        getCurrentTableParams({
          results: [{ userName: "Vijay" }],
          numberOfRecords: 100,
          numberOfPages: 4,
        })
      ).toEqual({
        allTableRows: [{ userName: "Vijay" }],
        totalTableRowsCount: 100,
        totalPageCount: 4,
      });
    });
  });
});
