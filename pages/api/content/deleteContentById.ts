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
    // Delete the content from the database by id
    const deleteResponse = await Content.deleteOne({ _id: contentId });
    if (!deleteResponse) {
        res.status(401).json({ name: "Could not delete content" });
        return;
    }
    res.status(200).json({
        deleteResponse: deleteResponse,
    });
}
