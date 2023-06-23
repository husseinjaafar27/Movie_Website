import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Movie = sequelize.define(
  "movies",
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
    img_url: {
      type: DataTypes.STRING,
      defaultValue: "default.png",
    },
    status: {
      type: DataTypes.ENUM(["Coming Soon", "Watch Now"]),
    },
    release_date: {
      type: DataTypes.DATE,
    },
    audio_language: {
      type: DataTypes.STRING,
    },
    sub_title_en: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sub_title_ar: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    movie_time: {
      type: DataTypes.TIME,
    },
    have_parts: {
      type: DataTypes.BOOLEAN,
    },
    favorite_number: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

export default Movie;
