import Actors from "../../models/Movie/Actors.js";
import Movie from "../../models/Movie/Movie.js";

export const addActor = async (req, res) => {
  const { id } = req.params;
  const { name, detail } = req.body;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const actor = await Actors.create({
      movie_id: id,
      name,
      detail,
    });

    return res
      .status(200)
      .json({ message: "Created successfully", data: actor });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getMovieActors = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const actors = await Actors.findAll({ where: { movie_id: id } });
    if (actors.length < 1)
      return res.status(404).json({ message: "Actors not found" });

    return res
      .status(200)
      .json({ message: "Fetched successfully", data: actors });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
