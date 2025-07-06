import { Request, Response } from "express";
import { Expense } from "../models/Expense";
import { Category } from "../models/Category";
import { Sequelize } from "sequelize";

export const getSummary = async (req: Request, res: Response) => {
  const user = (req as any).user;
  try {
    const total = await Expense.sum("amount", {
      where: { user_id: user.id },
    });
    const totales = await Expense.findAll({
      attributes: [
        "category_id",
        [Sequelize.fn("SUM", Sequelize.col("amount")), "total"],
      ],
      where: { user_id: user.id },
      group: ["category_id", "category.id"],
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });
    const totalesCategory = totales.map((item: any) => ({
      category_id: item.category_id,
      category_name: item.category?.name,
      total: parseFloat(item.get("total")),
    }));
    return res.json({ total: total || 0, totalesCategory });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener resumen" });
  }
};

export const getChartSummary = async (req: Request, res: Response) => {
  const user = (req as any).user;
  try {
    const totales = await Expense.findAll({
      attributes: [
        "category_id",
        [Sequelize.fn("SUM", Sequelize.col("amount")), "total"],
      ],
      where: { user_id: user.id },
      group: ["category_id", "category.id"],
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });
    const labels: string[] = [];
    const data: number[] = [];
    totales.forEach((item: any) => {
      labels.push(item.category?.name || "Sin categoría");
      data.push(parseFloat(item.get("total")));
    });
    return res.json({ labels, data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al generar datos para gráfico" });
  }
};
