import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Features = sequelize.define(
  "features",
  {
    movie_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "movies",
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
