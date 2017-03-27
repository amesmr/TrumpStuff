module.exports = function (sequelize, DataTypes) {
  var Tweets = sequelize.define("tweets", {

    tweet_number: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tweet: {
      type: DataTypes.STRING(1000)
    },
    tweet_date: {
      type: DataTypes.STRING(1000)
    },
    favorites: {
      type: DataTypes.INTEGER
    },
    retweets: {
      type: DataTypes.INTEGER
    },
    tweet_id: {
      type: DataTypes.BIGINT
    },
    // freezeTableName: true // Model tableName will be the same as the model name

  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'sequelize_tweets'
    
  });
  return Tweets;
};



