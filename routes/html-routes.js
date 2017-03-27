// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

var db = require("../models");
// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads view.html
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/main.html"));
    });

    app.get("/graph/area", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/graphs.html"));
    });
    app.get("/graph/bar", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/bargraph.html"));
    });
    // Route to the cms page
    app.get("/cms", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/cms.html"));
    });

    // blog route loads blog.html
    app.get("/blog", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/blog.html"));
    });

    //     var response;
    // app.get("/quotes", function (req, res) {
    //     // app.get("/api/quotes", function (req, res) {
    //     //     response = res;
    //     // });
    //     res.render("index", {
    //         quotes: res
    //     });
    // });
    app.get("/quotes", function (req, res) {
        // Add sequelize code to find all posts, and return them to the user with res.json

        db.quotes.findAll({})
            .then(function (result) {
                res.render("index", {
                    quotes: result
                });
                // return res.json(result);
            });
    });

    app.get("/quotes/rating/:rating", function (req, res) {
        // Add sequelize code to find all posts where the category is equal to req.params.category,
        // return the result to the user with res.json

        db.quotes.findAll({
                where: {
                    rating: req.params.rating
                }
            })
            .then(function (result) {
                res.render("index", {
                    quotes: result
                });
            });
    });

    app.get("/quotes/id/:id", function (req, res) {
        // Add sequelize code to find a single post where the id is equal to req.params.id,
        // return the result to the user with res.json
        db.quotes.findAll({
                where: {
                    id: req.params.id
                }
            })
            .then(function (result) {
                res.render("index", {
                    quotes: result
                });
            });
    });
};
