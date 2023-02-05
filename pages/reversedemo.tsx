// import React, { useState, useEffect } from "react";

// const tempData = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];

// // returns the breakpoint from a given screen width
// const getBreakpoint = (size: number): string => {
//     if (size >= 0 && size < 576) {
//         return "xs";
//     } else if (size >= 576 && size < 768) {
//         return "sm";
//     } else if (size >= 768 && size < 992) {
//         return "md";
//     } else if (size >= 992 && size < 1200) {
//         return "xl";
//     } else {
//         return "xxl";
//     }
// };

// // figures out how many columns we should have based on breakpoints
// const getNumColumns = (size: number): number => {
//     let breakpoint: string = getBreakpoint(size);
//     if (breakpoint === "xs") {
//         return 1;
//     } else if (breakpoint === "sm" || breakpoint === "md") {
//         return 2;
//     } else {
//         return 3;
//     }
// };

// const reversedemo = () => {
//     const [width, setWidth] = useState(0);
//     const [scrollDelta, setScrollDelta] = useState(0);
//     // columns should be a 2d array of strings, but we don't know
//     // how big of a 2d array we should have when we initialize
//     const [columns, setColumns] = useState<string[][] | null>(null);

//     // event handler that updates our screen size variable
//     const updateDimensions = () => {
//         const width = window.innerWidth;
//         setWidth(width);

//         //this is called when the screen size changes
//         let cols: number = getNumColumns(width);
//         let dividedData: string[][] = [];

//         //make a new array for each column
//         for (let i = 0; i < cols; i++) {
//             dividedData[i] = [];
//         }

//         //evenly distribute the items to each of the new columns
//         for (let i = 0; i < tempData.length; i++) {
//             dividedData[i % cols].push(tempData[i]);
//         }

//         setColumns(dividedData);
//     };

//     // hook sets the listener to call updateDimensions() whenever the screen size changes
//     useEffect(() => {
//         updateDimensions();

//         window.addEventListener("resize", updateDimensions);
//         return () => window.removeEventListener("resize", updateDimensions);
//     }, []);

//     return (
//         <div>
//             Hi +{" "}
//             {width + " " + getBreakpoint(width) + " " + getNumColumns(width)}
//             <div style={{ display: "flex", flexDirection: "row" }}>
//                 {columns &&
//                     columns.map((url: string[], index: number) => (
//                         <div
//                             key={index}
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 marginLeft: "20px",
//                                 marginRight: "20px",
//                             }}
//                             className={
//                                 index % 2 == 0 ? "column" : "column-reverse"
//                             }
//                         >
//                             {"Column contents - " +
//                                 url +
//                                 " ### Index - " +
//                                 index +
//                                 " "}
//                             {url.map((entry: string, index: number) => (
//                                 <p key={index}>{entry}</p>
//                             ))}
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default reversedemo;

import React from "react";

export default function reversedemo() {
    return <div>reversedemo</div>;
}
