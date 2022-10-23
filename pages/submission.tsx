import React from 'react';
import { useSession, getSession, GetSessionParams } from 'next-auth/react';

export default function Submission() {
    const {data: session, status} = useSession();

    if (status === "authenticated") {
        if (session.user === undefined) {
            console.log("Unexpected error!");
            return <div>An unexpected error occurred while verifying if you are signed in!</div>
        }  else {
            return (
                <div>
                    <h2>Welcome {session.user.name}</h2>
                    <h3>This is the submission page!</h3>
                </div>
            )
        }
    }
};


export async function getServerSideProps(context: GetSessionParams) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login'
            }
        }
    }
    return {
        props: {session},
    }
}