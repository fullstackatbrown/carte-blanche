import TopNav from "@CarteBlanche/components/TopNav";
import React from "react";

export default function Pieces() {
  return (
    <>
      <TopNav />
      <div>Pieces</div>
      <button className="bg-slate-300">
        <a href="./upload">Click me to Upload!</a>
      </button>
    </>
  );
}
