import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Paper, TextField, Link, Button, Box } from "@mui/material";

import routes from "router/routes";

import { useLazyGetForgotPwdQuery } from "api/getForgotPwd";

import { isEmail } from "utils/validations";
import { handleError } from "utils/error";

import {
  SUCCESS,
  ERROR,
  NETSMARTZ_THEME_COLOR,
  TEXT,
  BORDER,
} from "theme/colors";

import T from "T";
import PwdSharedOnEmail from "assets/PwdSharedOnEmail.png";
import MISDialog from "components/common/MISDialog";
import MISLoader from "components/common/MISLoader";

const ForgotPwdForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(false);
  const [openSuccessMsg, setOpenSuccessMsg] = useState(false);

  const [getForgotPwd, { isFetching }] = useLazyGetForgotPwdQuery();

  const onHandleChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleForgotPwd = () => {
    getForgotPwd(email)
      .unwrap()
      .then((res) => {
        setOpenSuccessMsg(true);
      })
      .catch(handleError);
  };

  return (
    <Paper elevation={3} sx={{ p: "32px 20px" }}>
      {isFetching && <MISLoader />}

      <Typography variant="h5" textAlign="center" mt={2} fontSize={22}>
        {T.FORGOT_YOUR_PWD.toUpperCase()}
      </Typography>

      <Box
        mt={6}
        sx={{
          border: `dashed 2px ${BORDER.light}`,
          borderRadius: 1,
          p: "8px 16px",
        }}
      >
        <Typography variant="subtitle2" textAlign="center">
          {T.RESET_PWD_MSG}
        </Typography>
      </Box>

      <Typography variant="body1" mt={4}>
        {T.EMAIL}
      </Typography>

      <TextField
        id="outlined-size-normal"
        placeholder={T.TYPE_YOUR_EMAIL_HERE}
        variant="outlined"
        name="email"
        sx={{
          mt: 0.5,
          "& .MuiOutlinedInput-notchedOutline": {
            borderBottom:
              email &&
              `3px solid ${isEmail(email) ? SUCCESS.main : ERROR.main}`,
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

      {email && !isEmail(email) && (
        <Typography variant="subtitle2" color="error.main">
          {`${T.INCORRECT} ${T.EMAIL}`}
        </Typography>
      )}

      <Button
        variant="contained"
        sx={{
          bgcolor: NETSMARTZ_THEME_COLOR,
          mt: 5,
          mb: 2,
          width: "100%",
        }}
        onClick={handleForgotPwd}
        disabled={!email}
      >
        {T.SUBMIT}
      </Button>

      <Typography variant="subtitle2" mb={5} textAlign="center">
        {T.BACK_TO}
        {` `}

        <Link href={routes.app.login} underline="none" color={NETSMARTZ_THEME_COLOR}>
          {T.LOGIN}
        </Link>
      </Typography>

      <MISDialog open={openSuccessMsg}>
        <Box
          component="img"
          src={PwdSharedOnEmail}
          mt={3}
          margin="auto"
          maxWidth="inherit"
        />
        <Typography variant="h6" textAlign="center" p={`0px 100px`}>
          {T.PWD_SHARED_ON_EMAIL}
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor: NETSMARTZ_THEME_COLOR,
            margin: "40px auto 60px",
            width: "60%",
          }}
          onClick={() => navigate("/app/login")}
        >
          {T.BACK_TO_LOGIN}
        </Button>
      </MISDialog>
    </Paper>
  );
};

export default ForgotPwdForm;
