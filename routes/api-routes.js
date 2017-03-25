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
        db.tweets.findAll({})
            .then(function (result) {
                return res.json(result);
            });
    });

    // Get route for returning posts of a specific category
    app.get("/api/posts/:rating", function (req, res) {
        // Add sequelize code to find all posts where the category is equal to req.params.category,
        // return the result to the user with res.json

        db.Post.findAll({
                where: {
                    category: req.params.rating
                }
            })
            .then(function (result) {
                return res.json(result);
            });
    });

    // Get route for retrieving a single post
    app.get("/api/posts/:id", function (req, res) {
        // Add sequelize code to find a single post where the id is equal to req.params.id,
        // return the result to the user with res.json
        db.Post.findAll({
                where: {
                    id: req.params.id
                }
            })
            .then(function (result) {
                return res.json(result);
            });
    });

    // POST route for saving a new post
    app.post("/api/posts", function (req, res) {
        // Add sequelize code for creating a post using req.body,
        // then return the result using res.json
        var item = req.body
        db.Post.create({
            tiquotetle: item.title,
            body: item.body,
            complete: item.category
        }).then(function (result) {
            return res.json(result);
        });
    });

    // DELETE route for deleting posts
    app.delete("/api/posts/:id", function (req, res) {
        // Add sequelize code to delete a post where the id is equal to req.params.id,
        // then return the result to the user using res.json
        console.log(req.params.id);
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            return res.json(result);
        });
    });

    // PUT route for updating posts
    app.put("/api/posts", function (req, res) {
        // Add code here to update a post using the values in req.body, where the id is equal to
        // req.body.id and return the result to the user using res.json
        db.Post.upsert(req.body, function (results) {})
            .then(function (results) {
                res.json(results).status(200);
            });
    });
};
