import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Features = sequelize.define(
  "features",
  {
    series_season_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "series_seasons",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
    },
  },

  { timestamps: true }
);

export default Features;
