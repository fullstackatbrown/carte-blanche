import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home2.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

const Home: NextPage = () => {
  const [openMenubar, setOpenMenubar] = React.useState(false);

  return (
    <div className={styles.topNavigation} id="a">
      <a href="">
        <img
          className={styles.logo}
          alt="logo"
          src="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg"
        />
      </a>
      <div className="space" />
      <div className={styles.navLinks} id="c">
        <a href="pieces">
          Pieces
          {/* <LinkedIn /> */}
        </a>
        <a href="about">About</a>
        <a href="join">Join</a>
      </div>
      <div
        className={styles.hamburgerIcon}
        id="b"
        onClick={() => {
          // alert("clicked");
          let sidebar = document.querySelector("#c");
          // alert(sidebar);
          let toggle = document.querySelector("#b");
          if (openMenubar) {
            sidebar?.classList.add("collapsed");
          } else {
            sidebar?.classList.remove("collapsed");
          }
          setOpenMenubar(!openMenubar);
        }}
      >
        <MenuIcon className={styles.hamburger} id="d" />
      </div>
    </div>
  );
};

export default Home;
