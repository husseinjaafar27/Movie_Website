import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Series = sequelize.define(
  "series",
  {
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    seasons_number: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    img_url: {
      type: DataTypes.STRING,
      defaultValue: "default.png",
    },
    favorite_number: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

export default Series;
