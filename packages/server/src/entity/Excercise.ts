import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Training } from "./Training";

@Entity("excercises")
export class Excercise extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) name: string;

  @Column("text") description: string;

  @Column("text") pictureUrl: string;

  @Column("text") videoUrl: string;

  @OneToMany(
    () => Training,
    training => training.excercise
  )
  trainings: Training[];
}
