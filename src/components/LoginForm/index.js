import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Button,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import routes from "router/routes";

import { useLoginMutation } from "api/login";

import { isEmail } from "utils/validations";
import { handleError } from "utils/error";

import { SUCCESS, ERROR, NETSMARTZ_THEME_COLOR } from "theme/colors";

import T from "T";

import { get } from "utils/lodash";
import { toast } from "react-toastify";
import { loginStore } from "slices/loginSlice";
import MISLoader from "components/common/MISLoader";
import { memberFilterStore } from "slices/memberFilterSlice";
import { memberSearchStore } from "slices/memberSearchSlice";
import { savedFilterStore } from "slices/savedFilterSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      username: "",
      password: "",
      showPassword: false,
      rememberMe: false,
    }
  );

  const { username, password, showPassword, rememberMe } = localState;

  const [login, { isFetching }] = useLoginMutation();

  const handleClickShowPassword = () =>
    setLocalState({
      showPassword: !showPassword,
    });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setLocalState({ [name]: value });
  };
  const handleKeyPress=(e)=>{
    const key = e.key;
    if(username && password && key === "Enter")
    {
      handleLogin();  
    }
  }
  const handleLogin = () => {
    const payload = {
      username,
      password,
    };
    login(payload)
      .unwrap()
      .then((res) => {
        const token = get(res, "token", "");
        const user = get(res, "user", "");

        const accesses = get(user, "authorities", []).map(
          (auth) => auth.authority
        );

        if (rememberMe)
        {
          dispatch(loginStore({ token, rememberMe, user, accesses }));
          dispatch(memberFilterStore({storedFilters:{}}));
          dispatch(memberSearchStore({storedSearchInput:""}));
          dispatch(savedFilterStore({storedFilterId:""}));
        }
          
        else {
          sessionStorage.setItem("token", token);
          dispatch(loginStore({ rememberMe, user, accesses }));
          dispatch(memberFilterStore({storedFilters:{}}));
          dispatch(memberSearchStore({storedSearchInput:""}));
          dispatch(savedFilterStore({storedFilterId:""}));
        }

        navigate("/app/members");
      })
      .catch(handleError);
  };

  return (
    <Paper elevation={3} sx={{ p: "32px 20px" }}>
      {isFetching && <MISLoader />}
      <Typography variant="h5" textAlign="center" mt={2} fontSize={22}>
        {T.LOGIN.toUpperCase()}
      </Typography>

      <Typography variant="body1" mt={5}>
        {T.EMAIL}
      </Typography>

      <TextField
        placeholder={T.TYPE_YOUR_EMAIL_HERE}
        variant="outlined"
        name="username"
        value={username}
        onKeyPress={handleKeyPress}
        sx={{
          mb: !isEmail(username) ? 0 : 2,
          mt: 0.5,
          "& .MuiOutlinedInput-notchedOutline": {
            borderBottom:
              username &&
              `3px solid ${isEmail(username) ? SUCCESS.main : ERROR.main}`,
          },
          "& .MuiOutlinedInput-input": {
            padding: "9.5px 14px",
            fontSize: 14,
          },
        }}
        fullWidth
        required
        onChange={onHandleChange}
      />

      {username && !isEmail(username) && (
        <Typography variant="subtitle2" color="error.main">
          {`${T.INCORRECT} ${T.EMAIL}`}
        </Typography>
      )}

      <Typography variant="body1" mt={3}>
        {T.PASSWORD}
      </Typography>

      <OutlinedInput
        id="outlined-size-normal"
        placeholder={T.TYPE_YOUR_PWD_HERE}
        name="password"
        value={password}
        type={showPassword ? "text" : "password"}
        variant="outlined"
        sx={{
          mb: 1,
          mt: 0.5,
          "& .MuiOutlinedInput-input": {
            padding: "9.5px 14px",
            fontSize: 14,
          },
        }}
        fullWidth
        required
        onKeyPress={handleKeyPress}
        onChange={onHandleChange}
        endAdornment={
          <InputAdornment
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            position="end"
            sx={{ ml: 1.5 }}
          >
            <IconButton>
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              sx={{ pr: 0.4 }}
              checked={rememberMe}
              onChange={() => setLocalState({ rememberMe: !rememberMe })}
            />
          }
          label={
            <Typography variant="subtitle1" noWrap>
              {T.REMEMBER_ME}
            </Typography>
          }
        />

        <Link
          href={routes.app.forgotPwd}
          color={NETSMARTZ_THEME_COLOR}
          underline="none"
        >
          <Typography variant="subtitle1" noWrap>
            {T.FORGOT_PWD}
          </Typography>
        </Link>
      </Box>

      <Button
        variant="contained"
        sx={{
          bgcolor: NETSMARTZ_THEME_COLOR,
          mt: 5,
          mb: 5,
          width: "100%",
        }}
        onClick={handleLogin}
      >
        {T.LOGIN}
      </Button>
    </Paper>
  );
};

export default LoginForm;
