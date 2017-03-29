module.exports = function (sequelize, DataTypes) {
    var Force = sequelize.define("jforce", {

        tweet_number: {
            type: DataTypes.INTEGER,
            primaryKey: true
       
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
        tableName: 'force_tweets'

    });
    return Force;
};