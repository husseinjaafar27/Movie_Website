import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Series_Season = sequelize.define(
  "series_seasons",
  {
    series_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "series",
        key: "id",
      },
    },
    episodes_number: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    season_number: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    img_url: {
      type: DataTypes.STRING,
      defaultValue: "default.png",
    },
  },
  { timestamps: true }
);

export default Series_Season;
