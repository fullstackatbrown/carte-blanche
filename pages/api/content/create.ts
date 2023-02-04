import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ConnectMongo from "../../../utils/ConnectMongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // connect to the database
    await ConnectMongo();
}
