import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

export interface TrainingSet {
  repitions: number;
  weight: number;
  weightDone: number;
  repitionsDone: number;
  breakAfterInSec: number;
}

export interface Excercise {
  excerciseInfoId: string;
  type: string;
  notes: string;
  sets: TrainingSet[];
}

export interface Workout {
  title: string;
  status: string;
  excercises: Excercise[];
}

export interface Week {
  workouts: Workout[];
}

export interface Plan {
  weeks: Week[];
}

@Entity("trainings")
export class Training extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) name: string;

  @Column("text") description: string;

  @Column("uuid") userId: string;

  @Column("date") startDate: Date;

  @Column("simple-json") plan: Plan;

  @OneToOne(
    () => User,
    user => user.training
  )
  user: User;
}
