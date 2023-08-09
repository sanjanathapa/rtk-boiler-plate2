import React, { Children } from "react";
import noop from "lodash/noop";
import PropTypes from "prop-types";

import {
  Grid,
  styled,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MenuIcon from "@mui/icons-material/Menu";

import { orange, grey } from "@mui/material/colors";

import T from "T";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { NETSMARTZ_THEME_COLOR, BORDER } from "theme/colors";

const { CANCEL, SUBMIT } = T;

const OrangeCheckbox = styled((props) => (
  <Checkbox color="primary" {...props} />
))({
  root: {
    color: orange[50],
  },
});

const Container = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  maxHeight: "calc(100vh - 318px)",
  whiteSpace: "nowrap",
  overflow: "auto",
}));

const BottomContainer = styled("div")(({ theme }) => ({
  display: "flex",
  padding: "10px",
  borderTop: `1px solid ${grey[200]}`,
  boxShadow:
    " 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
  width: "100%",
  justifyContent: "space-between",
}));

const CancelButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  color: grey[500],
}));

const MISConfigurator = ({
  configData = [],
  handleOnDragEnd = noop,
  handleCancel = noop,
  handleConfChange = noop,
  saveConfigSettings = noop,
}) => {
  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="upper-section">
          {(provided) => (
            <Grid
              container
              spacing={0}
              nowrap
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Container>
                {Children.toArray(
                  configData &&
                    configData.map((data, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={`s${index}`}
                          index={index}
                        >
                          {(provide) => (
                            <Grid
                              container
                              nowrap
                              spacing={1}
                              alignItems="center"
                              ref={provide.innerRef}
                              {...provide.draggableProps}
                              {...provide.dragHandleProps}
                              data-id={data.position}
                            >
                              <Grid item xs={1}>
                                <MenuIcon fontSize="small" />
                              </Grid>
                              <Grid item xs={9}>
                                <FormControl component="fieldset">
                                  <FormControlLabel
                                    control={
                                      <OrangeCheckbox
                                        checked={configData[index].checked}
                                        onChange={() => {
                                          handleConfChange(
                                            index,
                                            "checked",
                                            configData
                                          );
                                        }}
                                        name={`checkedCol${index}`}
                                      />
                                    }
                                    label={data.label}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={2}>
                                <div
                                  onClick={() =>
                                    handleConfChange(
                                      index,
                                      "locked",
                                      configData
                                    )
                                  }
                                >
                                  {data.locked ? (
                                    <LockOutlinedIcon
                                      fontSize="small"
                                      sx={{
                                        cursor: "pointer",
                                        fill: NETSMARTZ_THEME_COLOR,
                                      }}
                                    />
                                  ) : (
                                    <LockOpenIcon
                                      fontSize="small"
                                      sx={{
                                        cursor: "pointer",
                                        fill: BORDER.light,
                                      }}
                                    />
                                  )}
                                </div>
                              </Grid>
                            </Grid>
                          )}
                        </Draggable>
                      );
                    })
                )}
                {provided.placeholder}
              </Container>
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
      <Grid container spacing={0}>
        <BottomContainer>
          <CancelButton variant="text" size="small" onClick={handleCancel}>
            {CANCEL}
          </CancelButton>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => saveConfigSettings(configData)}
          >
            {SUBMIT}
          </Button>
        </BottomContainer>
      </Grid>
    </>
  );
};

MISConfigurator.propTypes = {
  configData: PropTypes.array,
  handleOnDragEnd: PropTypes.func,
  handleCancel: PropTypes.func,
  handleConfChange: PropTypes.func,
  saveConfigSettings: PropTypes.func,
};

export default MISConfigurator;
