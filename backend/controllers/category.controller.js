import Category from "../models/category.model.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error in getCategories controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Kategori adı gerekli" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Bu kategori zaten mevcut" });
    }

    const category = new Category({ name });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    console.log("Error in addCategory controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Kategori bulunamadı" });
    }

    res.status(200).json({ message: "Kategori silindi" });
  } catch (error) {
    console.log("Error in deleteCategory controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
