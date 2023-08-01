import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inknut_Antiqua, Inter } from "next/font/google";
import { api } from "@CarteBlanche/utils/api";
import "@CarteBlanche/styles/globals.css";
import "@uploadthing/react/styles.css";

const inknut_antiqua = Inknut_Antiqua({
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const inter = Inter({
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      {/* <style jsx global>
          html, p, span {
            font-family: ${inter.style.fontFamily};
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: ${inknut_antiqua.style.fontFamily};
          }
        `}
      </style> */}
      <SessionProvider session={session}>
        <main>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
