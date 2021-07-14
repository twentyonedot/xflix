import React from "react";
import { MdFileUpload } from "react-icons/md";
import Button from "@material-ui/core/Button";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});

const theme = createTheme({
  palette: {
    primary: blue,
  },
});
export default function UploadModal() {
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={classes.root}
        >
          <span className="md:pr-2 py-1 text-black">
            <MdFileUpload />
          </span>
          <span className="hidden md:block text-black normal-case	">Upload</span>
        </Button>
      </ThemeProvider>
    </>
  );
}
