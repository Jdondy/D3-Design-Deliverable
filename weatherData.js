//Selects the svg element
var svg1 = d3.select('.first');
var svg2 = d3.select('.second');
var svg3 = d3.select('.third');

// Svg dimensions
var svgWidth = +svg1.attr('width');
var svgHeight = +svg1.attr('height');

//var padding = { t: 60, r: 40, b: 30, l: 40 };

var width = svgWidth
var height = svgHeight

const months = [
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun'
];

d3.csv('KNYC.csv').then(function (data) {
    states = data;
    // Create elements
    var center = svg1
        .selectAll('.center')
        .data([1])
        .join('g')
        .attr('class', 'center')
        .attr('transform', `translate(${width / 2},${height / 2})`);


    var eachAngle = (2 * Math.PI) / data.length;
    var maxOuterRadius = (width / 2) * 0.9;
    var minInnerRadius = (width / 2) * 0.3;

    var extent = [0, d3.max(data, d => +d.record_max_temp)]

    var Tooltip = d3.select("#one")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", "absolute")

    var mouseover = function (d) {
        Tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    var mousemove = function (d) {
        Tooltip
            .html("The average temperature on " + "(" + d.date + ")" + " was: " + d.actual_mean_temp + " degrees F.")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px")
    }
    var mouseleave = function (d) {
        Tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }


    var min = extent[0];
    var max = extent[1];

    var valueScale = d3
        .scaleLinear()
        .domain(extent)
        .range([minInnerRadius, maxOuterRadius]);

    var colorScale = d3
        .scaleLinear()
        .domain([min, 0, 0, max])
        .range(['darkblue', 'skyblue', 'orange', 'darkred']);

    data.forEach((d, i) => {
        d.startAngle = i * eachAngle;
        d.endAngle = (i + 1) * eachAngle;

        var zeroRadius = valueScale(0);

        if (d.actual_mean_temp > 0) {
            d.innerRadius = zeroRadius;
            d.outerRadius = valueScale(d.actual_mean_temp);
        } else {
            d.innerRadius = valueScale(d.actual_mean_temp);
            d.outerRadius = zeroRadius;
        }
    });
    var arc = d3
        .arc()
        .innerRadius((d) => d.innerRadius)
        .outerRadius((d) => d.outerRadius)
        .startAngle((d) => d.startAngle)
        .endAngle((d) => d.endAngle);

    center
        .selectAll('.radial-bar')
        .data(data)
        .join('path')
        .attr('class', 'radial-bar')
        .attr('d', (d) => {
            return arc(d);
        })
        .attr('fill', (d) => colorScale(d.actual_mean_temp))
        .attr('stroke', (d) => colorScale(d.actual_mean_temp))
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);;



    /** Axis */

    var scaleTicks = valueScale.ticks(6);

    center
        .selectAll('.radial-circle')
        .data(scaleTicks)
        .join('circle')
        .attr('r', (d) => valueScale(d))
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('opacity', 0.2);

    center
        .selectAll('.radial-text')
        .data(scaleTicks)
        .join('text')
        .text((d) => d)
        .attr('y', (d) => -valueScale(d))
        .attr('stroke-width', 5)
        .attr('stroke', 'white')
        .clone(true)
        .attr('stroke', 'none');

    var g = center
        .selectAll('.radial-axis-g')
        .data(months)
        .join('g')
        .attr('transform', (d, i) => {
            const angle = (360 / months.length) * i - 90;
            return `rotate(${angle})`;
        });

    g.append('line')
        .attr('x1', minInnerRadius)
        .attr('y1', 0)
        .attr('x2', maxOuterRadius)
        .attr('y2', 0)
        .attr('stroke', 'black')
        .attr('opacity', 0.2);

    g.append('text')
        .text((d) => d)
        .attr('transform', (d, i) => {
            let x = minInnerRadius + 10;
            let rotation = 0;
            if (i > 6 && i < 12) {
                rotation = 180;
                x = x + 15;
            }
            return `translate(${x},0) rotate(${rotation})`;
        });

    svg1
        .append('text')
        .text('2014-2015 Average Temperatures in New York')
        .attr('transform', 'translate(170,20)');


});
d3.csv('KNYC.csv').then(function (data) {
    // Create elements
    var center = svg2
        .selectAll('.center')
        .data([1])
        .join('g')
        .attr('class', 'center')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    var eachAngle = (2 * Math.PI) / data.length;
    var maxOuterRadius = (width / 2) * 0.9;
    var minInnerRadius = (width / 2) * 0.3;

    var extent = [0, d3.max(data, d => +d.record_max_temp)]
    //var extent = [d3.extent(data, (d) => +d.record_max_temp)];

    var Tooltip = d3.select("#two")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", "absolute")

    var mouseover = function (d) {
        Tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    var mousemove = function (d) {
        Tooltip
            .html("The record maximum temperature on " + "(" + d.date + ")" + " was: " + d.record_max_temp + " degrees F.")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px")
    }
    var mouseleave = function (d) {
        Tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    var min = extent[0];
    var max = extent[1];
    console.log(min, max)
    var valueScale = d3
        .scaleLinear()
        .domain(extent)
        .range([minInnerRadius, maxOuterRadius]);

    var colorScale = d3
        .scaleLinear()
        .domain([min, 0, 0, max])
        .range(['darkblue', 'skyblue', 'orange', 'darkred']);

    data.forEach((d, i) => {
        d.startAngle = i * eachAngle;
        d.endAngle = (i + 1) * eachAngle;

        var zeroRadius = valueScale(0);

        if (d.record_max_temp > 0) {
            d.innerRadius = zeroRadius;
            d.outerRadius = valueScale(d.record_max_temp);
        } else {
            d.innerRadius = valueScale(d.record_max_temp);
            d.outerRadius = zeroRadius;
        }
    });
    var arc = d3
        .arc()
        .innerRadius((d) => d.innerRadius)
        .outerRadius((d) => d.outerRadius)
        .startAngle((d) => d.startAngle)
        .endAngle((d) => d.endAngle);

    center
        .selectAll('.radial-bar')
        .data(data)
        .join('path')
        .attr('class', 'radial-bar')
        .attr('d', (d) => {
            return arc(d);
        })
        .attr('fill', (d) => colorScale(d.record_max_temp))
        .attr('stroke', (d) => colorScale(d.record_max_temp))
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);;


    /** Axis */

    var scaleTicks = valueScale.ticks(6);

    center
        .selectAll('.radial-circle')
        .data(scaleTicks)
        .join('circle')
        .attr('r', (d) => valueScale(d))
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('opacity', 0.2);

    center
        .selectAll('.radial-text')
        .data(scaleTicks)
        .join('text')
        .text((d) => d)
        .attr('y', (d) => -valueScale(d))
        .attr('stroke-width', 5)
        .attr('stroke', 'white')
        .clone(true)
        .attr('stroke', 'none');

    var g = center
        .selectAll('.radial-axis-g')
        .data(months)
        .join('g')
        .attr('transform', (d, i) => {
            const angle = (360 / months.length) * i - 90;
            return `rotate(${angle})`;
        });

    g.append('line')
        .attr('x1', minInnerRadius)
        .attr('y1', 0)
        .attr('x2', maxOuterRadius)
        .attr('y2', 0)
        .attr('stroke', 'black')
        .attr('opacity', 0.2);

    g.append('text')
        .text((d) => d)
        .attr('transform', (d, i) => {
            let x = minInnerRadius + 10;
            let rotation = 0;
            if (i > 6 && i < 12) {
                rotation = 180;
                x = x + 15;
            }
            return `translate(${x},0) rotate(${rotation})`;
        });

    svg2
        .append('text')
        .text('Record Maximum Temperatures in New York')
        .attr('transform', 'translate(170,20)');



});
d3.csv('KNYC.csv').then(function (data) {

    // Create elements
    var center = svg3
        .selectAll('.center')
        .data([1])
        .join('g')
        .attr('class', 'center')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    var eachAngle = (2 * Math.PI) / data.length;
    var maxOuterRadius = (width / 2) * 0.9;
    var minInnerRadius = (width / 2) * 0.3;

    var extent = [0, d3.max(data, d => +d.record_max_temp)]

    var Tooltip = d3.select("#three")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", "absolute")

    var mouseover = function (d) {
        Tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    var mousemove = function (d) {
        Tooltip
            .html("The record minimum temperature on " + "(" + d.date + ")" + " was: " + d.record_min_temp + " degrees F.")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px")
    }
    var mouseleave = function (d) {
        Tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    //var extent = [d3.extent(data, (d) => +d.record_max_temp)];
    var min = extent[0];
    var max = extent[1];
    console.log(min, max)
    var valueScale = d3
        .scaleLinear()
        .domain(extent)
        .range([minInnerRadius, maxOuterRadius]);

    var colorScale = d3
        .scaleLinear()
        .domain([min, 0, 0, max])
        .range(['darkblue', 'skyblue', 'orange', 'darkred']);

    data.forEach((d, i) => {
        d.startAngle = i * eachAngle;
        d.endAngle = (i + 1) * eachAngle;

        var zeroRadius = valueScale(0);

        if (d.record_min_temp > 0) {
            d.innerRadius = zeroRadius;
            d.outerRadius = valueScale(d.record_min_temp);
        } else {
            d.innerRadius = valueScale(d.record_min_temp);
            d.outerRadius = zeroRadius;
        }
    });
    var arc = d3
        .arc()
        .innerRadius((d) => d.innerRadius)
        .outerRadius((d) => d.outerRadius)
        .startAngle((d) => d.startAngle)
        .endAngle((d) => d.endAngle);

    center
        .selectAll('.radial-bar')
        .data(data)
        .join('path')
        .attr('class', 'radial-bar')
        .attr('d', (d) => {
            return arc(d);
        })
        .attr('fill', (d) => colorScale(d.record_min_temp))
        .attr('stroke', (d) => colorScale(d.record_min_temp))
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    /** Axis */

    var scaleTicks = valueScale.ticks(6);

    center
        .selectAll('.radial-circle')
        .data(scaleTicks)
        .join('circle')
        .attr('r', (d) => valueScale(d))
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('opacity', 0.2);

    center
        .selectAll('.radial-text')
        .data(scaleTicks)
        .join('text')
        .text((d) => d)
        .attr('y', (d) => -valueScale(d))
        .attr('stroke-width', 5)
        .attr('stroke', 'white')
        .clone(true)
        .attr('stroke', 'none');

    const months = [
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
    ];

    var g = center
        .selectAll('.radial-axis-g')
        .data(months)
        .join('g')
        .attr('transform', (d, i) => {
            const angle = (360 / months.length) * i - 90;
            return `rotate(${angle})`;
        });

    g.append('line')
        .attr('x1', minInnerRadius)
        .attr('y1', 0)
        .attr('x2', maxOuterRadius)
        .attr('y2', 0)
        .attr('stroke', 'black')
        .attr('opacity', 0.2);

    g.append('text')
        .text((d) => d)
        .attr('transform', (d, i) => {
            let x = minInnerRadius + 10;
            let rotation = 0;
            if (i > 6 && i < 12) {
                rotation = 180;
                x = x + 15;
            }
            return `translate(${x},0) rotate(${rotation})`;
        });

    svg3
        .append('text')
        .text('Record Minimum Temperatures in New York')
        .attr('transform', 'translate(170,20)');

});
d3.csv('monthlyData.csv').then(function (data) {
    var margin = { top: 20, right: 25, bottom: 30, left: 40 },
        width = 650 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    var border = 1;

    var svg = d3.select("#div_template")
        .append("svg")
        .attr("class", "bottom")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var borderPath = svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height)
        .attr("width", width)
        .style("stroke", "black")
        .style("fill", "none")
        .style("stroke-width", 0.5);


    var myColor1 = d3.scaleLinear()
        .domain([8, 15])
        .range(["white", "darkblue"]);
    const bubble = data => d3.pack()
        .size([width, height])
        .padding(1)(d3.hierarchy({ children: data }).sum(d => d.average_precipitation));
    const root = bubble(data);

    var Tooltip = d3.select("#div_template")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", "absolute")

    var mouseover = function (d) {
        Tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    var mousemove = function (d) {
        Tooltip
            .html("The average amount of precipitaion in " + d.month + " is: " + d.average_precipitation + " in.")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px")
    }
    var mouseleave = function (d) {
        Tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr("align", "center")

    node.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    const circle = node.append('circle')
        .data(data)
        .attr('r', function (d) { return +d.average_precipitation * 4 })
        .style('fill', function (d) { return myColor1(d.average_precipitation) })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    const label = node.append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text(d => d.data.month.substring(0, d.r / 3))
        .style('fill', 'white');

    svg
        .append("text")
        .text("Average Precipitation Totals per Month in NYC (2014-2015)")
        .attr('transform', 'translate(110,15)');
    svg.append("text")
        .text("Hover Mouse Over Bubbles for More Detail")
        .attr("transform", "translate(155,580)")

});
d3.csv('NYCTour.csv').then(function (data) {
    var margin = { top: 20, right: 25, bottom: 30, left: 40 },
        width = 650 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y");

    data.forEach(function (d) {
        d.Year = parseTime(d.Year);
        d.TotalVisitors = +d.TotalVisitors;
    });

    var x = d3.scaleTime()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var border = 1;

    var Tooltip = d3.select("#tour")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", "absolute")

    var mouseover = function (d) {
        Tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    var mousemove = function (d) {
        Tooltip
            .html("There were " + d.TotalVisitors + " million tourists in " + d.Year)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px")
    }
    var mouseleave = function (d) {
        Tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    x.domain(d3.extent(data, function (d) { return d.Year; })).nice();
    y.domain(d3.extent(data, function (d) { return d.TotalVisitors; })).nice();

    xAxis = g => g.attr('transform', `translate(0, ${height - margin.bottom})`)
        .attr("class", "xAxis")
        .call(d3.axisBottom(x))

    yAxis = g => g.attr('transform', `translate(${margin.left}, 0)`)
        .attr("class", "yAxis")
        .call(d3.axisLeft(y))


    var svg = d3.select("#tour")
        .append("svg")
        .attr("class", "bottom")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    var borderPath = svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height)
        .attr("width", width)
        .style("stroke", "black")
        .style("fill", "none")
        .style("stroke-width", 0.5);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    svg.append('text')
        .style("font", "10px times")
        .text("Year")
        .attr("transform", "translate(560,565)")

    svg.append('text')
        .style("font", "10px times")
        .text("Tourists (Millions)")
        .attr("transform", "translate(40,10)")

    svg.append('text')
        .style("font", "13px times")
        .text("Number of Tourists (Millions) in NYC per Year (Larger Dot Size Represents Higher Tourist Spending)")
        .attr("transform", "translate(50,25)")

    // make the dots
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("opacity", 0.5)
        .attr("r", function (d) { return Math.sqrt(d.TotalVisitorSpending) })
        .attr("cx", function (d) { return x(d.Year); })
        .attr("cy", function (d) { return y(d.TotalVisitors); })
        .style("fill", "Green")
        .style("stroke", " black")
        .style("stroke-width", "1.5px")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
});
