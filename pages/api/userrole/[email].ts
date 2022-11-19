import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("handler called");
    const { query: email, method } = req;
    console.log("email" + email);

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const user = User.findOne({ email: email });
                if (!user) {
                    console.log("No user exists");
                    return res
                        .status(400)
                        .json({ success: false, message: "User not found" });
                }
                return res.status(200).json({ success: true, role: user });
            } catch (error) {
                console.log(error);
                return res
                    .status(400)
                    .json({ success: false, message: "An error occurred" });
            }
            break;
    }
}
