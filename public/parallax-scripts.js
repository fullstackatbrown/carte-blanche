

console.log("hello world");
document.querySelector("columns").style.overflowY = "hidden";

const timeline = new ScrollTimeline({
    scrollSource: document.documentElement,
    timeRange: 1,
    fill: "both"
});

document.querySelectorAll(`${styles.columnReverse}`).forEach(($column) => {
    $column.animate (
        {
            transform: [
                "translateY(calc(-100% + 100vh))",
                "translateY(calc(100% - 100vh))"
            ]
        },
        {
            duration: 1,
            fill: "both",
            timeline
        }
    );
});

