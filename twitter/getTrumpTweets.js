var mysql = require("mysql");
var moment = require("moment");
var twitterObj = require("./keys.js");
var twitter = require('twitter');

getMyTweets();
function getMyTweets() {
    var twitterObj = require("./keys.js");
    var Twitter = require('twitter');
    var twitterCreds = twitterObj.twitterKeys;
    var user = new twitter(twitterCreds);
    var params = { screen_name: '@realDonaldTrump' };
    user.get('statuses/user_timeline.json?screen_name=twitterapi&count=400', params, function(error, tweets, response) {
        if (error) throw error;
        // if no error occurs a for loop will console log each tweet

        // call the function which logs the command and timestamp to log.txt file
        var n = tweets.length;
        for (var i = 0; i < n; i++) {
            console.log("\n" + i + ".." + tweets[i].text + "\n");
        }

    });
}
