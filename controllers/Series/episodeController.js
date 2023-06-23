import { Op, Sequelize } from "sequelize";
import Category from "../../models/Category.js";
import Episode from "../../models/Series/Episode.js";
import Season from "../../models/Series/Series_Season.js";

const add_days = function (dt, days) {
  const newDate = new Date(dt);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const createEpisode = async (req, res) => {
  const { id } = req.params;
  const { seasonId } = req.params;
  const { title, description, release_date } = req.body;
  try {
    if (!title || !description)
      return res.status(400).json({ message: "All fields are required" });

    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ message: "category not found" });

    const season = await Season.findByPk(seasonId);
    if (!season) return res.status(404).json({ error: "Season not found" });

    const episode = await Episode.create({
      season_id: seasonId,
      category_id: id,
      title,
      description,
      release_date: release_date
        ? add_days(new Date(), release_date)
        : Date.now(),
    });

    return res
      .status(200)
      .json({ message: "Episode created successfully", data: episode });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export const editEpisode = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    release_date,
    featured,
    audio_language,
    sub_title_en,
    sub_title_ar,
    episode_time,
  } = req.body;
  try {
    const episode = await Episode.findByPk(id);
    if (!episode) return res.status(404).json({ message: "Episode not found" });

    const status = episode.status;
    if (release_date)
      if (status === "Coming Soon") {
        episode.release_date = add_days(new Date(), release_date);
        await episode.save();
      } else if (status === "Watch Now") {
        return res
          .status(400)
          .json({ message: "You can't update release date" });
      }
    await Episode.update(
      {
        title: title ? title : episode.title,
        description: description ? description : episode.description,
        featured: featured ? featured : episode.featured,
        audio_language: audio_language
          ? audio_language
          : episode.audio_language,
        sub_title_en: sub_title_en ? sub_title_en : episode.sub_title_en,
        sub_title_ar: sub_title_ar ? sub_title_ar : episode.sub_title_ar,
        episode_time: episode_time ? episode_time : episode.episode_time,
        img_url: req.file ? req.file.filename : "default.png",
      },
      { where: { id: id } }
    );

    const updatedEpisode = await Episode.findByPk(id);

    return res
      .status(200)
      .json({ message: "Episode updated successfully", data: updatedEpisode });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const episode = await Episode.findByPk(id);
    if (!episode) return res.status(404).json({ message: "Episode not found" });

    const img_url = episode.img_url;

    if (img_url !== "default.png") {
      try {
        if (fs.existsSync("uploads/episode/" + img_url))
          fs.unlinkSync("uploads/episode/" + img_url);
      } catch (error) {
        console.log({ message: error.message });
      }
    }

    await Episode.destroy({ where: { id: id } });

    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getEpisode = async (req, res) => {
  const { id } = req.params;
  try {
    const episode = await Episode.findOne({
      where: { id: id },
      include: [
        {
          model: Season,
          attributes: ["id", "title"],
        },
        {
          model: Category,
          attributes: ["id", "title"],
        },
      ],
    });
    if (episode.length < 1)
      return res.status(404).json({ message: "No episode found" });

    return res
      .status(200)
      .json({ message: "Episode fetched successfully", data: episode });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getEpisodeSeason = async (req, res) => {
  const { id } = req.params;
  try {
    const episode = await Episode.findAll({
      where: { season_id: id },
      include: [
        {
          model: Season,
          attributes: ["id", "title"],
        },
        {
          model: Category,
          attributes: ["id", "title"],
        },
      ],
      order: [[Sequelize.literal("createdAt"), "ASC"]],
    });
    if (episode.length < 1)
      return res.status(404).json({ message: "No episode found" });

    return res.status(200).json({ message: "Episode List", data: episode });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getEpisodeByFilter = async (req, res) => {
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

    const data = await Episode.findAll({
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

    if (data.length < 1)
      return res.status(404).json({ message: "No episodes found" });

    return res.status(200).json({ message: "Episode List: ", data: data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export const episodeStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const episode = await Episode.findByPk(id);
    if (!episode) return res.status(404).json({ message: "Episode not found" });

    if (new Date() < episode.release_date) {
      episode.status = "Coming Soon";
      await episode.save();
    } else {
      episode.status = "Watch Now";
      await episode.save();
    }

    return res
      .status(200)
      .json({ message: "Episode status updated", status: episode.status });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
