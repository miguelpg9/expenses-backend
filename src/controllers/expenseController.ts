import { Request, Response } from "express";
import { Expense } from "../models/Expense";
import { Op } from "sequelize";
import { Category } from "../models/Category";

export const getAllExpenses = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { from, to, category } = req.query;
  try {
    const where: any = {
      user_id: user.id,
    };
    if (from || to) {
      where.expense_date = {};
      if (from) where.expense_date[Op.gte] = from;
      if (to) where.expense_date[Op.lte] = to;
    }
    if (category) {
      where.category_id = category;
    }
    const expenses = await Expense.findAll({
      where,
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
      order: [["expense_date", "DESC"]],
    });
    return res.json(expenses);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener gastos" });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  try {
    const expense = await Expense.findOne({
      where: { id, user_id: user.id },
    });
    if (!expense) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }
    return res.json(expense);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener gasto" });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  const { description, amount, category_id, expense_date } = req.body;
  const user = (req as any).user;
  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "La descripción es obligatoria y debe ser texto" });
  }
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res
      .status(400)
      .json({ message: "El monto debe ser un número positivo" });
  }
  if (!category_id || isNaN(category_id)) {
    return res
      .status(400)
      .json({ message: "La categoría es obligatoria y debe ser numérica" });
  }
  if (!expense_date || isNaN(Date.parse(expense_date))) {
    return res
      .status(400)
      .json({ message: "La fecha debe tener formato válido (YYYY-MM-DD)" });
  }
  try {
    const expense = await Expense.create({
      description,
      amount,
      category_id: category_id,
      expense_date,
      user_id: user.id,
    });

    return res
      .status(201)
      .json({ message: "Gasto registrado correctamente", expense });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear gasto" });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, amount, category_id, expense_date } = req.body;
  const user = (req as any).user;
  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "La descripción es obligatoria y debe ser texto" });
  }
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res
      .status(400)
      .json({ message: "El monto debe ser un número positivo" });
  }
  if (!category_id || isNaN(category_id)) {
    return res
      .status(400)
      .json({ message: "La categoría es obligatoria y debe ser numérica" });
  }
  if (!expense_date || isNaN(Date.parse(expense_date))) {
    return res
      .status(400)
      .json({ message: "La fecha debe tener formato válido (YYYY-MM-DD)" });
  }
  try {
    const expense = await Expense.findOne({ where: { id, user_id: user.id } });
    if (!expense) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }
    expense.description = description;
    expense.amount = amount;
    expense.category_id = category_id;
    expense.expense_date = expense_date;
    await expense.save();
    return res.json({ message: "Gasto actualizado correctamente", expense });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar gasto" });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  try {
    const expense = await Expense.findOne({ where: { id, user_id: user.id } });
    if (!expense) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }
    await expense.destroy();
    return res.json({ message: "Gasto eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar gasto" });
  }
};
