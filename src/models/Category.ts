import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { Expense } from "./Expense";

@Table({ tableName: "categories" })
export class Category extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name!: string;

  @HasMany(() => Expense)
  expenses!: Expense[];

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt!: Date;
}
