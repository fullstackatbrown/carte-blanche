import React, { useState } from "react";
import { useSession, getSession, GetSessionParams } from "next-auth/react";
import { IUser, userSchema, User } from "../models/User";
import RichTextEditor, { EditorValue } from "react-rte";
import mongoose, { model, Model } from "mongoose";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("./TextEditor"), {
    ssr: false,
});

// var User = model("User", userSchema);

mongoose.connect("mongodb://localhost:27017/testDB");

async function checkRole(email: string) {
    const user = await User.findOne({ email: email });
    // User.findOne({ email: email }, function (err: any, user: IUser) {
    //     if (err) {
    //         return "Error";
    //     }
    //     return user.role;
    // });
    // return "Error: no user found";
    const userRole: string | undefined = user?.role;
    if (userRole === undefined) {
        return "Error";
    }
    return userRole;
}

export default async function Submission() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        const role = await checkRole(session.user!.email!);
        if (role !== "Admin" && role !== "Writer") {
            return <p>You do not have access!</p>;
        }
        return (
            <div>
                <h2>Welcome {session.user!.name}</h2>
                <h3>This is the submission page!</h3>
                <TextEditor />
            </div>
        );
    }
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
