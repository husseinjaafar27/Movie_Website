import Actors from "../../models/Series/Actors.js";
import Series_Season from "../../models/Series/Series_Season.js";

export const addActor = async (req, res) => {
  const { id } = req.params;
  const { name, detail } = req.body;
  try {
    const season = await Series_Season.findByPk(id);
    if (!season) return res.status(404).json({ message: "Season not found" });

    const actor = await Actors.create({
      series_season_id: id,
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

export const getSeriesActors = async (req, res) => {
  const { id } = req.params;
  try {
    const season = await Series_Season.findByPk(id);
    if (!season) return res.status(404).json({ message: "Season not found" });

    const actors = await Actors.findAll({ where: { series_season_id: id } });
    if (actors.length < 1)
      return res.status(404).json({ message: "Actors not found" });

    return res
      .status(200)
      .json({ message: "Fetched successfully", data: actors });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
