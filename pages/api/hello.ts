// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ConnectMongo from "../../utils/connectMongo";

import User, { Role } from "../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("CONNECTING TO MONGO");
    await ConnectMongo();
    console.log("CONNECTED TO MONGO");

    const session = await getServerSession(req, res, authOptions);
    console.log("LOOK BELOW");
    console.log(session!.user);
    // console.log("session: ", session);
    // if (!session) {
    //     res.status(401).json({ message: "You must be logged in." });
    //     return;
    // }

    // return res.json({
    //     message: "Success",
    // });

    // update the user to be an admin
    const user = await User.updateOne(
        {
            email: session?.user?.email,
        },
        {
            role: Role.Admin,
        }
    );
    if (!user) {
        res.status(401).json({ name: "Not logged in" });
    }
    res.status(200).json({
        msg: "it worked -- user is now admin",
        user: user,
    });
}
