import Movie from "../../models/Movie/Movie.js";
import Movie_Favorite_List from "../../models/Movie/Movie_Favorite_List.js";

import { Sequelize } from "sequelize";
import User from "../../models/User.js";

export const addRemoveFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    const favorite = await Movie_Favorite_List.findOne({
      where: {
        user_id: req.user.id,
        movie_id: id,
      },
    });

    if (!favorite) {
      const favorite = await Movie_Favorite_List.create({
        user_id: req.user.id,
        movie_id: movie.id,
        status: "added",
      });

      movie.favorite_number += 1;
      await movie.save();

      return res
        .status(200)
        .json({ message: "Favorite added successfully", data: favorite });
    } else {
      if (favorite.status === "removed") {
        favorite.status = "added";
        await favorite.save();

        movie.favorite_number += 1;
        await movie.save();

        return res
          .status(200)
          .json({ message: "Favorite added successfully", data: favorite });
      } else if (favorite.status === "added") {
        favorite.status = "removed";
        await favorite.save();

        movie.favorite_number -= 1;
        await movie.save();

        return res
          .status(200)
          .json({ message: "Favorite removed successfully", data: favorite });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const favorite = await Movie_Favorite_List.findOne({
      where: { id: id, user_id: req.user.id, status: "added" },
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name", "username"],
        },
        {
          model: Movie,
          attributes: ["id", "title", "description"],
        },
      ],
    });
    if (!favorite) return res.status(404).json({ error: "Favorite not found" });

    return res
      .status(200)
      .json({ message: "Favorite fetched successfully", data: favorite });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllUserFavorite = async (req, res) => {
  const { id } = req.user;
  try {
    const favorite = await Movie_Favorite_List.findAll({
      where: { user_id: id, status: "added" },
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name", "username"],
        },
        {
          model: Movie,
          attributes: ["id", "title", "description"],
        },
      ],
      order: [[Sequelize.literal("createdAt"), "ASC"]],
    });
    if (favorite.length < 1)
      return res.status(404).json({ error: "No Favorite found" });

    return res.status(200).json({ message: "Favorite List: ", data: favorite });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
