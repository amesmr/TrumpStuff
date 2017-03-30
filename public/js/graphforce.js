       // constructor Link function
       function NodeConstruct(name, color, layer, linkType, index) {
           this.name = name;
           this.color = color;
           this.layer = layer;
           this.linkType = linkType;
           this.index = index;

       }


       // constructor Link function
       function LinkConstruct(source, target, sourceName, targetName, linkColor, distance) {
           this.source = source;
           this.target = target;
           this.sourceName = sourceName;
           this.targetName = targetName;
           this.linkColor = linkColor;
           this.distance = distance;
       }



       var forceDataArray = [];
       //    getthedata();
       var nodesArray = [];
       var linksArray = [{
               source: 0,
               target: 1,
               distance: 100
           },
           {
               source: 1,
               target: 2,
               distance: 25
           }
       ];

       function getthedata() {
           $.ajax({
                   url: "/api/jforce",
                   method: "GET"
               })
               .done(function (data) {
                   var n = data.length;
                   for (var i = 0; i < n; i++) {
                       if (data[i].index != 999) {
                           var node = new NodeConstruct(data[i].tweet, "white", data[i].layer, data[i].linkType, data[i].index);
                           nodesArray.push(node);
                       }
                   }
                   console.log(nodesArray);
                   layout();
               });
       }



    //    function layout() {
    //        var parsedData = {
    //            nodes: nodesArray,
    //            links: linksArray
    //        };
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

                   },

                   // level 2 branches

                   {
                       name: "Little Marco",
                       color: "violet",
                       size: 5,
                       layer: 2,
                       index: 7

                   }, {
                       name: "Lyin Ted",
                       color: "violet",
                       size: 5,
                       layer: 2,
                       index: 8

                   }, {
                       name: "Crooked Hillary",
                       color: "violet",
                       size: 5,
                       layer: 2,
                       index: 9

                   }, {
                       name: "Low energy Jeb",
                       color: "violet",
                       size: 5,
                       layer: 2,
                       index: 10

                   },
                   // third layer
                   {
                       name: "jeb off stage",
                       color: "green",
                       size: 5,
                       layer: 3,
                       index: 11

                   }, {
                       name: "tough guy",
                       color: "green",
                       size: 5,
                       layer: 3,
                       index: 12

                   }, {
                       name: "real tough guy",
                       color: "green",
                       size: 5,
                       layer: 3,
                       index: 13
                   }
               ],
               links: [{
                       source: 0,
                       target: 1,
                       sourceText: "root",
                       targetText: "himself",
                       linkType: "main",
                       distance: 100
                   },
                   {
                       source: 0,
                       target: 2,
                       distance: 100
                   },
                   {
                       source: 0,
                       target: 3,
                       distance: 100
                   }, {
                       source: 0,
                       target: 4,
                       distance: 100
                   }, {
                       source: 0,
                       target: 5,
                       distance: 100
                   }, {
                       source: 0,
                       target: 6,
                       distance: 100
                   }, {
                       source: 0,
                       target: 7,
                       distance: 100
                   }, {
                       source: 6,
                       target: 8,
                       distance: 75
                   }, {
                       source: 6,
                       target: 9,
                       distance: 75
                   }, {
                       source: 6,
                       target: 10,
                       distance: 75
                   }, {
                       source: 6,
                       target: 11,
                       distance: 75
                   }, {
                       source: 11,
                       target: 12,
                       distance: 75
                   }, {
                       source: 11,
                       target: 13,
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
               .attr("class", "forceCircle")
               .attr("r", function (d) {
                   if (d.size > 19) {
                       return 8;
                   } else {
                       return 4;
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
                   if (str.length > 25) {
                       return "";
                   } else {
                       return str.toUpperCase();
                   }
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

           node.append("title")
               .text(function (d) {
                   return d.name;
               });

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
       