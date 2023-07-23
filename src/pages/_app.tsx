import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inknut_Antiqua } from "next/font/google";
import { api } from "@CarteBlanche/utils/api";
import "@CarteBlanche/styles/globals.css";
import "@uploadthing/react/styles.css";

const inknut_antiqua = Inknut_Antiqua({
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={inknut_antiqua.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
