import React from "react";
import Styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import {
  MdSearch as SearchIcon,
  MdClose as CloseIcon,
  MdFileUpload,
} from "react-icons/md";
import InputBase from "@material-ui/core/InputBase";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import UploadForm from "../UploadForm/UploadForm";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
const theme = createTheme({
  palette: {
    primary: blue,
  },
});

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  inputInput: {
    color: "#e5e5e5",
    backgroundColor: "#121212",

    borderTopLeftRadius: ".375rem",
    borderBottomLeftRadius: ".375rem",

    paddingLeft: ".5rem",
    paddingRight: ".5rem",

    "&::placeholder": {
      color: "#606060",
    },
    "&:hover": {
      backgroundColor: "#202020",
    },
  },
});

export default function Header(props) {
  const classes = useStyles();

  return (
    <>
      <Dialog
        onClose={props.handleCancel}
        aria-labelledby="simple-dialog-title"
        open={props.isUploadFormVisible}
        /* PaperProps={{
          style: {
            backgroundColor: "#121212",
          },
        }} */
      >
        <Grid container className="dialog px-6 pb-6 pt-4">
          <Grid item xs={12} className="flex justify-between items-center pb-4">
            <h3 className="form-header font-semibold ">Upload Video</h3>
            <IconButton
              aria-label="close"
              className={"close-button"}
              style={{ marginRight: "-1rem" }}
              onClick={props.handleCancel}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <UploadForm
              onClose={props.handleCancel}
              refresh={props.refresh}
              genres={props.genres}
            />
          </Grid>
        </Grid>
      </Dialog>
      <nav className={`${Styles.navWrapper}`}>
        <Link to="/">
          <div className={`${Styles.brandWrapper} order-1`}>
            <img className="w-20 text-white p-0 m-0" src={logo} alt="logo" />
          </div>
        </Link>
        {props.isSearchVisible && (
          <div className="searchWrapper md:w-1/4 md:mx-0 order-3 md:order-2 w-full mx-auto mt-6 md:my-0">
            <div
              className={`flex justify-end`}
              style={{ border: "2px solid #606060", borderRadius: ".375rem" }}
            >
              <InputBase
                placeholder="Search…"
                className="w-full text-[#606060]"
                classes={{
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
              <div className="flex justify-center items-center bg-[#313131] px-2 rounded-r-md cursor-pointer">
                <div className="px-2 ">
                  <SearchIcon color="#606060" />
                </div>
              </div>
            </div>
          </div>
        )}
        {props.isUploadVisible ? (
          <div className="uploadWrapper order-2 md:order-3">
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                component="span"
                className={classes.root}
                onClick={props.handleUploadButton}
              >
                <span className="md:pr-2 py-1 text-black">
                  <MdFileUpload />
                </span>
                <span className="hidden md:block text-black normal-case	">
                  Upload
                </span>
              </Button>
            </ThemeProvider>
          </div>
        ) : (
          <div></div>
        )}
      </nav>
    </>
  );
}
