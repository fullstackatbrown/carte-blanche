import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import GridItem from "../components/GridItem";
import styles from "../styles/parallax.module.css";
import $ from "jquery";
//import { Helmet } from "react-helmet";

const parallax = () => {
    useEffect(() => {
        const columns = document.querySelector("#columns");
        //const columnReverse =
        //document.querySelectorAll<HTMLElement>("#columnReverse div");

        const columnReverse =
            document.querySelector<HTMLElement>("#columnReverse");
        const columnReverseContainer = document.querySelector<HTMLElement>(
            "#columnReverseContainer"
        );

        columns.addEventListener("scroll", (event) => {
            var offset = columns?.scrollTop;
            // for (var i = 0; i < columnReverse.length; i++) {
            //     columnReverse[i].style.transform = `translateY(${offset}px)`;
            //     columnReverse[i].style.backgroundColor = "green";
            // }
            columnReverseContainer.style.transform = `translateY(${offset}px)`;
            columnReverse.style.transform = `translateY(${offset}px)`;
        });
    });

    return (
        <div className={styles.columns} id="columns">
            <div className={styles.column}>
                <div className={styles.columnItem}>1</div>
                <div className={styles.columnItem}>2</div>
                <div className={styles.columnItem}>3</div>
                <div className={styles.columnItem}>4</div>
                <div className={styles.columnItem}>5</div>
                <div className={styles.columnItem}>6</div>
            </div>
            <div
                className={`${styles.column} ${styles.columnReverse}`}
                id="columnReverse"
            >
                <div
                    className={`${styles.columnReverseContainer}`}
                    id="columnReverseContainer"
                >
                    <div className={styles.columnItem}>1</div>
                    <div className={styles.columnItem}>2</div>
                    <div className={styles.columnItem}>3</div>
                    <div className={styles.columnItem}>4</div>
                    <div className={styles.columnItem}>5</div>
                    <div className={styles.columnItem}>6</div>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.columnItem}></div>
                <div className={styles.columnItem}></div>
                <div className={styles.columnItem}></div>
                <div className={styles.columnItem}></div>
                <div className={styles.columnItem}></div>
                <div className={styles.columnItem}></div>
            </div>
            {/* <Helmet>
                <script type="module" src="parallax-scripts.js"></script>
            </Helmet> */}
        </div>
    );
};

export default parallax;
