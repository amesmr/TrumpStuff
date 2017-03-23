var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");
var db = require("./models");

var port = 3000;

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set Handlebars.
var exphbs = require("express-handlebars");
var viewsPath = path.join(__dirname, "public/views");
app.engine("handlebars", exphbs({ viewsPath : "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
