import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ConnectMongo from "../../../utils/ConnectMongo";
import Content from "../../../models/Content";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // connect to the database
    await ConnectMongo();
    // insert the content into the database
    console.log("backend");
    console.log(req.body);
    const title: string = req.body.title;
    const author: string = req.body.author;
    const nodeType = req.body.nodeType;
    const imageContent: string = req.body.imageContent;
    const caption: string = req.body.caption;
    const textContent: string = req.body.textContent;
    const dateCreated: Date = req.body.dateCreated;
    const lastUpdated: Date = req.body.lastUpdated;

    const content = await Content.create({
        // email: session?.user?.email,
        title: title,
        author: author,
        // email: email,
        nodeType: nodeType,
        imageContent: imageContent,
        caption: caption,
        textContent: textContent,
        dateCreated: dateCreated,
        lastUpdated: lastUpdated,
    });
    if (!content) {
        res.status(401).json({ msg: "Could not create content" });
        return;
    }
    res.status(200).json({
        content: content,
    });
}
