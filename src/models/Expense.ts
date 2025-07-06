import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { User } from "./User";
import { Category } from "./Category";

@Table({ tableName: "expenses" })
export class Expense extends Model {
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  user_id!: number;

  @ForeignKey(() => Category)
  @Column({ allowNull: false })
  category_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Category)
  category!: Category;

  @Column({ type: DataType.STRING, allowNull: false })
  description!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount!: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  expense_date!: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt!: Date;
}
