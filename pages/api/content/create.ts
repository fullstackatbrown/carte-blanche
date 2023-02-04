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
    // const email: string = req.body.email;
    const reqContent: string = req.body.content;
    const nodeType = req.body.nodeType;
    const author: string = req.body.author;
    const dateCreated: Date = req.body.dateCreated;
    const lastUpdated: Date = req.body.lastUpdated;

    const content = await Content.create({
        // email: session?.user?.email,
        title: title,
        author: author,
        // email: email,
        nodeType: nodeType,
        content: reqContent,
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
