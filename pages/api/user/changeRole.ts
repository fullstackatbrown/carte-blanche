import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ConnectMongo from "../../../utils/ConnectMongo";

import User, { Role } from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // connect to the database
    await ConnectMongo();
    // get the user's session and role
    // const session = await getServerSession(req, res, authOptions);
    const userEmail: string = req.body.email;
    const newRole: Role = req.body.role;
    // update the user to the new role
    const user = await User.updateOne(
        {
            email: userEmail,
        },
        {
            role: newRole,
        }
    );
    if (!user) {
        res.status(401).json({ name: "Not logged in" });
        return;
    }
    res.status(200).json({
        msg: "it worked -- user is now admin",
        user: user,
    });
}
