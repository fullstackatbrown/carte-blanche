import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";

const timeline = new ScrollTimeline({
    scrollSource: document.documentElement,
    timeRange: 1,
    fill: "both"
});

document.querySelectorAll("columnReverse").forEach(($column) => {
    //$column.style.flexDirection = "column-reverse";
    $column.style.width = "10%";

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