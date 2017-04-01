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

       //            // crosslinks
       //            source: 10,
       //            target: 7,
       //            linkType: "crosslinktweetend"
       //        },

       var forceDataArray = [];
       getthedata();
       var nodesArray = [];
       var linksArray = [{

               source: 0,
               target: 1,
               linkType: "donaldlayer1"
           },
           // ----------------- layer1branches
           {
               source: 1,
               target: 2,
               linkType: "layer1layer2"
           },
           {
               source: 1,
               target: 3,
               linkType: "layer1layer2"
           },
           {
               source: 1,
               target: 4,
               linkType: "layer1layer2"
           },
           {
               source: 1,
               target: 5,
               linkType: "layer1layer2"
           },
           {
               source: 1,
               target: 6,
               linkType: "layer1layer2"
           },
           {
               source: 1,
               target: 7,
               linkType: "layer1layer2"
           },
           //-------lyin ted
           {
               source: 5,
               target: 8,
               linkType: "tweetend"
           },
           {
               source: 5,
               target: 9,
               linkType: "tweetend"
           },
           {
               source: 5,
               target: 10,
               linkType: "tweetend"
           },
           {
               source: 5,
               target: 11,
               linkType: "tweetend"
           },
           {
               source: 5,
               target: 12,
               linkType: "tweetend"
           },
           {
               source: 5,
               target: 13,
               linkType: "tweetend"
           },
           {
               source: 5,
               target: 14,
               linkType: "tweetend"
           },
           {
               source: 5,
               target: 15,
               linkType: "tweetend"
           },
           {
               source: 5,
               target: 16,
               linkType: "tweetend"
           },
           {
               source: 5,
               target: 17,
               linkType: "tweetend"
           },
           {
               source: 5,
               target: 18,
               linkType: "tweetend"
           },
           {
               source: 5,
               target: 19,
               linkType: "tweetend"
           },

           // -------- little marco
           {
               source: 4,
               target: 20,
               linkType: "tweetend"
           },
           {
               source: 4,
               target: 21,
               linkType: "tweetend"
           },
           {
               source: 4,
               target: 22,
               linkType: "tweetend"
           },
           {
               source: 4,
               target: 23,
               linkType: "tweetend"
           },
           {
               source: 4,
               target: 24,
               linkType: "tweetend"
           },
           {
               source: 4,
               target: 25,
               linkType: "tweetend"
           },
           {
               source: 4,
               target: 26,
               linkType: "tweetend"
           },
           {
               source: 4,
               target: 27,
               linkType: "tweetend"
           },
           // ------- crazy bernie
           {
               source: 6,
               target: 28,
               linkType: "tweetend"
           },
           {
               source: 6,
               target: 29,
               linkType: "tweetend"
           },
           {
               source: 6,
               target: 30,
               linkType: "tweetend"
           }

           // ------- PERSONAL ATTACKS

        //    {
        //        source: 37,
        //        target: 36,
        //        linkType: "donaldlayer1"
        //    }
        //    {
        //        source: 37,
        //        target: 38,
        //        linkType: "layer1layer2"
        //    },
        //    {
        //        source: 37,
        //        target: 39,
        //        linkType: "layer1layer2"
        //    }, {
        //        source: 37,
        //        target: 40,
        //        linkType: "layer1layer2"
        //    },
        //    {
        //        source: 37,
        //        target: 41,
        //        linkType: "layer1layer2"
        //    }, {
        //        source: 37,
        //        target: 42,
        //        linkType: "layer1layer2"
        //    },
        //    {
        //        source: 37,
        //        target: 43,
        //        linkType: "layer1layer2"
        //    }
       ];

       var x = linksArray.length;
       for (var i = 0; i < x; i++) {
           switch (linksArray[i].linkType) {
               case "donaldlayer1":
                   linksArray[i].distance = 110;
                   break;
               case "layer1layer2":
                   linksArray[i].distance = 85;
                   break;
               case "tweetend":
                   linksArray[i].distance = 25;
                   break;
               case "crosslinktweetend":
                   linksArray[i].distance = 25;
                   break;
           }
       }

       function getthedata() {
           $.ajax({
                   url: "/api/jforce",
                   method: "GET"
               })
               .done(function (data) {
                   var n = data.length;
                   for (var i = 0; i < n; i++) {
                       if (data[i].position != 999) {
                           var node = new NodeConstruct(data[i].tweet, "white", data[i].layer, data[i].linkType, data[i].position);
                           nodesArray.push(node);
                       }
                   }
                   console.log(nodesArray);
                   layout();
               });
       }



       function layout() {
           var parsedData = {
               nodes: nodesArray,
               links: linksArray
           };



           var width = 700;
           var height = 500;

           var svg = d3.select("#force")
               .attr("width", width)
               .attr("height", height);

           var simulation = d3.forceSimulation()
               .force("link", d3.forceLink().distance(function (d) {
                   return d.distance;
               }).strength(2))
               .force("center", d3.forceCenter(width / 2, height / 2))
               .force("charge", d3.forceManyBody());


           simulation
               .nodes(parsedData.nodes);

           simulation
               .force("link")
               .links(parsedData.links);

           var link = svg.selectAll(".link")
               .data(parsedData.links)
               .enter().append("line")
               .attr("class", "link")
               .style("stroke", function (d) {
                   switch (d.linkType) {
                       case "donaldlayer1":
                           return "yellow";
                           break;
                       case "layer1layer2":
                           return "blue";
                           break;
                       case "tweetend":
                           return "lawngreen";
                           break;
                       case "crosslinktweetend":
                           return "red";
                           break;
                   }
               })
               .style("stroke-width", function (d) {
                   switch (d.linkType) {
                       case "donaldlayer1":
                           return "4px";
                           break;
                       case "layer1layer2":
                           return "2px";
                           break;
                       case "tweetend":
                           return "1px";
                           break;
                       case "crosslinktweetend":
                           return "2px";
                           break;
                   }
               });


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
                   switch (d.name) {
                       case "ROOT":
                           return 35;
                           break;
                       case "ROSIE O'DONNELL":
                           return 3;
                           break;
                       case "HILLARY CLINTON":
                           return 3;
                           break;
                       case "RAND PAUL":
                           return 3;
                           break;
                       case "JEB BUSH":
                           return 3;
                           break;
                       case "MARCO RUBIO":
                           return 3;
                           break;
                       case "NICKNAMES":
                           return 7;
                           break;
                       case "PERSONAL ATTACKS":
                           return 3;
                           break;
                       default:
                           return 3;
                   }
               })
               .style("fill", function (d) {
                   if (d.name === "ROOT") {
                       return "transparent";
                   } else {
                       return "red";
                   }
               });

           node.append("image")
               .attr("xlink:href", function (d) {
                   switch (d.name) {
                       case "ROOT":
                           return "https://1minutecandidate.co/wp-content/uploads/2015/09/300px-Donald-Trump-circle.png";
                           break;
                       default:
                           return;
                   }

               })
               .attr("x", -35)
               .attr("y", -35)
               .attr("width", 70)
               .attr("height", 70);

        //    node.append("image")
        //        .attr("xlink:href", function (d) {
        //            switch (d.name) {
        //                case "HILLARY CLINTON":
        //                    return "http://www.theskimm.com/assets/elections/headshot_hillary-85c300a86beccd74b7d461a1e7628828.png";
        //                    break;
        //                case "ROSIE O'DONNELL":
        //                    return "http://media.news.com.au/nnd//dce11461095ee66ecbcb72b6a8ca05c2/desktop/assets/rosie-o-donnell.png";
        //                    break;
        //                case "MARCO RUBIO":
        //                    return "https://www.speedybuttons.com/shop/image/Campaign/Rubio-304.png";
        //                    break;
        //                case "JEB BUSH":
        //                    return "http://www.theskimm.com/assets/elections/headshot_jeb-252f01aa89620129c70f0afbf736bc33.png";
        //                    break;
        //                case "RAND PAUL":
        //                    return "http://www.theskimm.com/assets/elections/headshot_rand-8f498b45648fad22a992b9d999e895fc.png";
        //                    break;
        //            }

        //        })
        //        .attr("x", -17)
        //        .attr("y", -17)
        //        .attr("width", 34)
        //        .attr("height", 34);


           node.append("text")
               .attr("dx", 12)
               .attr("dy", ".35em")
               .text(function (d) {
                   var str = d.name;
                   if (str.length > 25 || d.linkType === "donald") {
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
                           return "13px";
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
       }