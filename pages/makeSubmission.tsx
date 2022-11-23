import React, { useEffect, useState } from "react";
import { useSession, getSession, GetSessionParams } from "next-auth/react";
import User, { IUser } from "../models/User";
import RichTextEditor, { EditorValue } from "react-rte";
import mongoose, { model, Model, models } from "mongoose";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TextEditor = dynamic(() => import("./TextEditor"), {
    ssr: false,
});

// // var User = model("User", userSchema);
// const password = process.env.PASSWORD;

// // mongoose.connect(
// //     `mongodb+srv://carteblanche:${password}@carteblanche1.ftoanln.mongodb.net/?retryWrites=true&w=majority`
// // );

// async function checkRole(email: string) {
//     console.log("began checkRole");
//     await mongoose.connect(
//         `mongodb+srv://carteblanche:${password}@carteblanche1.ftoanln.mongodb.net/?retryWrites=true&w=majority`
//     );
//     const user = await UserModel.findOne({ email: email });
//     console.log("user" + user);
//     // User.findOne({ email: email }, function (err: any, user: IUser) {
//     //     if (err) {
//     //         return "Error";
//     //     }
//     //     return user.role;
//     // });
//     // return "Error: no user found";
//     const userRole: string | undefined = user?.role;
//     if (userRole === undefined) {
//         return "Error";
//     }
//     console.log("role: " + userRole);
//     return userRole;
// }

export default function Submission() {
    const { data: session, status } = useSession();
    const [role, setRole] = useState("");

    const router = useRouter();
    console.log("status" + status);

    if (status !== "authenticated") {
        console.log("not auth");
        return <p>You do not have access!</p>;
    }

    // useEffect(() => {
    //     checkRole(session.user!.email!).then((role) => setRole(role));
    // });

    if (status === "authenticated") {
        const { data, error } = useSwr<>(
            `/api/userrole/${session.user!.email}`,
            fetcher
        );
        // checkRole(session.user!.email!).then((role) => setRole(role));
        if (error) {
            console.log(error.message);
            return <div>Failed to fetch user data</div>;
        } else if (!data) {
            return <div>Loading...</div>;
        }
        console.log("DATA: " + data.user.role);
        if (data.user.role !== "Admin" && data.user.role !== "Writer") {
            return <p>Incorrect role: You do not have access!</p>;
        }
        return (
            <div>
                <h2>Welcome {session.user!.name}</h2>
                <h3>This is the submission page!</h3>
                <TextEditor />
            </div>
        );
    }

    // if (status === "authenticated") {
    //     // checkRole(session.user!.email!).then((role) => setRole(role));
    //     if (role !== "Admin" && role !== "Writer") {
    //         return <p>You do not have access!</p>;
    //     }
    //     return (
    //         <div>
    //             <h2>Welcome {session.user!.name}</h2>
    //             <h3>This is the submission page!</h3>
    //             <TextEditor />
    //         </div>
    //     );
    // }
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
