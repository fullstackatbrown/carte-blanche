import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import IContent from "../../../types/IContent";
import TipTapRead from "../../../src/components/TipTapRead";

export default function Home() {
    const { query, isReady } = useRouter();
    const title = query.title;
    const content = query.content;

    if (!isReady) {
        return <div>Loading content</div>;
    }

    // const [content, setContent] = useState<IContent>();

    // useEffect(() => {
    //     const getContent = async () => {
    //         const contentResponse = await fetch(
    //             "../../api/content/getContentById",
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     contentId: entry,
    //                 }),
    //             }
    //         );
    //         const contentJson = await contentResponse.json();
    //         setContent(contentJson.content);
    //     };
    //     getContent();
    // }, []);

    const buffer = content ? content : "";
    const actualContent = typeof buffer === "string" ? buffer : "";
    console.log(actualContent);

    return (
        <>
            <h2>
                <Link href="../../textContent">back to home </Link>
            </h2>
            <h1>{title}</h1>
            <TipTapRead document={actualContent} />
        </>
    );
}
