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

const getMonth = (month: number) => {
    if (month === 1) return "January";
    else if (month == 2) return "February";
    else if (month == 3) return "March";
    else if (month == 4) return "April";
    else if (month == 5) return "May";
    else if (month == 6) return "June";
    else if (month == 7) return "July";
    else if (month == 8) return "August";
    else if (month == 9) return "September";
    else if (month == 10) return "October";
    else if (month == 11) return "November";
    else if (month == 12) return "December";
};

const getHour = (hour: number) => {
    return (hour + 24 - 4) % 24;
};

const getAMOrPM = (hour: number) => {
    if (hour < 12) return "AM";
    else return "PM";
};

/**
 * Function to format the date from a Date object
 * @param date Date object
 * @returns date in format "Month Day, Year"
 */
const formatDate = (date: Date) => {
    const stringDate = date.toLocaleString();
    const month = getMonth(Number(stringDate.slice(5, 7)));
    const day = stringDate.slice(8, 10);
    const year = stringDate.slice(0, 4);
    return `${month} ${day}, ${year}`;
};

/**
 * Function to format the time from a Date object
 * @param date Date object
 * @returns time in format "Hour:Minute [AM/PM]"
 */
const formatTime = (date: Date) => {
    const stringDate = date.toLocaleString();
    const hour = getHour(Number(stringDate.slice(11, 13)));
    const minute = stringDate.slice(14, 16);
    return `${hour % 12}:${minute} ${getAMOrPM(Number(hour))}`;
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
