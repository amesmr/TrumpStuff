var mysql = require("mysql");
var moment = require("moment");
var twitterObj = require("./keys.js");
var twitter = require('twitter');


var connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "platinum",
  
});

getMyTweets();


var currentMax = "";
var tweetCount = 0;

function getMyTweets(maxid) {
    var tweetValues = [];
    var twitterCreds = twitterObj.twitterKeys;
    var user = new twitter(twitterCreds);
    var params = { screen_name: '@realDonaldTrump', max_id: maxid };
    user.get('statuses/user_timeline.json?screen_name=twitterapi&count=20', params, function(error, tweets, response) {
        if (error) throw error;

        var n = tweets.length;
        for (var i = 0; i < n; i++) {
            var tweetArray = [];
            var str = tweets[i].text;
            // if (str.includes("&" || ">" || "<" || "'" || "(" || ")" || "/" || "*")){
            //     str = "hello";
            // }
            // str.replace(/[\u0800-\uFFFF]/g, '');
          
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
        if (tweetCount < 4) {
            insertIntoTable(tweetValues);
            getMyTweets(currentMax);

        }
    });
}


// var valueArray = [];

// for (var i = 0; i < 10; i++) {
//     var tweetArray = [];
//     var str = "Hello";
//     var num = i;
//     var str2 = "World";
//     tweetArray.push(str);
//     tweetArray.push(str2);
//     tweetArray.push(num);

//     valueArray.push(tweetArray);




function insertIntoTable(tweetValues) {

    
        var sql = "INSERT INTO trumptest.trump_tweets (tweet, tweet_timestamp, tweet_id) VALUES ?";
        connection.query(sql, [tweetValues], function(err) {
            if (err) throw err;
           
            console.log("success");

        });

    

}
