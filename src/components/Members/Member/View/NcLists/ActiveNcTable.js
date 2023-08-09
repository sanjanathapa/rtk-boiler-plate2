import PropTypes from "prop-types";
import {
  Table as TableView,
  Paper,
  TableContainer,
  Box,
  Card,
} from "@mui/material";


import TableHeader from "../TableHeader";
import ActiveNcTableBody from "./ActiveNcTableBody";
import { COMMENTS_MISSING_USER_ACTIVE_NC_HEADER, JIRA_NOT_FILLED_USER_ACTIVE_NC_HEADER} from "settings/constants/members";
import T from "T";


const ActiveNcTable = ({
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
            <TableHeader columns=
            { typeOfNc===T.JIRA_NOT_FILLED
            ?
            JIRA_NOT_FILLED_USER_ACTIVE_NC_HEADER
            :
            typeOfNc===T.COMMENTS_MISSING
            ?
            COMMENTS_MISSING_USER_ACTIVE_NC_HEADER:[]} />
            <ActiveNcTableBody
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

ActiveNcTable.propTypes = {
  userId: PropTypes.number,
  month: PropTypes.number,
  typeOfNc: PropTypes.string,
};
export default ActiveNcTable;
