import React, { useEffect, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import IContent from "../../types/IContent";
import { useRouter } from "next/router";
import ImageFullView from "../../src/components/FullView/ImageFullView";
import TextFullView from "../../src/components/FullView/TextFullView";

const MyPage: NextPage = () => {
    const router = useRouter();
    const contentId = router.query.contentId;

    // State to store the content
    const [content, setContent] = useState<IContent>();

    useEffect(() => {
        const getContent = async () => {
            // API call to get the content by its ID
            if (!contentId) return;
            const contentResponse = await fetch(
                `/api/content/getContentById?id=${contentId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const contentJson = await contentResponse.json();
            setContent(contentJson.content);
        };
        getContent();
    }, [contentId]);

    // API call to get the content info by its ID
    // Check if contentId is a string
    if (typeof contentId !== "string") {
        return <div>Invalid content ID</div>;
    }

    return (
        <>
            {/* Loading screen if content is undefined */}
            {!content ? (
                <div>Loading...</div>
            ) : (
                <>
                    {content.nodeType === "image" ? (
                        <ImageFullView content={content} />
                    ) : content.nodeType === "text" ? (
                        <TextFullView content={content} />
                    ) : (
                        <div>Invalid content type</div>
                    )}
                </>
            )}
        </>
    );
};

export default MyPage;
