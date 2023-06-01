import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import TipTapRead from "../../../src/components/TipTapRead";
import type { NextPage } from "next";
import styles from "../../../styles/article.module.scss";

const Article: NextPage = () => {
    const { query, isReady } = useRouter();
    const title = query.title;
    const date = query.date;
    const content = query.content;

    if (!isReady) {
        return <div>Loading content</div>;
    }

    // diabolical way of making query a string
    const buffer = content ? content : "";
    const actualContent = typeof buffer === "string" ? buffer : "";

    return (
        <>
            {" "}
            <div className={styles.homeContent}>
                <h2>
                    <Link href="../../textContent">...back to home </Link>
                </h2>
                <div className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                    <h2>at {date} </h2>
                </div>
                <div className={styles.content}>
                    <TipTapRead document={actualContent} />
                </div>
            </div>
        </>
    );
};

export default Article;
