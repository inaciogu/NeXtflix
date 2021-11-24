import { createTheme } from "@material-ui/core";

export  const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(255,255,255)'
    },
    secondary: {
      main: '#A00D03',
    }
  },
  overrides: {
    MuiInputBase: {
      root: {
        color: "rgb(255, 255, 255)",
        fontWeight: "500",
      }
    },
    MuiTextField: {
      root: {
      }
    }
  },
  props: {
    MuiTextField: {
      color: 'primary'
    }
  }
});