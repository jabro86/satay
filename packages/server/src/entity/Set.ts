import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";

import { Excercise } from "./Excercise";
import { Training } from "./Training";

@Entity("sets")
export class Set extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) name: string;

  @Column("int", { array: true }) repetitions: number[];

  @Column("float", { array: true }) weights: number[];

  @Column("uuid") excerciseId: string;

  @ManyToOne(
    () => Excercise,
    excercise => excercise.sets
  )
  excercise: Excercise;

  @ManyToMany(
    () => Training,
    training => training.sets
  )
  trainings: Training[];
}
