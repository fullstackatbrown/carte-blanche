import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    console.log("handler called");
    // const { query: email, method } = req;
    const {
        query: { email },
        method,
    } = req;
    console.log("email: " + email);

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const user = await User.findOne({ email: email });
                console.log("user: " + user);
                if (!user) {
                    console.log("No user found!")
                    return res.status(400).json({ success: false, message: "User not found" });
                }
                res.status(200).json({ success: true, user: user });
            } catch (error) {
                console.log("Error: " + error);
                res.status(400).json({ success: false, message: "Error getting user" });
            }
            break;
        }
    }
