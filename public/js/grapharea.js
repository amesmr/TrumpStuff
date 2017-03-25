        var dataArray = [];
        getthedata();
        var tipTool = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        function getthedata() {
            $.ajax({
                    url: "/api/alltweets",
                    method: "GET"
                })
                .done(function (data) {
                    var n = data.length / 10;
                    for (var i = 0; i < n; i++) {
                        dataArray.push(data[i]);
                    }
                    generateGraph();
                });
        }

        function generateGraph() {
            var n = dataArray.length;
            for (var i = 0; i < n; i++) {
                dataArray[i].tweet_date = new Date(dataArray[i].tweet_date).getTime();
            }
            console.log(dataArray);



            var margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            };
            var svg = d3.select(".areaChart")
            var width = +svg.attr("width") - margin.left - margin.right;
            var height = +svg.attr("height") - margin.top - margin.bottom;
            var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top +
                ")");
            // parse the date / time
            var parseTime = d3.timeParse("%d-%b-%y");
            var formatTime = d3.timeFormat("%e %B");

            // set the ranges
            var x = d3.scaleTime().range([0, width]);


            var y = d3.scaleLinear()
                .rangeRound([height, 0]);


            var areaOne = d3.area()
                .x(function (d) {
                    return x(d.tweet_date);
                })
                .y1(function (d) {
                    return y(d.favorites + 25000);
                });

            var areaTwo = d3.area()
                .x(function (d) {
                    return x(d.tweet_date);
                })
                .y1(function (d) {
                    return y(d.favorites);
                });

            var areaThree = d3.area()
                .x(function (d) {
                    return x(d.tweet_date);
                })
                .y1(function (d) {
                    return y(d.retweets + 1000);
                });


            x.domain(d3.extent(dataArray, function (d) {
                return d.tweet_date;
            }));
            y.domain([0, (d3.max(dataArray, function (d) {
                return d.favorites;
            }) - 400000)]);
            areaOne.y0(y(0));
            areaTwo.y0(y(0));
            areaThree.y0(y(0));

            g.append("path")
                .datum(dataArray)
                .attr("fill", "blue")
                .attr("d", areaOne);


            g.append("path")
                .datum(dataArray)
                .attr("fill", "red")
                .attr("d", areaTwo);


            g.append("path")
                .datum(dataArray)
                .attr("fill", "lawngreen")
                .attr("d", areaThree);


            g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .attr("class", "xaxisWhite");


            g.append("g")
                .call(d3.axisLeft(y))
                .attr("class", "yaxisWhite")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("FAVORITED");

            svg.selectAll("dot")
                .data(dataArray)
                .enter().append("circle")
                .attr("r", 2)
                .attr("cx", function (d) {
                    return x(d.tweet_date);
                })
                .attr("cy", function (d) {
                    return y(d.favorites);
                })
                .on("mouseover", function (d) {
                    0
                    tipTool.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tipTool.html("DATE: " + formatTime(d.tweet_date) + "<br>" + "COUNT: " + d.favorites)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function (d) {
                    tipTool.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
        }

        // var dataArrayTwo = [];
        // setTimeout(getthedataTwo(), 5000);
        // generateGraphTwo();

        // function generateGraphTwo() {
        //     // var n = dataArrayTwo.length;
        //     // for (var i = 0; i < n; i++) {
        //     //     dataArrayTwo[i].tweet_date = new Date(dataArrayTwo[i].tweet_date).getTime();
        //     // }

        //     var margin = {
        //             top: 20,
        //             right: 30,
        //             bottom: 30,
        //             left: 40
        //         },
        //         width = 600 - margin.left - margin.right,
        //         height = 350 - margin.top - margin.bottom;

        //     var x = d3.scale.ordinal()
        //         .rangeRoundBands([0, width], .1);

        //     var y = d3.scale.linear()
        //         .range([height, 0]);

        //     var xAxis = d3.svg.axis()
        //         .scale(x)
        //         .orient("bottom");

        //     var yAxis = d3.svg.axis()
        //         .scale(y)
        //         .orient("left");

        //     var chart = d3.select(".chart")
        //         .attr("width", width + margin.left + margin.right)
        //         .attr("height", height + margin.top + margin.bottom)
        //         .append("g")
        //         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        //     x.domain(dataArrayTwo.map(function (d) {
        //         return d.retweets;
        //     }));
        //     y.domain([0, d3.max(dataArrayTwo, function (d) {
        //         return d.favorites;
        //     })]);

        //     chart.append("g")
        //         .attr("class", "x axis")
        //         .attr("transform", "translate(0," + height + ")")
        //         .call(xAxis);

        //     chart.append("g")
        //         .attr("class", "y axis")
        //         .call(yAxis);

        //     chart.selectAll(".bar")
        //         .data(dataArrayTwo)
        //         .enter().append("rect")
        //         .attr("class", "bar")
        //         .attr("x", function (d) {
        //             return x(d.retweets);
        //         })
        //         .attr("y", function (d) {
        //             return y(d.favorites);
        //         })
        //         .attr("height", function (d) {
        //             return height - y(d.favorites);
        //         })
        //         .attr("width", x.rangeBand());


        //     function type(d) {
        //         d.favorites = +d.favorites; // coerce to number
        //         return d;
        //     }
        // }