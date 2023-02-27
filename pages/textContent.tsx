import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import TipTapRead from "../src/components/TipTapRead";
import IContent from "../types/IContent";
import Link from "next/link";

// import styles from "../styles/ScrollingGrid.module.scss";

const TextContent: NextPage = () => {
    const [data, setData] = useState([] as IContent[]);
    const [textData, setTextData] = useState([] as IContent[]);
    const [textIds, setTextIds] = useState<string[]>([]);
    const [textTitles, setTextTitles] = useState<string[]>([]);
    useEffect(() => {
        const getAllContent = async () => {
            const response = await fetch("./api/content/getAllContent", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            setData(json.content);

            // Filter for text content only
            const textContent = json.content.filter((ele: IContent) => {
                return ele.nodeType === "text";
            });
            setTextData(textContent);

            // get IDs
            // const ids = textData.map((ele: IContent) => {
            //     return ObjectId(ele);
            // });
            // setTextIds(ids);

            // get article titles
            // const titles = textContent.map((ele: IContent) => {
            //     return ele.title;
            // });
            // setTextTitles(titles);

            // get article content
            // const contents = textContent.map((ele: IContent) => {
            //     return ele.content;
            // });
            // setTextContent(contents);
        };
        getAllContent();
    }, []);
    return (
        <>
            {textData.map((entry: IContent, index: number) => (
                <>
                    <Link
                        href={{
                            pathname: `/articles/${entry._id}`,
                            query: {
                                title: entry.title,
                                content: entry.content,
                            },
                        }}
                    >
                        <div key={index}>{entry.title}</div>
                    </Link>
                </>
            ))}
        </>
    );
};

export default TextContent;
