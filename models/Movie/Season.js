import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Season = sequelize.define(
  "seasons",
  {
    title: {
      type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  { timestamps: true }
);

export default Season;
