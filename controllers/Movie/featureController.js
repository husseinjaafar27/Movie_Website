import Features from "../../models/Movie/Features.js";
import Movie from "../../models/Movie/Movie.js";

export const addFeature = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const feature = await Features.create({
      movie_id: id,
      title,
    });

    return res
      .status(200)
      .json({ message: "Created successfully", data: feature });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getMovieFeatures = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const features = await Features.findAll({ where: { movie_id: id } });
    if (features.length < 1)
      return res.status(404).json({ message: "Features not found" });

    return res
      .status(200)
      .json({ message: "Fetched successfully", data: features });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
