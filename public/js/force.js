var forceObj = {
            nodes: [{

                    name: "root",
                    color: "white",
                    size: 20

                },

                // main branches
                {
                    name: "himself",
                    color: "red",
                    size: 15


                },
                {
                    name: "defenses",
                    color: "green",
                    size: 15

                },
                {
                    name: "celebrity",
                    color: "yellow",
                    size: 15

                }, {
                    name: "debates",
                    color: "brown",
                    size: 15

                }, {
                    name: "clintons",
                    color: "grey",
                    size: 15

                }, {
                    name: "nicknames",
                    color: "lawngreen",
                    size: 15

                }, {
                    name: "one liners",
                    color: "blue",
                    size: 15

                },



                // level 2 branches

                {
                    name: "Little Marco",
                    color: "violet",
                    size: 10,
                    
                }, {
                    name: "Lyin Ted",
                    color: "violet",
                    size: 10,
                    
                }, {
                    name: "Crooked Hillary",
                    color: "violet",
                    size: 10,
                    
                }, {
                    name: "Low energy Jeb",
                    color: "violet",
                    size: 10,
                    
                }
            ],
            links: [{
                    source: "root",
                    target: "celebrity",
                    value: 16,
                    distance: 100
                },
                {
                    source: "root",
                    target: "himself",
                    value: 16,
                    distance: 100
                },
                {
                    source: "root",
                    target: "clintons",
                    value: 16,
                    distance: 100
                }, {
                    source: "root",
                    target: "defenses",
                    value: 16,
                    distance: 100
                }, {
                    source: "root",
                    target: "nicknames",
                    value: 16,
                    distance: 100
                }, {
                    source: "root",
                    target: "debates",
                    value: 16,
                    distance: 100
                }, {
                    source: "root",
                    target: "one liners",
                    value: 16,
                    distance: 100
                }, {
                    source: "nicknames",
                    target: "Little Marco",
                    value: 16,
                    distance: 50
                }, {
                    source: "nicknames",
                    target: "Crooked Hillary",
                    value: 16,
                    distance: 50
                }, {
                    source: "nicknames",
                    target: "Lyin Ted",
                    value: 16,
                    distance: 50
                }, {
                    source: "nicknames",
                    target: "Low energy Jeb",
                    value: 16,
                    distance: 50
                }
            ]
        };

        console.log(forceObj);
        var svg = d3.select("#force"),
            width = +svg.attr("width"),
            height = +svg.attr("height");



        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) {
                    return d.name;
                })
                .distance(function (d) {
                    return d.distance;
                })
                .strength(2))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));



        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(forceObj.links)
            .enter().append("line")
            .style("stroke", "white")
            .attr("stroke-width", function (d) {
                return Math.sqrt(d.value);
            });

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(forceObj.nodes)
            .enter().append("circle")
            .attr("r", function (d) {
                return d.size;
            })
            .attr("fill", function (d) {
                return d.color;
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("title")
            .text(function (d) {
                return d.name;
            });

        simulation
            .nodes(forceObj.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(forceObj.links);

        function ticked() {
            link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }


        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }