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

    app.get("/quotes", function (req, res) {
        db.quotes.findAll({})
            .then(function (result) {
                res.render("index", {
                    quotes: result
                });
                // return res.json(result);
            });
    });

    app.get("/quotes/rating/:rating", function (req, res) {
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
