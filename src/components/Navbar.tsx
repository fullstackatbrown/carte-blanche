import React from "react";
import styles from "./Navbar.module.scss";
import { FaBars } from "react-icons/fa";

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
                <a href="login">Login</a>
            </div>
            <div className={styles.navLinksMini} id="navLinksMini">
                <a href="pieces">Pieces</a>
                <a href="about">About</a>
                <a href="login">Login</a>
            </div>
            <div
                className={styles.hamburgerIcon}
                onClick={() => {
                    const sidebar = document.querySelector("#navLinksMini");
                    sidebar!.classList.toggle(styles.open);
                }}
            >
                <FaBars className={styles.hamburger} />
            </div>
        </div>
    );
}
