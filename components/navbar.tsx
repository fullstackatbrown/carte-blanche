import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Navbar.module.scss";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
    return (
        <div className={styles.topNavigation}>
            <a href="">
                <img
                    className={styles.logo}
                    alt="logo"
                    src="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg"
                />
            </a>
            <div className="space" />
            <div className={styles.navLinks}>
                <a href="pieces">Pieces</a>
                <a href="about">About</a>
                <a href="join">Join</a>
            </div>
            <div className={styles.navLinksMini} id="navLinksMini">
                <a href="pieces">Pieces</a>
                <a href="about">About</a>
                <a href="join">Join</a>
            </div>
            <div
                className={styles.hamburgerIcon}
                onClick={() => {
                    let sidebar = document.querySelector("#navLinksMini");
                    sidebar!.classList.toggle(styles.open);
                }}
            >
                <MenuIcon className={styles.hamburger} />
            </div>
        </div>
    );
}
