import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ConnectMongo from "../../../utils/ConnectMongo";
import Content from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // connect to the database
    await ConnectMongo();
    // get all the users
    const content = await Content.find();
    if (!content) {
        res.status(401).json({ msg: "Problem with getting content" });
        return;
    }
    res.status(200).json({
        content: content,
    });
}
