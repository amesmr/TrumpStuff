module.exports = function(sequelize, DataTypes) {
  var Quotes = sequelize.define("quotes", {
    quote: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    source: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          len: [1]
      }
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    year: {
        type: DataTypes.YEAR
    }
  });
  return Quotes;
};
