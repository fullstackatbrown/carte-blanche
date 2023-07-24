import Head from "next/head";
import TopNav from "@CarteBlanche/components/TopNav";
import About from "@CarteBlanche/components/sections/About";

export default function Home() {
  return (
    <>
      <Head>
        <title>Carte Blanche</title>
      </Head>

      <main className="scroll-smooth">
        <TopNav />

        <section
          id="home"
          className="flex min-h-screen items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0.15)
        ),
        url(https://www.pngkey.com/png/full/434-4345150_ink-splatter-ink.png)`,
          }}
        >
          <div className="pb-4 lowercase leading-7 text-black">
            <h2 className="text-4xl">Carte Blanche</h2>
            <p>[kahrt blanch] french for &ldquo;white card&rdquo;</p>
            <p>(n.) complete freedom to act as one wishes</p>
          </div>
        </section>

        <section id="about">
          <About />
        </section>
      </main>
    </>
  );
}
