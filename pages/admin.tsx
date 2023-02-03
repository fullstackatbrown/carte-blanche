import type { NextPage } from "next";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import React from "react";
import Navbar from "../src/components/Navbar";

const Admin: NextPage = () => {
    // const { data: session, status } = useSession({ required: true });
    const { data: session, status } = useSession();
    return (
        <>
            <Navbar />
            {status === "authenticated" ? (
                <div>
                    <h1>Admin Page</h1>
                    <p>Logged in as {session.user!.name}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <p> You need to be signed in to view this page</p>
                </div>
            )}
        </>
    );
};

export default Admin;

// export const getServerSideProps = async (
//     context: GetSessionParams | undefined
// ) => {
//     const session = await getSession(context);
//     return {
//         props: {
//             session,
//         },
//     };
// };
