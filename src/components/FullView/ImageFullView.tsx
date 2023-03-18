import React from "react";
import IContent from "../../../types/IContent";
import Navbar from "../Navbar";
import ScrollingGrid from "../ScrollingGrid";
import styles from "./ImageFullView.module.scss";

export interface IImageFullViewProps {
    content: IContent;
}

export default function ImageFullView(props: IImageFullViewProps) {
    // destructure props
    const { content } = props;

    return (
        <div className={styles.body}>
            <Navbar />
            <div className={styles.menu}>
                <h3>vous avez</h3>
                <h1>CARTE BLANCHE</h1>
            </div>
            <div className={styles.scrollingGrid}>
                <img src={content.content} />
                {/* <ScrollingGrid
                    data={contents}
                    // data={imageContent}
                    // data={tempData}
                    height="100vh"
                    width="65vw"
                /> */}
            </div>
        </div>
    );
}
