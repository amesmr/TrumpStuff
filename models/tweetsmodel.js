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
    name: {
      type: DataTypes.STRING(1000)
    },

    layer: {
      type: DataTypes.INTEGER
    },
    linkType: {
      type: DataTypes.STRING(1000)

    },
    index: {
      type: DataTypes.INTEGER,
      defaultValue: 999
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'all_tweets'

  });
  return Tweets;
};