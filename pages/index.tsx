import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { FaBars } from "react-icons/fa";
import React from "react";
import Navbar from "../src/components/Navbar";
import { useSession } from "next-auth/react";
import About from "./about";
import FeaturedContent from "../src/components/FeaturedContent";

const Home: NextPage = () => {
    const { data: session, status } = useSession();
    return (
        <>
            <Navbar />
            {/* HOME PAGE CONTENT */}
            <section className={styles.homeContent}>
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
                        data-back="Dive in"
                        data-front="Be bold"
                    />
                </div>
            </section>
            {/* FEATURES PAGE CONTENT */}
            <section>
                <FeaturedContent />
            </section>
            {/* ABOUT PAGE CONTENT */}
            <section>
                <About />
            </section>
        </>
    );
};

export default Home;
