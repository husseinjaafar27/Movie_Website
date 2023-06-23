import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Series_Favorite_List = sequelize.define(
  "series_favorites",
  {
    user_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "users",
        key: "id",
      },
    },
    series_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "series",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM(["added", "removed"]),
    },
  },
  { timestamps: true }
);

export default Series_Favorite_List;
