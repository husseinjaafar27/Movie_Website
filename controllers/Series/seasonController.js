import Season from "../../models/Series/Series_Season.js";
import Series from "../../models/Series/Series.js";
import User from "../../models/User.js";

export const createSeason = async (req, res) => {
  const { id } = req.params;
  const { episodes_number, season_title, season_number } = req.body;
  try {
    const series = await Series.findByPk(id);
    if (!series) return res.status(404).json({ error: "Series not found" });

    const season = await Season.create({
      series_id: series.id,
      episodes_number,
      season_title,
      season_number,
    });

    return res
      .status(200)
      .json({ message: "Season created successfully", data: season });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const editSeason = async (req, res) => {
  const { id } = req.params;
  const { episodes_number, season_title, season_number } = req.body;
  try {
    const season = await Season.findByPk(id);
    if (!season) return res.status(404).json({ message: "season not found" });

    await Season.update(
      {
        episodes_number: episodes_number
          ? episodes_number
          : season.episodes_number,
        season_title: season_title ? season_title : season.season_title,
        season_number: season_number ? season_number : season.season_number,
        img_url: req.file ? req.file.filename : "default.png",
      },
      { where: { id: id } }
    );

    const updatedSeason = await Season.findByPk(id);

    return res
      .status(200)
      .json({ message: "Season updated successfully", data: updatedSeason });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteSeason = async (req, res) => {
  const { id } = req.params;
  try {
    const season = await Season.findByPk(id);
    if (!season) return res.status(404).json({ message: "Season not found" });

    const img_url = season.img_url;

    if (img_url !== "default.png") {
      try {
        if (fs.existsSync("uploads/season/" + img_url))
          fs.unlinkSync("uploads/season/" + img_url);
      } catch (error) {
        console.log({ message: error.message });
      }
    }

    await Season.destroy({ where: { id: id } });

    return res.status(200).json({ message: "Season deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getSeasonsSeries = async (req, res) => {
  const { id } = req.params;
  try {
    const series = await Series.findByPk(id);
    if (!series) return res.status(404).json({ message: "Series not found" });

    const seasons = await Season.findAll({
      where: { series_id: id },
      include: [
        { model: Series, attributes: ["id", "title", "description"] },
        {
          model: User,
          attributes: ["id", "first_name", "last_name", "username"],
        },
      ],
    });
    if (seasons.length < 1)
      return res.status(404).json({ message: "No seasons found" });

    return res.status(200).json({ message: "Seasons List: ", data: seasons });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getSeason = async (req, res) => {
  const { id } = req.params;
  try {
    const season = await Season.findOne({
      where: { id: id },
      include: [
        { model: Series, attributes: ["id", "title", "description"] },
        {
          model: User,
          attributes: ["id", "first_name", "last_name", "username"],
        },
      ],
    });
    if (!season) return res.status(404).json({ message: "No season found" });

    return res
      .status(200)
      .json({ message: "Season found successfully", data: season });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
