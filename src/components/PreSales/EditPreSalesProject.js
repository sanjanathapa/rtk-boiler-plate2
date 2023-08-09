import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import T from "T";
import Form from "./Form";



const EditPreSalesProject = () => {
  const [status,setStatus]=useState();
  const [fullName,setFullname]=useState()
  const getStatus=(val)=>{
    setStatus(val)
  }
  const getFullName=(name)=>{
    setFullname(name)
  }
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/app/pre-sales");
  };

  return (
    <Paper sx={{ p: '16px 16px 0' }}>
      <Box display="flex" alignItems="center" mb={1}>
        <ArrowBackIcon
          fontSize="small"
          sx={{ cursor: "pointer" }}
          onClick={handleBack}
        />
        <Typography variant="h6" fontWeight={700} ml={1}>
          {T.EDIT_PRE_SALES_REQUIREMENT}
        </Typography>
      </Box>

       <Form/>
    </Paper>
  );
};

export default EditPreSalesProject;
