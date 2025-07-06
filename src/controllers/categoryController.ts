import { Request, Response } from "express";
import { Category } from "../models/Category";

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener categorías" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({ message: "El nombre de la categoría es obligatorio" });
  }
  try {
    const exists = await Category.findOne({ where: { name } });
    if (exists) {
      return res.status(400).json({ message: "Categoría ya existe" });
    }
    const category = await Category.create({ name });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear categoría" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    category.name = name;
    await category.save();
    return res.json({
      message: "Categoría actualizada correctamente",
      category,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    await category.destroy();
    return res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
