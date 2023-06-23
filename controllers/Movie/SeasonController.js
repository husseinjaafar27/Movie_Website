import Category from "../../models/Category.js";
import Movie from "../../models/Movie/Movie.js";
import Season from "../../models/Movie/Season.js";
import Movie_Season from "../../models/Movie/Season_movie.js";

export const editSeason = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const season = await Season.findByPk(id);
    if (!season) return res.status(404).json({ message: "Season not found" });

    if (title) {
      const check = await Season.findOne({ where: { title: title } });
      if (check)
        return res.status(400).json({ message: "Title must be unique" });
    }

    season.title = title ? title : season.title;
    await season.save();

    return res
      .status(200)
      .json({ message: "Season updated successfully", data: season });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getSeasonsMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const season = await Season.findByPk(id);
    if (!season) return res.status(404).json({ message: "Season not found" });

    const Movies = await Movie_Season.findAll({
      where: { season_id: id },
      include: [
        { model: Movie, attributes: ["id", "title", "description"] },
        {
          model: Season,
        },
      ],
    });
    if (Movies.length < 1)
      return res.status(404).json({ message: "No seasons found" });

    return res.status(200).json({
      message: "Seasons List: ",
      count: `${Movies.length} movies found`,
      data: Movies,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getSeason = async (req, res) => {
  const { id } = req.params;
  try {
    const season = await Season.findOne({
      where: { id: id },
      include: { model: Category },
    });
    if (!season) return res.status(404).json({ message: "No season found" });

    return res
      .status(200)
      .json({ message: "Season found successfully", data: season });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
