import React from "react";
import Styles from "./Header.module.scss";
import logo from "../../assets/logo.png";

import UploadModal from "../UploadModal";

import { makeStyles } from "@material-ui/core/styles";
import { MdSearch as SearchIcon } from "react-icons/md";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles({
  root: {
    border: "10px solid black",
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

export default function Header() {
  const classes = useStyles();

  return (
    <nav className={`${Styles.navWrapper}`}>
      <div className={`${Styles.brandWrapper} order-1`}>
        <img className="w-20 text-white p-0 m-0" src={logo} alt="logo" />
      </div>
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
      <div className="uploadWrapper order-2 md:order-3">
        <UploadModal />
      </div>
    </nav>
  );
}
