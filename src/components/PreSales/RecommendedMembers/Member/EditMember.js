import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import T from "T";
import Form from "./Form";

const EditMember = () => {
  const [status,setStatus]=useState()
  const [fullName,setFullname]=useState()
  const getStatus=(val)=>{
    setStatus(val)
  }
  const getFullName=(name)=>{
    setFullname(name)
  }
  const navigate = useNavigate();

  const handleBack = () => {
    // navigate("/app/members");
    // status !== T.STABLE && status !== T.YET_TO_JOIN && navigate("/app/members", { state: { showActive: status === T.STABLE || status === T.YET_TO_JOIN } });
    navigate(-1, { state: { showActive: status === T.STABLE || status === T.YET_TO_JOIN || status === T.RESIGNED } });
    
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" alignItems="center" mb={1}>
        <ArrowBackIcon
          fontSize="small"
          sx={{ cursor: "pointer" }}
          onClick={handleBack}
        />
        <Typography variant="h6" fontWeight={700} ml={1}>
          {`${T.EDIT} ${fullName} ${T.DETAILS} `}
        </Typography>
      </Box>

      <Form getStatus={getStatus} getFullName={getFullName}/>
    </Paper>
  );
};

export default EditMember;
