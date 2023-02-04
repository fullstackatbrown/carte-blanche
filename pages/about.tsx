import type { NextPage } from "next";
import React from "react";
import Navbar from "../src/components/Navbar";

const About: NextPage = () => {
    return (
        <>
            <Navbar />
            <h1>This is Carte Blanche</h1>
            <h1>Our Mission</h1>
            <p>Lorem epsum..</p>
        </>
    );
};

export default About;
