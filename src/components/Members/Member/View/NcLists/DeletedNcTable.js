import PropTypes from "prop-types";
import {
  Table as TableView,
  Paper,
  TableContainer,
  Box,
  Card,
} from "@mui/material";

import {   USER_DELETED_NC_HEADER } from "settings/constants/members";
import TableHeader from "../TableHeader";
import DeletedNcTableBody from "./DeletedNcTableBody";

const DeletedNcTable = ({
  userId = "",
  month= "",
  typeOfNc= "",
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
          sx={{ height: "calc(100vh - 290px)", width:"80vw", overflowY: "auto", overflowX: "auto" }}
        >
          <TableView >
            <TableHeader columns={ USER_DELETED_NC_HEADER } />
            <DeletedNcTableBody
              userId={userId}
              month={month}
              typeOfNc={typeOfNc}
            />
          </TableView>
        </TableContainer>
      </Box>
    </Card>
  );
};

DeletedNcTable.propTypes = {
  userId: PropTypes.number,
  month: PropTypes.number,
  typeOfNc: PropTypes.string,
};
export default DeletedNcTable;
