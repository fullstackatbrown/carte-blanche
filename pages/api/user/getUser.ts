import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ConnectMongo from "../../../utils/ConnectMongo";
import User from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // connect to the database
    await ConnectMongo();
    // get the user from session
    const session = await getServerSession(req, res, authOptions);
    const user = await User.findOne({
        email: session?.user?.email,
    });
    if (!user) {
        res.status(401).json({ name: "Not logged in" });
        return;
    }
    res.status(200).json({
        user: user,
    });
}
