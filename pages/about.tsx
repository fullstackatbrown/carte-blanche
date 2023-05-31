import type { NextPage } from "next";
import React from "react";
import Navbar from "../src/components/Navbar";
import styles from "../styles/About.module.scss";

const About: NextPage = () => {
    return (
        <>
            <Navbar />
            <div className={styles.aboutContainer}>
                <h1>Learn about Carte Blanche</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </div>
        </>
    );
};

export default About;
