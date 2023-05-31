import React, { useEffect, useState } from "react";
import IContent from "../../../types/IContent";
import Navbar from "../Navbar";
import styles from "./TextFullView.module.scss";
import TipTapRead from "../TipTapRead";
import IUser from "../../../types/IUser";
import { FaArrowLeft } from "react-icons/fa";

export interface ITextFullViewProps {
    content: IContent;
}

const formatDate = (date: Date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
};

const formatTime = (date: Date) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(date).toLocaleTimeString(undefined, options);
};

export default function TextFullView(props: ITextFullViewProps) {
    // destructure props
    const { content } = props;

    const [author, setAuthor] = useState({} as IUser);

    useEffect(() => {
        const getUser = async () => {
            const userResponse = await fetch(
                `/api/user/getUserById?id=${content.author}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const userJson = await userResponse.json();
            setAuthor(userJson.user);
        };
        getUser();
    }, [content]);

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
                    <h1 className={styles.title}>
                        <strong>{content.title}</strong> | {author.name}
                    </h1>
                    <p className={styles.date}>
                        {formatDate(content.dateCreated)}
                        &nbsp;at {formatTime(content.dateCreated)}
                    </p>
                    <img className={styles.image} src={content.imageContent} />
                    <p className={styles.imageCaption}>
                        Caption: {content.caption}
                    </p>
                    <TipTapRead document={content.textContent}></TipTapRead>
                </div>
            </div>
        </div>
    );
}
