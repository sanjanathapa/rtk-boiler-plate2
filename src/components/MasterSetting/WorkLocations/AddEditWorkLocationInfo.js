import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import { Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { get } from "utils/lodash";

import MISFooterButton from "components/common/MISFooterButton";
import MISTextField from "components/common/MISTextField";
import MISDialog from "components/common/MISDialog";
import T from "T";
import { handleError } from "utils/error";
import { useLazyGetLocationByIdQuery } from "api/workLocation/getLocationById";
import { useSaveLocationMutation } from "api/workLocation/saveLocation";
import { useUpdateLocationMutation } from "api/workLocation/updateLocation";

const AddEditWorkLocationInfo = ({
  openAddEditWorkLocationInfo = false,
  editId = "",
  handleAddEditWorkLocationInfoDialog = noop,
  refreshTable = noop,
}) => {
  const [getLocationById] = useLazyGetLocationByIdQuery();
  const [saveLocation] = useSaveLocationMutation();
  const [updateLocation] = useUpdateLocationMutation();

  const defaultLocalState = {
    locationName: "",
  };

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    defaultLocalState
  );

  const { locationName } = localState;

  useEffect(() => {
    if (editId) {
      getLocationById({ id: editId })
        .unwrap()
        .then((res) => {
          setLocalState({
            locationName: get(res, "workLocationName", ""),
          });
        })
        .catch(handleError);
    }
  }, [editId]);

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setLocalState({ [name]: value });
  };

  const resetState = () => {
    setLocalState(defaultLocalState);
  };

  const handleAddEditWorkLocationInfo = () => {
    const payload = {
        locationName,
      id: editId,
    };

    editId
      ? updateLocation(payload)
          .unwrap()
          .then(() => {
            handleClose();
            toast.success(T.LOCATION_UPDATED_SUCCESSFULLY);
          })
          .catch(handleError)
      : saveLocation(payload)
          .unwrap()
          .then(() => {
            handleClose();
            toast.success(T.LOCATION_ADDED_SUCCESSFULLY);
          })
          .catch(handleError);
  };

  const handleClose = () => {
    resetState();
    handleAddEditWorkLocationInfoDialog();
    refreshTable();
  };

  return (
    <MISDialog open={openAddEditWorkLocationInfo}>
      <Typography
        variant="h6"
        textAlign="center"
        p={`10px 100px`}
        fontWeight="600"
      >
        {editId === "" ? T.ADD_NEW_WORK_LOCATION : T.EDIT_LOCATION}
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          p: 2,
          "& .MuiFormLabel-root": {
            "& .MuiTypography-root": {
              color: "text.popupLabel",
              fontSize: 14,
              fontWeight: 600,
            },
          },
        }}
      >
        <Grid item xs={12}>
          <MISTextField
            fullWidth
            label={T.LOCATION_NAME.toUpperCase()}
            placeholder={T.NEW_LOCATION}
            size="small"
            variant="outlined"
            name="locationName"
            value={locationName}
            required
            onChange={onHandleChange}
          />
        </Grid>
      </Grid>

      <MISFooterButton
        proceedButtonText={T.SAVE}
        justify="center"
        size="medium"
        disableProceed={!locationName}
        sx={{ p: 1, m: 1 }}
        handleClose={()=>{handleAddEditWorkLocationInfoDialog();resetState()}}
        handleSubmit={handleAddEditWorkLocationInfo}
      />
    </MISDialog>
  );
};

AddEditWorkLocationInfo.propTypes = {
  openAddEditWorkLocationInfo: PropTypes.bool,
  editId: PropTypes.string,
  handleAddEditWorkLocationInfoDialog: PropTypes.func,
  refreshTable: PropTypes.func,
};

export default AddEditWorkLocationInfo;
