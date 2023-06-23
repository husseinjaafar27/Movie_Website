import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Category = sequelize.define(
  "categories",
  {
    title: {
      type: DataTypes.ENUM([
        "Action",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Romance",
      ]),
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: true }
);

export default Category;
