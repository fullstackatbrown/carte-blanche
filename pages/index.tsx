import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

const Home: NextPage = () => {
    return (
        <>
            {/* Navigation Bar */}
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

            {/* HOME PAGE CONTENT */}
            <div className={styles.homeContent}>
                <div className={styles.homeContentTitle}>Carte Blanche</div>
                <div className={styles.homeContentText}>
                    [kahrt blanch] French for “white card”
                </div>
                <div className={styles.homeContentText}>
                    (n.) complete freedom to act as one wishes
                </div>
                <div className={styles.homeContentButtonContainer}>
                    <div className="space"></div>
                    <a
                        href=""
                        className={styles.btnFlip}
                        data-back="Be bold"
                        data-front="Dive in"
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
