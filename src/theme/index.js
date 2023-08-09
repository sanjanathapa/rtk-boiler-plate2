import { createTheme } from "@mui/material/styles";

import {
  BACKGROUND,
  SUCCESS,
  ERROR,
  TEXT,
  NETSMARTZ_THEME_COLOR,
  BORDER,
} from "./colors";

const bytMisTheme = createTheme({
  typography: {
    body2: {
      fontSize: 12,
      fontWeight: 400,
      color: TEXT.secondary,
    },
    subtitle1: {
      fontSize: 14,
    },
    h5: {
      fontWeight: 700,
      fontSize: 24,
    },
    fontFamily: `Inter`,
    fontStyle: "normal",
    fontWeight: 400,
    color: TEXT.primary,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "Capitalize",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          svg: {
            fill: NETSMARTZ_THEME_COLOR,
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              border: "1px solid #D4D4D4",
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: BACKGROUND.white,
          backgroundColor: NETSMARTZ_THEME_COLOR,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        colorSecondary: {
          backgroundColor: BACKGROUND.yellow,
        },
      },
    },
  },
  palette: {
    background: BACKGROUND,
    success: SUCCESS,
    error: ERROR,
    text: TEXT,
    themeColor: NETSMARTZ_THEME_COLOR,
    border: BORDER,
  },
});

export default bytMisTheme;
