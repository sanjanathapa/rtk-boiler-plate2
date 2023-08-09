import PropTypes from "prop-types";
import noop from "lodash/noop";
import {
  Table as TableView,
  Paper,
  TableContainer,
  Box,
  Card,
} from "@mui/material";

import {   USER_NC_BY_DATE_HEADER } from "settings/constants/members";
import UserNcTableBody from "./UserNcTableBody";
import TableHeader from "components/NonCompliance/TableHeader";

const UserNCTable = ({
  id="",
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        p: "0px 8px",
        mt: 1.5,
      }}
    >
      <Box overflow="hidden">
        <TableContainer
          component={Paper}
          sx={{ height: "calc(100vh - 290px)", width:"60vw", overflowY: "auto", overflowX: "auto" }}
        >
          <TableView >
            <TableHeader columns={ USER_NC_BY_DATE_HEADER } />
            <UserNcTableBody
              id={id}
            />
          </TableView>
        </TableContainer>
      </Box>
    </Card>
  );
};

UserNCTable.propTypes = {
  id: PropTypes.number,
};
export default UserNCTable;
