import type { NextApiRequest, NextApiResponse } from "next";
import ConnectMongo from "../../../utils/ConnectMongo";
import Content from "../../../models/Content";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // connect to the database
    await ConnectMongo();
    // get the content id
    const contentId = req.body.id;
    const content = await Content.findOne({
        _id: contentId,
    });
    console.log(content);
    if (!content) {
        res.status(401).json({ name: "Could not find content" });
        return;
    }
    res.status(200).json({
        content: content,
    });
}
