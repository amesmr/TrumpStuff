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

    app.get("/api/alltweets", function (req, res) {
        db.all_tweets.findAll({})
            .then(function (result) {
                return res.json(result);
            });

    });
    app.get("/api/jforce", function (req, res) {
        db.force_tweets.findAll({})
            .then(function (result) {
                return res.json(result);
            });
    });
    app.get("/api/quotes", function (req, res) {
        // Add sequelize code to find all posts, and return them to the user with res.json

        db.quotes.findAll({})
            .then(function (result) {
                return res.json(result);
            });
    });
    // Get route for returning posts of a specific category
    app.get("/api/quotes/rating/:rating", function (req, res) {
        // Add sequelize code to find all posts where the category is equal to req.params.category,
        // return the result to the user with res.json

        db.quotes.findAll({
                where: {
                    rating: req.params.rating
                }
            })
            .then(function (result) {
                return res.json(result);
            });
    });

    // Get route for retrieving a single post
    app.get("/api/quotes/id/:id", function (req, res) {
        // Add sequelize code to find a single post where the id is equal to req.params.id,
        // return the result to the user with res.json
        db.quotes.findAll({
                where: {
                    id: req.params.id
                }
            })
            .then(function (result) {
                return res.json(result);
            });
    });

    // // POST route for saving a new post
    // app.post("/api/quote", function (req, res) {
    //     // Add sequelize code for creating a post using req.body,
    //     // then return the result using res.json
    //     var item = req.body
    //     db.Post.create({
    //         quote: item.title,
    //         body: item.body,
    //         complete: item.category
    //     }).then(function (result) {
    //         return res.json(result);
    //     });
    // });

};