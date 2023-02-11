import React, { useEffect, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import IContent from "../types/IContent";
import { useRouter } from "next/router";

const MyPage: NextPage = () => {
    const router = useRouter();
    const contentId = router.query.contentId;

    // State to store the content
    const [content, setContent] = useState<IContent>();

    useEffect(() => {
        const getContent = async () => {
            // API call to get the content by its ID
            const contentResponse = await fetch("/api/content/getContentById", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contentId: contentId,
                }),
            });
            const contentJson = await contentResponse.json();
            setContent(contentJson.user);
            console.log(contentJson);
        };
        getContent();
    }, []);

    // API call to get the content info by its ID
    // Check if contentId is a string
    if (typeof contentId !== "string") {
        return <div>Invalid content ID</div>;
    }

    return (
        <>
            {/* Loading screen if content is undefined */}
            {/* {!content.data ? (
                <div>Loading...</div>
            ) : (
                <Dorm
                    id={building.data.id}
                    name={building.data.name}
                    areaName={building.data.areaName}
                    summary={building.data.summary}
                    location={building.data.address}
                    sublocations={building.data.sublocations}
                    floorplans={building.data.FloorPlan}
                    reviews={building.data.Review}
                    images={building.data.Media.map((media) => media.url)}
                    refetch={() => void building.refetch()}
                />
            )} */}
            hello
        </>
    );
};

export default MyPage;
