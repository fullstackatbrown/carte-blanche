import React from "react";
import Navbar from "../components/navbar";
import styles from "../styles/About.module.scss";

export default function about() {
    return (
        <>
            <Navbar />
            {/* ABOUT PAGE CONTENT */}
            <div className={styles.aboutContent}>
                <div className={styles.aboutContentTitle}>About</div>
                <div className={styles.aboutContentText}>
                    Carte Blanche is a student-run organization at the Brown
                    University that aims to provide a platform for students to
                    express themselves through art. By sharing our experiences
                    and creating a platform for expression, we hope to inspire
                    others to explore their own creativity.
                </div>
            </div>
        </>
    );
}
