import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Navbar from "../components/navbar";

const Home: NextPage = () => {
    return (
        <>
            <Navbar />
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
