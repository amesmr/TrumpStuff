// var Sequelize = require('sequelize');


// // var sequelize = new Sequelize('trump_archived', 'root', 'platinum', {
// //   host: 'localhost',
// //   dialect: 'mysql',

// //   pool: {
// //     max: 5,
// //     min: 0,
// //     idle: 10000
// //   },

// // });


// var sequelize = new Sequelize('trump_archived', 'root', 'platinum', {
//     host: 'localhost',
//     dialect: 'mysql',

//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     },

// });

// function startup() {

//     var Tweet = sequelize.define('trump_tweets', {
//         tweet_number: Sequelize.INTEGER,
//         tweet_timestamp: Sequelize.STRING,
//         tweet: Sequelize.STRING
//     });


//     console.log(Tweet);
//     Tweet.findOne({
//         attributes: ['tweet'],
//         where: ["tweet LIKE ?", "%hillary%"],
//         limit: 10
//     }).then(function(dbUser) {
//         var n = dbUser.length;
//         console.log(n);
//         // for (var i = 0; i <= n; i++) {
//         //     console.log(dbUser);
//         // }
//            console.log(dbUser);
//     });
// }

// startup();




// // Tweet.findAll({
// //     attributes: ['tweet_number', 'tweet_timestamp', 'tweet'],
// //     where: {
// //         tweet_number: 2
// //     }
// // });

var mysql = require("mysql");
var connection = mysql.createConnection({
    port: 3306,
    user: "jjwguest",
    password: "platinum",
    database: "trump_archived"
});


getAllRes();
function getAllRes() {
    connection.query("SELECT `tweet_number`, `tweet_timestamp`, `tweet`, COUNT(*) FROM `trump_tweets` WHERE tweet LIKE '%pattinson%' GROUP BY tweet_number;",
        function(err, res) {
            if (err) throw err;

            var n = res.length;
            for (var i = 0; i < n; i++) {
               console.log(res[i].tweet);

            }
            console.log(n);
        });
}