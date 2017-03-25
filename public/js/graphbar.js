var dataArrayTwo = [];

getthedata();

function getthedata() {
    $.ajax({
            url: "/api/alltweets",
            method: "GET"
        })
        .done(function (data) {
            var n = data.length / 1000;
            for (var i = 0; i < n; i++) {
                dataArrayTwo.push(data[i]);
            }
         
        });
}

   setTimeout(renderGraph, 5000);
function renderGraph() {
    console.log("im in");
    var svg = d3.select(".barChart"),
        margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(dataArrayTwo.map(function (d) {
        return d.tweet_date;
    }));
    y.domain([0, d3.max(dataArrayTwo, function (d) {
        return d.favorites;
    })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("favorites");

    g.selectAll(".bar")
        .data(dataArrayTwo)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.tweet_date);
        })
        .attr("y", function (d) {
            return y(d.favorites);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.favorites);
        });

}