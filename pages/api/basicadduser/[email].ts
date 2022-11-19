import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("handler called");
    const { method } = req;
    const email = req.body.email;
    console.log("email" + email);

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                const user = User.findOne({ email: email });
                console.log("USER" + user);
                if (!user) {
                    const newUser = new User({ email: email });
                    newUser.save(function (err: any) {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: "failed to create user",
                            });
                        } else {
                            return res.status(200).json({ success: true });
                        }
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "User already exists",
                    });
                }
            } catch (error) {
                console.log(error);
                return res.status(400).json({ success: false });
            }
            break;
    }
}
