import type { NextApiRequest, NextApiResponse } from "next";
import ConnectMongo from "../../../utils/ConnectMongo";
import Content from "../../../models/Content";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // connect to the database
    await ConnectMongo();
    // get the content id from the query param
    const contentId = req.query.id;
    console.log(contentId);
    const content = await Content.findById(contentId);
    if (!content) {
        res.status(401).json({ name: "Could not find content" });
        return;
    }
    res.status(200).json({
        content: content,
    });
}
