import { useMediaQuery, useTheme } from "@mui/material";

export const GET_SIZE = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isLg = useMediaQuery(theme.breakpoints.up("md"));
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));

  return { isXs, isMd, isLg };
};
