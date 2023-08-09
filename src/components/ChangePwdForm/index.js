import React, { useState, useReducer } from "react";
import { useSelector, shallowEqual } from "react-redux";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  InputAdornment,
  OutlinedInput,
  Paper,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";

import { useChangePwdMutation } from "api/members/changePwd";

import T from "T";
import { SUCCESS, ERROR, NETSMARTZ_THEME_COLOR } from "theme/colors";

import { handleError } from "utils/error";
import { isPassword } from "utils/validations";
import MISDialog from "components/common/MISDialog";
import MISLoader from "components/common/MISLoader";
import PwdChangedSuccess from "assets/PwdChangedSuccess.png";
import { handleLogout } from "utils/logout";

import { get } from "utils/lodash";

const ChangePwdForm = () => {
  const { user } = useSelector(
    (state) => ({
      user: get(state, "LoginSlice.user", null),
    }),
    shallowEqual
  );

  const [openSuccessMsg, setOpenSuccessMsg] = useState(false);

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      showPassword: false,
    }
  );
  const {
    email,
    currentPassword,
    newPassword,
    confirmPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
  } = localState;

  const [changePwd, { isLoading }] = useChangePwdMutation();

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setLocalState({ [name]: value });
  };

  const handleClickShowCurrentPassword = () =>
    setLocalState({
      showCurrentPassword: !showCurrentPassword,
    });

  const handleClickShowNewPassword = () =>
    setLocalState({
      showNewPassword: !showNewPassword,
    });

  const handleClickShowConfirmPassword = () =>
    setLocalState({
      showConfirmPassword: !showConfirmPassword,
    });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isDisabledProceed =
    !currentPassword ||
    !newPassword ||
    !confirmPassword ||
    newPassword.length < 7 ||
    !isPassword(newPassword) ||
    newPassword !== confirmPassword;

  const handleChangePwd = () => {
    const payload = {
      confirmPassword,
      email: get(user, "username", ""),
      oldPassword: currentPassword,
      password: newPassword,
    };

    changePwd(payload)
      .unwrap()
      .then((res) => {
        setOpenSuccessMsg(true);
      })
      .catch(handleError);
  };

  return (
    <Paper elevation={3} sx={{ p: "32px 20px" }}>
      {isLoading && <MISLoader />}
      <Typography variant="h5" textAlign="center" fontSize={22}>
        {T.CHANGE_PWD.toUpperCase()}
      </Typography>
      <Typography variant="body1" mt={5}>
        {T.CURRENT_PWD}
      </Typography>

      <OutlinedInput
        id="currentPassword"
        placeholder={T.TYPE_YOUR_PWD_HERE}
        name="currentPassword"
        value={currentPassword}
        type={showCurrentPassword ? "text" : "password"}
        variant="outlined"
        sx={{
          mb: 2,
          mt: 0.5,
          "& .MuiOutlinedInput-input": {
            padding: "9.5px 14px",
            fontSize: 14,
          },
        }}
        fullWidth
        required
        onChange={onHandleChange}
        endAdornment={
          <InputAdornment
            aria-label="toggle password visibility"
            onClick={handleClickShowCurrentPassword}
            onMouseDown={handleMouseDownPassword}
            position="end"
          >
            <IconButton>
              {showCurrentPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />

      <Typography variant="body1" mt={1}>
        {T.ENTER_NEW_PWD}
      </Typography>

      <OutlinedInput
        id="newPassword"
        placeholder={T.TYPE_YOUR_PWD_HERE}
        name="newPassword"
        value={newPassword}
        type={showNewPassword ? "text" : "password"}
        variant="outlined"
        sx={{
          mb: 1,
          mt: 0.5,
          "& .MuiOutlinedInput-notchedOutline": {
            borderBottom:
              newPassword &&
              `3px solid ${
                isPassword(newPassword) ? SUCCESS.main : ERROR.main
              }`,
          },
          "& .MuiOutlinedInput-input": {
            padding: "9.5px 14px",
            fontSize: 14,
          },
        }}
        fullWidth
        required
        onChange={onHandleChange}
        endAdornment={
          <InputAdornment
            aria-label="toggle password visibility"
            onClick={handleClickShowNewPassword}
            onMouseDown={handleMouseDownPassword}
            position="end"
          >
            <IconButton>
              {showNewPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      <Typography variant="body2">{`${T.NEW_PASSWORD_CONDITION} ${T.NO_SPECIAL_CHARACTERS_ALLOWED}`}</Typography>

      <Typography variant="body1" mt={2}>
        {T.CONFIRM_PWD}
      </Typography>

      <OutlinedInput
        id="confirmPassword"
        placeholder={T.TYPE_YOUR_PWD_HERE}
        name="confirmPassword"
        value={confirmPassword}
        type={showConfirmPassword ? "text" : "password"}
        variant="outlined"
        sx={{
          mb: 2,
          mt: 0.5,
          "& .MuiOutlinedInput-notchedOutline": {
            borderBottom:
              confirmPassword &&
              `3px solid ${
                isPassword(confirmPassword) && newPassword === confirmPassword
                  ? SUCCESS.main
                  : ERROR.main
              }`,
          },
          "& .MuiOutlinedInput-input": {
            padding: "9.5px 14px",
            fontSize: 14,
          },
        }}
        fullWidth
        required
        onChange={onHandleChange}
        endAdornment={
          <InputAdornment
            aria-label="toggle password visibility"
            onClick={handleClickShowConfirmPassword}
            onMouseDown={handleMouseDownPassword}
            position="end"
          >
            <IconButton>
              {showConfirmPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      <Button
        variant="contained"
        sx={{
          bgcolor: NETSMARTZ_THEME_COLOR,
          mt: 3,
          mb: 1,
          textTransform: "capitalize",
          width: "100%",
        }}
        onClick={handleChangePwd}
        disabled={isDisabledProceed}
      >
        {T.SUBMIT}
      </Button>

      <MISDialog open={openSuccessMsg}>
        <Box
          component="img"
          src={PwdChangedSuccess}
          mt={3}
          margin="auto"
          maxWidth="inherit"
        />
        <Typography variant="h6" textAlign="center" p={`0px 100px`}>
          {T.PWD_CHANGED_SUCCESSFULLY}
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor: NETSMARTZ_THEME_COLOR,
            margin: "40px auto 60px",
            width: "60%",
          }}
          onClick={handleLogout}
        >
          {T.BACK_TO_LOGIN}
        </Button>
      </MISDialog>
    </Paper>
  );
};

export default ChangePwdForm;
