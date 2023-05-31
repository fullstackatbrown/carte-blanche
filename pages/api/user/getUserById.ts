import type { NextApiRequest, NextApiResponse } from "next";
import ConnectMongo from "../../../utils/ConnectMongo";
import User from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // connect to the database
    await ConnectMongo();
    // get the content id from the query param
    const userId = req.query.id;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
        res.status(401).json({ name: "Could not find user" });
        return;
    }
    res.status(200).json({
        user: user,
    });
}
