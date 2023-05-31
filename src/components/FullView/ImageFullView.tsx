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
            <div className={styles.pageContainer}>
                {/* <FaArrowLeft className={styles.backButton} /> */}
                <div className={styles.menu}>
                    <h3>vous avez</h3>
                    <h1>CARTE BLANCHE</h1>
                </div>
                <div className={styles.textContentContainer}>
                    {/* <h1 className={styles.title}>
                        <strong>{content.title}</strong> | {author.name}
                    </h1> */}
                    {/* <p className={styles.date}>
                        {formatDate(content.dateCreated)}
                        &nbsp;at {formatTime(content.dateCreated)}
                    </p>
                    <img className={styles.image} src={content.imageContent} />
                    <p className={styles.imageCaption}>
                        Caption: {content.caption}
                    </p>
                    <TipTapRead document={content.textContent}></TipTapRead> */}
                </div>
            </div>
        </div>
    );
}
