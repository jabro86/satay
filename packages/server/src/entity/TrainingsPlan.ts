import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { Training } from "./Training";

export interface TrainingSet {
  expectedRepitions: number;
  actualRepitions: number;
  expectedWeight: number;
  actualWeight: number;
  breakAfterInSec: number;
}

export interface ExcerciseWithSets {
  excerciseId: string;
  type: string;
  notes: string;
  sets: TrainingSet[];
}

export interface Workout {
  title: string;
  status: string;
  excercises: ExcerciseWithSets[];
}

export interface Week {
  workouts: Workout[];
}

export interface Plan {
  weeks: Week[];
}

@Entity("trainingsplans")
export class TrainingsPlan extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) name: string;

  @Column("text") description: string;

  @Column("simple-json") plan: Plan;

  @OneToMany(
    () => Training,
    training => training.trainingsPlan
  )
  trainings: Training[];
}
