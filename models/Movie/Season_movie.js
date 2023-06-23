import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Movie_Season = sequelize.define(
  "movie_season",
  {
    movie_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "movies",
        key: "id",
      },
    },
    season_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "seasons",
        key: "id",
      },
    },
    movie_part_number: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

export default Movie_Season;
