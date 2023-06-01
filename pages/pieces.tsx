import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import ScrollingGrid from "../src/components/ScrollingGrid";
import styles from "../styles/Pieces.module.scss";
import IContent from "../types/IContent";

const Pieces: NextPage = () => {
    const [contents, setContents] = useState([] as IContent[]);

    useEffect(() => {
        const getAllContent = async () => {
            const response = await fetch("/api/content/getAllContent", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            setContents(json.content);
        };
        getAllContent();
    }, []);

    return (
        <div className={styles.body}>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.menu}>
                    <h3>vous avez</h3>
                    <h1>CARTE BLANCHE</h1>
                </div>
                <div className={styles.scrollingGrid}>
                    <ScrollingGrid
                        data={contents}
                        height="calc(100vh - 5em)"
                        width="64vw"
                    />
                </div>
            </div>
        </div>
    );
};

export default Pieces;
