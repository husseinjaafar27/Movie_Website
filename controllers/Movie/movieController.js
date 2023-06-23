import Category from "../../models/Category.js";
import Movie from "../../models/Movie/Movie.js";
import Season from "../../models/Movie/Season.js";
import Season_Movie from "../../models/Movie/Season_movie.js";

import fs from "fs";
import { Op, Sequelize } from "sequelize";
import Movie_Season from "../../models/Movie/Season_movie.js";

const add_days = function (dt, days) {
  const newDate = new Date(dt);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const createMovie = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    release_date,
    have_parts,
    first_part,
    seasonId,
    seasonTitle,
  } = req.body;

  let number = [];
  try {
    if (!title || !description)
      return res.status(400).json({ message: "All fields are required" });

    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ message: "category not found" });

    const movie = await Movie.create({
      category_id: id,
      title,
      description,
      release_date: release_date
        ? add_days(new Date(), release_date)
        : Date.now(),
      have_parts: have_parts,
    });

    if (have_parts === true)
      if (first_part === false) {
        const season = await Season.findOne({ where: { id: seasonId } });
        if (!season)
          return res.status(404).json({ message: "Season not found" });

        const check = await Season_Movie.findAll({
          where: { season_id: season.id },
        });
        check.map((item) => {
          number.push(item.movie_part_number);
        });

        await Season_Movie.create({
          movie_id: movie.id,
          season_id: season.id,
          movie_part_number: number[number.length - 1] + 1,
        });
      } else if (first_part === true) {
        const check = await Season.findOne({ where: { title: seasonTitle } });
        if (check)
          return res.status(400).json({ message: "Title must be unique" });

        const newSeason = await Season.create({
          title: seasonTitle,
          category_id: id,
        });

        await Season_Movie.create({
          movie_id: movie.id,
          season_id: newSeason.id,
          movie_part_number: 1,
        });
      }

    return res
      .status(200)
      .json({ message: "Movie created successfully", data: movie });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const editMovie = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    actors,
    release_date,
    featured,
    audio_language,
    sub_title_en,
    sub_title_ar,
    movie_time,
  } = req.body;

  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const status = movie.status;
    if (release_date)
      if (status === "Coming Soon") {
        movie.release_date = add_days(new Date(), release_date);
        await movie.save();
      } else if (status === "Watch Now") {
        return res
          .status(400)
          .json({ message: "You can't update release date" });
      }

    await Movie.update(
      {
        title: title ? title : movie.title,
        description: description ? description : movie.description,
        actors: actors ? actors : movie.actors,
        featured: featured ? featured : movie.featured,
        audio_language: audio_language ? audio_language : movie.audio_language,
        sub_title_en: sub_title_en ? sub_title_en : movie.sub_title_en,
        sub_title_ar: sub_title_ar ? sub_title_ar : movie.sub_title_ar,
        movie_time: movie_time ? movie_time : movie.movie_time,
        img_url: req.file ? req.file.filename : "default.png",
      },
      { where: { id: id } }
    );

    const updatedMovie = await Movie.findByPk(id);

    return res
      .status(200)
      .json({ message: "Movie updated successfully", data: updatedMovie });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const img_url = movie.img_url;

    if (img_url !== "default.png") {
      try {
        if (fs.existsSync("uploads/movie/" + img_url))
          fs.unlinkSync("uploads/movie/" + img_url);
      } catch (error) {
        console.log({ message: error.message });
      }
    }
    if (movie.have_parts === true) {
      const part = await Movie_Season.findOne({ where: { movie_id: id } });
      const check = await Movie_Season.findAll({
        where: { season_id: part.season_id },
      });
      if (check.length == 1) {
        await Season.destroy({ where: { id: part.season_id } });
      }
    }
    await Movie.destroy({ where: { id: id } });

    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({
      where: { id: id },
      include: { model: Category, attributes: ["id", "title"] },
    });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    return res
      .status(200)
      .json({ message: "Movie fetched successfully", data: movie });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllMovies = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  try {
    const movies = await Movie.findAndCountAll({
      include: { model: Category, attributes: ["id", "title"] },
      order: [[Sequelize.literal("createdAt"), "ASC"]],
      limit,
      offset,
    });
    if (movies.length < 1)
      return res.status(404).json({ message: "No movies found" });

    return res.status(200).json({ message: "Movies List: ", data: movies });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getMoviesByFilter = async (req, res) => {
  const { title, search } = req.query;

  let filters = {},
    filter = {};
  try {
    if (title)
      if (Array.isArray(title))
        filters = {
          title: {
            [Op.in]: title,
          },
        };
      else
        filters = {
          Title: {
            [Op.eq]: title,
          },
        };

    if (search)
      filter = {
        title: {
          [Op.like]: `%${search}%`,
        },
      };

    const data = await Movie.findAll({
      where: filter,
      attributes: ["id", "category_id", "title", "description"],
      include: [
        {
          model: Category,
          attributes: ["id", "title"],
          where: filters,
          order: [[Sequelize.literal("createdAt"), "ASC"]],
        },
      ],
    });

    return res.status(200).json({ message: "Movies List: ", data: data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const watchMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    movie.view += 1;

    return res
      .status(200)
      .json({ message: "Movie status updated", status: movie.status });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const movieStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    if (new Date() < movie.release_date) {
      movie.status = "Coming Soon";
      await movie.save();
    } else {
      movie.status = "Watch Now";
      await movie.save();
    }

    return res
      .status(200)
      .json({ message: "Movie status updated", status: movie.status });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
