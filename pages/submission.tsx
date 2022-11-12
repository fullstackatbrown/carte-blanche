import React from "react";
import { useSession, getSession, GetSessionParams } from "next-auth/react";
import { IUser, User } from "../models/User";

export default function Submission() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        const role: string | number = checkRole(session.user!.email);
        if (typeof role === "string") {
            return <p>You do not have access!</p>;
        }
        return (
            <div>
                <h2>Welcome {session.user!.name}</h2>
                <h3>This is the submission page!</h3>
            </div>
        );
    }
}

function checkRole(email: string | null | undefined): string | number {
    User.findOne({ email: email }, function (err: any, user: IUser) {
        if (err) {
            return "Error";
        }
        return user.role;
    });
    return "Error: no user found";
}

export async function getServerSideProps(context: GetSessionParams) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/login",
            },
        };
    }
    return {
        props: { session },
    };
}
