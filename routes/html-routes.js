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

    app.get("/quotes", function (req, res) {
        db.quotes.findAll({})
            .then(function (result) {
                res.render("index", {
                    quotes: result
                });
                // return res.json(result);
            });
    });

    app.get("*rating/:rating", function (req, res) {
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

    app.get("*/id/:id", function (req, res) {
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


    app.get("*/rating/css/*", function (req, res) {
        console.log("in css route");
        res.sendFile(path.join(__dirname, "../public/css/" + req.params[1]));
    });

    app.get("*/id/css/*", function (req, res) {
        console.log("in css route");
        res.sendFile(path.join(__dirname, "../public/css/" + req.params[1]));
    });

   app.use(function (req, res, next) {
        res.status(404).sendFile(path.join(__dirname, "../public/error.html"));
    });
//     app.get(function (req, res, next) {
//   res.status(404).send()
// })
};
