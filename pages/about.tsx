import type { NextPage } from "next";
import React from "react";
import Navbar from "../src/components/Navbar";

const Home: NextPage = () => {
    return (
        <>
            <Navbar />
            <h1>This is Carte Blanche</h1>
        </>
    );
};

export default Home;
