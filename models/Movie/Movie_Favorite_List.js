import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Movie_Favorite_List = sequelize.define(
  "movie_favorites",
  {
    user_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "users",
        key: "id",
      },
    },
    movie_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "movies",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM(["added", "removed"]),
    },
  },
  { timestamps: true }
);

export default Movie_Favorite_List;
