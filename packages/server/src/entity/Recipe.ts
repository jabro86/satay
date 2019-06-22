import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { User } from "./User";

@Entity("recipes")
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) name: string;

  @Column("text") pictureUrl: string;

  @Column("text") description: string;

  @Column("text", { array: true }) ingredients: string[];

  @Column("text", { array: true }) steps: string[];

  @Column("uuid") userId: string;

  @ManyToOne(() => User, user => user.recipes)
  user: User;
}
