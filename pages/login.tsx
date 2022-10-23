import React from 'react';

import { useSession, signIn, signOut } from 'next-auth/react';


export default function Login() {
    const {data: session} = useSession();

    if (session) {
        // already logged in
        if (session.user === undefined) {
            console.log("This should never happen!")
            return <div>An unexpected error occurred while logging you in!</div>
        } else {
            return (
                <div>
                    <h2>Welcome, {session.user.name}</h2>
                    <button onClick={() => signOut()}>Sign Out</button>
                </div>
            )
        }
    } else {
        return (
            <div>
                <h2>You are not signed in!</h2>
                <button onClick={() => signIn()}>Sign In</button>
            </div>
        )
    }
}