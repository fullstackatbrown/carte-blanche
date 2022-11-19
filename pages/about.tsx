import React from "react";
import styles from "../styles/Home.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import stylesAbout from "../styles/About.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";

export default function About() {
    const { data: session } = useSession(); //what does this mean, is this needed in the about section?

    return (
        <>
            {/* Navigation Bar */}
            <div className={styles.topNavigation}>
                <a href="">
                    <img
                        className={styles.logo}
                        alt="logo"
                        src="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg"
                    />
                </a>
                <div className="space" />
                <div className={styles.navLinks}>
                    <a href="pieces">Pieces</a>
                    <a href="about">About</a>
                    <a href="login">Login</a>
                </div>
                <div className={styles.navLinksMini} id="navLinksMini">
                    <a href="pieces">Pieces</a>
                    <a href="about">About</a>
                    <a href="login">Login</a>
                </div>
                <div
                    className={styles.hamburgerIcon}
                    onClick={() => {
                        let sidebar = document.querySelector("#navLinksMini");
                        sidebar!.classList.toggle(styles.open);
                    }}
                >
                    <MenuIcon className={styles.hamburger} />
                </div>
            </div>


            {/* About Content */}
            <div className={stylesAbout.aboutContent}>
                <div>
                    <p className={stylesAbout.h1}>
                        Decolonization
                    </p>
                </div>

                {/* Definitions/Basic Info for those that are very new  */}
                <div className={stylesAbout.aboutSubsection}>
                    <p className={stylesAbout.h2}>
                        Information and Resources
                    </p>
                    <p className={stylesAbout.h3}>
                        Important Definitions
                    </p>
                    <p className={stylesAbout.h3}>
                        Links to Learn More
                    </p>

                </div>

                {/* About Carte Blanche */}
                <div className={stylesAbout.aboutSubsection}>
                    <p className={stylesAbout.h2}>
                        Carte Blanche
                    </p>

                    <p className={stylesAbout.h3}>
                        Our Mission
                    </p>

                    <p className={stylesAbout.h3}>
                        What We Do
                    </p>
                    <p className={stylesAbout.p1}>
                        Content is dedicated to uplifted silenced voices...Explaining how Carte Blanche aligns with decolonization efforts...
                        This is where should disclose the structure of the mag if it is in fact hierarchical
                    </p>


                    <p className={stylesAbout.h3}>
                        How to Join
                    </p>
                    <p className={stylesAbout.p1}>
                        Information about what to do if somebody wants to post, be a part of the administrative side of things, or get in contact... etc.
                    </p>

                </div>


                {/* Action-Oriented, Outside of Carte Blanche */}
                <div className={stylesAbout.aboutSubsection}>
                    <p className={stylesAbout.h2}>
                        Take Action Beyond Carte Blanche
                    </p>
                    <p className={stylesAbout.h3}>
                        Boycot, Divestment, and Sanctions
                    </p>
                    <p className={stylesAbout.h3}>
                        Protest
                    </p>
                    <p className={stylesAbout.h3}>
                        Mutual Aid
                    </p>


                </div>






            </div>
        </>

    )
}