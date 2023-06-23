import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Episode = sequelize.define(
  "episodes",
  {
    season_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "series_seasons",
        key: "id",
      },
    },
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
    episode_time: {
      type: DataTypes.TIME,
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

export default Episode;
