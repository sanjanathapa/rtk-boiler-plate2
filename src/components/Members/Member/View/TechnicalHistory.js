import React, { Children } from "react";
import { Card, Grid, Rating, Typography } from "@mui/material";
import { get } from "lodash";
import T from "T";

const TechnicalHistory = ({ results }) => {
  return (
    <Card sx={{ p: 2, mt: 3 }} elevation={2}>
      <Typography fontSize={18} fontWeight={600} mb={1.5}>
        {T.TECHNICAL_HISTORY}
      </Typography>
      {Children.toArray(
        results.map((skill, index) => (
          <Grid container mt={0.8}>
            <Grid item sm={2} xs={6}>
              <Typography variant="body" component="legend" color="text.label" noWrap>
                {get(skill, "skillName", "")}
              </Typography>
            </Grid>
            <Grid item sm={10} xs={6}>
              <Rating
                name="skillRating"
                precision={0.5}
                value={get(skill, "rating", "")}
              />
            </Grid>
          </Grid>
        ))
      )}

      {results && results.length === 0 && (
        <Typography variant="body1">
          {T.NA}
        </Typography>
      )}
    </Card>
  );
};

export default TechnicalHistory;
