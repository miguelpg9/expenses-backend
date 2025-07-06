import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { Expense } from "../models/Expense";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5433,
  dialect: "postgres",
  models: [User, Category, Expense],
  logging: false,
});

export default sequelize;
