import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { FaBars } from "react-icons/fa";
import React from "react";
import Navbar from "../src/components/Navbar";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
    const { data: session, status } = useSession();
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
                        href="/pieces"
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
