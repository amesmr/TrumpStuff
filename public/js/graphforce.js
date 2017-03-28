 var parsedData = {
     nodes: [{

             name: "root",
             color: "white",
             size: 20,
             group: 1

         },

         // main branches
         {
             name: "himself",
             color: "red",
             size: 10,
             group: 2


         },
         {
             name: "defenses",
             color: "green",
             size: 10

         },
         {
             name: "celebrity",
             color: "yellow",
             size: 10

         }, {
             name: "debates",
             color: "brown",
             size: 10

         }, {
             name: "clintons",
             color: "grey",
             size: 10

         }, {
             name: "nicknames",
             color: "lawngreen",
             size: 10

         }, {
             name: "one liners",
             color: "blue",
             size: 10

         },



         // level 2 branches

         {
             name: "Little Marco",
             color: "violet",
             size: 5,

         }, {
             name: "Lyin Ted",
             color: "violet",
             size: 5,

         }, {
             name: "Crooked Hillary",
             color: "violet",
             size: 5,

         }, {
             name: "Low energy Jeb",
             color: "violet",
             size: 5,

         }
     ],
     links: [{
             source: 0,
             target: 1,
             value: 4,
             distance: 75
         },
         {
             source: 0,
             target: 2,
             value: 4,
             distance: 75
         },
         {
             source: 0,
             target: 3,
             value: 4,
             distance: 75
         }, {
             source: 0,
             target: 4,
             value: 4,
             distance: 75
         }, {
             source: 0,
             target: 5,
             value: 4,
             distance: 75
         }, {
             source: 0,
             target: 6,
             value: 4,
             distance: 75
         }, {
             source: 0,
             target: 7,
             value: 4,
             distance: 75
         }, {
             source: 6,
             target: 8,
             value: 4,
             distance: 50
         }, {
             source: 6,
             target: 9,
             value: 4,
             distance: 50
         }, {
             source: 6,
             target: 10,
             value: 4,
             distance: 50
         }, {
             source: 6,
             target: 11,
             value: 4,
             distance: 50
         }
     ]
 };
 var width = 960,
     height = 500

 var svg = d3.select("#force")
     .attr("width", width)
     .attr("height", height);

 var simulation = d3.forceSimulation()
     .force("link", d3.forceLink().distance(function (d) {
         return d.distance;
     }).strength(2))
    //  .force("center", d3.forceCenter(width / 2, height / 2))
     .force("charge", d3.forceManyBody());


 simulation
     .nodes(parsedData.nodes);

 simulation
     .force("link")
     .links(parsedData.links);

 var link = svg.selectAll(".link")
     .data(parsedData.links)
     .enter().append("line")
     .attr("class", "link");


 var node = svg.selectAll(".node")
     .data(parsedData.nodes)
     .enter().append("g")
     .attr("class", "node")
     .call(d3.drag()
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended));


 node.append("circle")
     .attr("r", function (d) {
         return 8;
     })
     .style("fill", function (d) {
         return d.color;
     });

 // .attr("x", -8)
 // .attr("y", -8)
 // .attr("width", 16)
 // .attr("height", 16);

 node.append("text")
     .attr("dx", 12)
     .attr("dy", ".35em")
     .text(function (d) {
         return d.name
     })
     .style("font-size", "10px")
     .style("fill", "white");

 simulation.on("tick", function () {
     link.attr("x1", function (d) {
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

     node.attr("transform", function (d) {
         return "translate(" + d.x + "," + d.y + ")";
     });
 });


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