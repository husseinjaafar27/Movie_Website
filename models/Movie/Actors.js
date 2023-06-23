import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Actors = sequelize.define(
  "actors",
  {
    movie_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "movies",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    detail: {
      type: DataTypes.STRING,
    },
  },

  { timestamps: true }
);

export default Actors;
