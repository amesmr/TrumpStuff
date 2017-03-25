// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    app.get("/api/quotes", function (req, res) {
        db.quotes.findAll({})
            .then(function (result) {
                return res.json(result);
            });
    });
    app.get("/api/alltweets", function (req, res) {
        db.tweets.findAll({})
            .then(function (result) {
                return res.json(result);
            });
    });
};