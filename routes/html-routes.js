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

    app.get("/graphs", function (req, res) {
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

<<<<<<< HEAD
    //    app.use(function (req, res, next) {
    //         res.status(404).sendFile(path.join(__dirname, "../public/error.html"));
    //     });
    app.use(function (req, res, next) {
        res.status(404).send("<div style='text-align: center;'><h1> 404 Error</h1><h3> The page you requested can't be found </h3><img src='http://www.fairfaxunderground.com/forum/file.php?40,file=223627,filename=get_out_trump.jpg' alt='trumpImage'></div>");
    })
};
=======

    app.get("*/rating/css/*", function (req, res) {
        console.log("in css route");
        res.sendFile(path.join(__dirname, "../public/css/" + req.params[1]));
    });

    app.get("*/id/css/*", function (req, res) {
        console.log("in css route");
        res.sendFile(path.join(__dirname, "../public/css/" + req.params[1]));
    });


};
>>>>>>> origin
