import User from "../../models/User.js";
import Series from "../../models/Series/Series.js";
import Category from "../../models/Category.js";

import { Op, Sequelize } from "sequelize";

export const createSeries = async (req, res) => {
  const { id } = req.params;
  const { title, description, seasons_number } = req.body;
  try {
    if (!title || !description)
      return res.status(400).json({ message: "All fields are required" });

    const series = await Series.create({
      category_id: id,
      title,
      description,
      seasons_number,
    });

    return res
      .status(200)
      .json({ message: "Series created successfully", data: series });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const editSeries = async (req, res) => {
  const { id } = req.params;
  const { title, description, seasons_number } = req.body;
  try {
    const series = await Series.findByPk(id);
    if (!series) return res.status(404).json({ message: "series not found" });

    await Series.update(
      {
        title: title ? title : series.title,
        description: description ? description : series.description,
        seasons_number: seasons_number ? seasons_number : series.seasons_number,
        img_url: req.file ? req.file.filename : "default.png",
      },
      { where: { id: id } }
    );

    const updatedSeries = await Series.findByPk(id);

    return res
      .status(200)
      .json({ message: "Series updated successfully", data: updatedSeries });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteSeries = async (req, res) => {
  const { id } = req.params;
  try {
    const series = await Series.findByPk(id);
    if (!series) return res.status(404).json({ message: "Series not found" });

    const img_url = series.img_url;

    if (img_url !== "default.png") {
      try {
        if (fs.existsSync("uploads/series/" + img_url))
          fs.unlinkSync("uploads/series/" + img_url);
      } catch (error) {
        console.log({ message: error.message });
      }
    }

    await Series.destroy({ where: { id: id } });

    return res.status(200).json({ message: "Series deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getSeries = async (req, res) => {
  const { id } = req.params;
  try {
    const series = await Series.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          attributes: ["id", "full_name", "last_name", "username"],
        },
      ],
    });
    if (!series) return res.status(404).json({ message: "Series not found" });

    return res
      .status(200)
      .json({ message: "Series found successfully", data: series });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllSeries = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  try {
    const series = await Series.findAll({
      include: {
        model: User,
        attributes: ["id", "full_name", "last_name", "username"],
      },
      order: [[Sequelize.literal("createdAt"), "ASC"]],
      limit,
      offset,
    });
    if (series.length < 1)
      return res.status(404).json({ message: "Series not found" });

    return res.status(200).json({ message: "Series List: ", data: series });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getSeriesByCategory = async (req, res) => {
  const { title, search } = req.query;

  let filters = {};
  let filter = {};
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

    const data = await Series.findAll({
      where: filter,
      attributes: ["id", "category_id", "title", "description"],
      include: [
        {
          model: Category,
          attributes: ["id", "title"],
          where: filters,
        },
      ],
    });
    if (data.length < 1)
      return res.status(404).json({ message: "No series found" });

    return res.status(200).json({ message: "Series List: ", data: data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
