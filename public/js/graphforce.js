 var parsedData = {
     nodes: [{

             name: "ROOT",
             color: "white",
             size: 20,
             layer: 0,
             index: 0

         },

         // main branches
         {
             name: "himself",
             color: "red",
             size: 10,
             layer: 1,
             index: 1


         },
         {
             name: "defenses",
             color: "green",
             size: 10,
             layer: 1,
             index: 2

         },
         {
             name: "celebrity",
             color: "yellow",
             size: 10,
             layer: 1,
             index: 3

         }, {
             name: "debates",
             color: "brown",
             size: 10,
             layer: 1,
             index: 4

         }, {
             name: "clintons",
             color: "grey",
             size: 10,
             layer: 1,
             index: 5

         }, {
             name: "nicknames",
             color: "lawngreen",
             size: 10,
             layer: 1,
             index: 6

         }, {
             name: "one liners",
             color: "blue",
             size: 10,
             layer: 1,
             index: 7

         },

         // level 2 branches

         {
             name: "Little Marco",
             color: "violet",
             size: 5,
             layer: 2,
             index: 8

         }, {
             name: "Lyin Ted",
             color: "violet",
             size: 5,
             layer: 2,
             index: 9

         }, {
             name: "Crooked Hillary",
             color: "violet",
             size: 5,
             layer: 2,
             index: 10

         }, {
             name: "Low energy Jeb",
             color: "violet",
             size: 5,
             layer: 2,
             index: 11

         },
         // third layer
         {
             name: "jeb off stage",
             color: "green",
             size: 5,
             layer: 3,
             index: 12

         }, {
             name: "tough guy",
             color: "green",
             size: 5,
             layer: 3,
             index: 13

         }, {
             name: "real tough guy",
             color: "green",
             size: 5,
             layer: 3,
             index: 14
         }
     ],
     links: [{
             source: 0,
             target: 1,
             value: 4,
             distance: 100
         },
         {
             source: 0,
             target: 2,
             value: 4,
             distance: 100
         },
         {
             source: 0,
             target: 3,
             value: 4,
             distance: 100
         }, {
             source: 0,
             target: 4,
             value: 4,
             distance: 100
         }, {
             source: 0,
             target: 5,
             value: 4,
             distance: 100
         }, {
             source: 0,
             target: 6,
             value: 4,
             distance: 100
         }, {
             source: 0,
             target: 7,
             value: 4,
             distance: 100
         }, {
             source: 6,
             target: 8,
             value: 4,
             distance: 75
         }, {
             source: 6,
             target: 9,
             value: 4,
             distance: 75
         }, {
             source: 6,
             target: 10,
             value: 4,
             distance: 75
         }, {
             source: 6,
             target: 11,
             value: 4,
             distance: 75
         }, {
             source: 11,
             target: 12,
             value: 4,
             distance: 75
         }, {
             source: 11,
             target: 13,
             value: 4,
             distance: 75
         }, {
             source: 11,
             target: 14,
             value: 4,
             distance: 75
         },
         {
             source: 12,
             target: 4,
             value: 4,
             distance: 75
         }
     ]
 };
 var width = 1200;
 var height = 700;

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
         if (d.size > 19) {
             return 8;
         } else {
             return 3;
         }
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
         var str = d.name;
         return str.toUpperCase();
     })
     .style("font-size", function (d) {
         switch (d.layer) {
             case 0:
                 return "16px";
                 break;
             case 1:
                 return "11px";
                 break;
             case 2:
                 return "9px";
                 break;
             case 3:
                 return "9px";
                 break;
         }
     })
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