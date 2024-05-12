const adjustChartWidthHeight = () => {

    const minWindowWidthToChartWidthHeightMap = new Map([
        // similar to tailwindCSS breakpoints
        // initialise in reverse order
        [1540, ["645px", "545px"]], // this is added specially to force rerender of the overview charts when view port > 1536 = 4
        [1536, ["650px", "550px"]],
        [1280, ["650px", "550px"]],
        [1024, ["550px", "550px"]],
        [768, ["550px", "500px"]],
        [640, ["550px", "425px"]],
        [520, ["500px", "400px"]]
    ]);

    // set viewport
    let height_px = "";
    let width_px = "";
    // syntax: map.forEach((value, key))
    for (const [minWindowWidth, [chartWidthStr, chartHeightStr]] of minWindowWidthToChartWidthHeightMap) {
        if (window.innerWidth >= minWindowWidth) {
            width_px = chartWidthStr
            height_px = chartHeightStr
            break  // Break the loop once the appropriate size is found
        }
    }

    if (height_px === "" && height_px === "") {
        // base case viewport
        width_px = "400px"
        height_px = "400px"
    }
    return [width_px, height_px]
}

export default adjustChartWidthHeight;
