import React from "react";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
    const { data: session } = useSession();

    if (session) {
        // already logged in
        return (
            <div>
                <h2>Welcome, {session.user!.name}</h2>
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        );
    }
    return (
        <div>
            <h2>You are not signed in!</h2>
            <button onClick={() => signIn()}>Sign In</button>
        </div>
    );
}
