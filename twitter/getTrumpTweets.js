var mysql = require("mysql");
var moment = require("moment");
var twitterObj = require("./keys.js");
var twitter = require('twitter');
var trumpObj = require("./alltweets.js");

var goodArray = [];
var connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "platinum",

});

// getMyTweets();


var currentMax = "";
var tweetCount = 0;

function getMyTweets(maxid) { // works for 3200
    var tweetValues = [];
    var twitterCreds = twitterObj.twitterKeys;
    var user = new twitter(twitterCreds);
    var params = { screen_name: '@realDonaldTrump', max_id: maxid };
    user.get('statuses/user_timeline.json?screen_name=twitterapi&count=150', params, function(error, tweets, response) {
        if (error) throw error;

        var n = tweets.length;
        for (var i = 0; i < n; i++) {
            var tweetArray = [];
            var str = tweets[i].text;
            str = str.replace(/[^\x20-\x7E]+/g, '');
            tweetArray.push(str);
            tweetArray.push(tweets[i].created_at);
            tweetArray.push(tweets[i].id);
            tweetValues.push(tweetArray);
            if (i === n - 1) {
                currentMax = tweets[i].id;
            }

        }
        tweetCount++;
        console.log("\n----------------------");
        console.log(tweetValues);
        console.log("----------------------\n\n\n");
        if (tweetCount < 33) {
            insertIntoTable(tweetValues);
            setTimeout(function() { getMyTweets(currentMax); }, 250);

        }
    });

}
formatTweets();

function formatTweets() {
    for (var i = 30000; i < 30678; i++) {
        var tweetArray = [];
        var str = trumpObj[i][1];
        str = str.replace(/[^\x20-\x7E]+/g, '');
        tweetArray.push(trumpObj[i][0]);
        tweetArray.push(str);

        goodArray.push(tweetArray);
    }
    console.log(goodArray);
    insertIntoTable();
}


function insertIntoTable(tweetValues) {
    try {

        var sql = "INSERT INTO trump_archived.trump_tweets (tweet_timestamp, tweet) VALUES ?";
        connection.query(sql, [goodArray], function(err) {
            if (err) throw err;

            console.log("success");

        });
    } catch (err) {
        console.log(err);
    }



}
