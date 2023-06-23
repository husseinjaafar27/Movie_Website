import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  const { id } = req.user;
  const { title, description } = req.body;
  try {
    if (!title || !description)
      return res.status(404).json({ message: "All  fields are required" });

    const category = await Category.findOne({ where: { title: title } });
    if (category)
      return res.status(404).json({ message: "Category title must be unique" });

    const newCategory = await Category.create({
      user_id: id,
      title,
      description,
    });

    return res
      .status(200)
      .json({ message: "Category created successfully.", data: newCategory });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const editCategory = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const category = await Category.findOne({ where: { id: id } });
    if (!category)
      return res.status(404).json({ message: "Category is not exist." });

    if (title && category.title === title) {
      return res.status(400).json({ message: "Category title must be unique" });
    }

    category.title = title ? title : category.title;
    category.desription = description ? description : category.desription;
    await category.save();

    return res
      .status(200)
      .json({ message: "Category updated successfully.", data: category });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ where: { id: id } });
    if (!category)
      return res.status(404).json({ message: "Category is not exist." });

    await Category.destroy({ where: { id: id } });

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
