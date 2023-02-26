import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import TipTapRead from "../src/components/TipTapRead";

import styles from "../styles/ScrollingGrid.module.scss";

const Pieces: NextPage = () => {
    return (
        <>
            <div className={styles.body}>
                <Navbar />
            </div>
            <TipTapRead />
        </>
    );
};

export default Pieces;
