import React, { useEffect, useRef, useState } from "react";

import styles from "../styles/ScrollingGrid.module.css";

const cellHeight = 15; //em
const cellMargin = 1; //em

// returns the breakpoint from a given screen width
const getBreakpoint = (size: number): string => {
    if (size >= 0 && size < 576) {
        return "xs";
    } else if (size >= 576 && size < 768) {
        return "sm";
    } else if (size >= 768 && size < 992) {
        return "md";
    } else if (size >= 992 && size < 1200) {
        return "xl";
    } else {
        return "xxl";
    }
};

// figures out how many columns we should have based on breakpoints
const getNumColumns = (size: number): number => {
    let breakpoint: string = getBreakpoint(size);
    if (breakpoint === "xs") {
        return 1;
    } else if (breakpoint === "sm" || breakpoint === "md") {
        return 2;
    } else {
        return 3;
    }
};

interface ScrollingGridProps {
    data: string[];
    width?: string;
    height?: string;
}

function ScrollingGrid(props: ScrollingGridProps) {
    const [columns, setColumns] = useState<string[][]>([[]]);

    const containerDivRef = useRef<HTMLDivElement>(null);
    const reverseColumnRef = useRef<HTMLDivElement>(null);

    const getMaxColumnLength = (): number => {
        let max = columns[0].length;
        for (let i = 0; i < columns.length; i++) {
            max = Math.max(max, columns[i].length);
        }
        return max;
    };

    const divideData = (width: number) => {
        let cols: number = getNumColumns(width);
        let dividedData: string[][] = [];

        for (let i = 0; i < cols; i++) {
            dividedData[i] = [];
        }

        //evenly distribute the items to each of the new columns
        for (let i = 0; i < props.data.length; i++) {
            dividedData[i % cols].push(props.data[i]);
        }

        setColumns(dividedData);
    };

    const updateDimensions = () => {
        const width = window.innerWidth;
        divideData(width);
    };

    const handleScroll = (e: React.UIEvent) => {
        // console.log(containerDivRef.current!.scrollTop);
        // console.log(reverseColumnRef.current?.style.transform);
        let scrollDelta: number = containerDivRef.current!.scrollTop;
        if (reverseColumnRef.current != null) {
            reverseColumnRef.current!.style.transform = `translateY(calc(2*${scrollDelta}px))`;
        }
    };

    useEffect(() => {
        divideData(window.innerWidth);
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return (
        <div
            className={styles.container}
            style={{
                width: `${props.width}`,
                height: `${props.height}`,
            }}
            ref={containerDivRef}
            onScroll={(e) => handleScroll(e)}
        >
            {columns &&
                columns.map((array: string[], index: number) => (
                    <Column
                        index={index}
                        height={`${
                            getMaxColumnLength() * (cellHeight + cellMargin) - 1
                        }em`}
                        gridHeight={props.height}
                        key={index}
                        reverseColumnRef={reverseColumnRef}
                    >
                        {array.map((entry: string, index: number) => (
                            <div
                                className={styles.item}
                                key={index}
                                style={{ height: `${cellHeight}em` }}
                            >
                                <img src={entry} className={styles.cellImage} />
                            </div>
                        ))}
                    </Column>
                ))}
        </div>
    );
}

interface ColumnProps {
    index: number;
    children: React.ReactNode;
    height?: string;
    gridHeight?: string;
    reverseColumnRef?: React.RefObject<HTMLDivElement>;
}
function Column(props: ColumnProps) {
    if (props.index % 2 == 0) {
        return (
            <div
                key={props.index}
                className={styles.column}
                style={{ height: props.height }}
            >
                {props.children}
            </div>
        );
    } else {
        let initialOffset: string = `calc(-1 * (${props.height} - ${props.gridHeight}))`;
        console.log(initialOffset);
        return (
            <div
                key={props.index}
                className={styles.columnReverse}
                style={{
                    height: props.height,
                }}
            >
                <div
                    className={styles.columnReverseContainer}
                    style={{
                        marginTop: initialOffset,
                        // transform: `translateY(calc(2*${props.scrollDelta}px))`,
                    }}
                    ref={props.reverseColumnRef}
                >
                    {props.children}
                </div>
            </div>
        );
    }
}

export default ScrollingGrid;
