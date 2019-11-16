import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

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
