import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { User } from "./User";
import { TrainingsPlan } from "./TrainingsPlan";

@Entity("trainings")
export class Training extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) name: string;

  @Column("text") description: string;

  @Column("uuid") userId: string;

  @Column("date") startDate: Date;

  @ManyToOne(
    () => TrainingsPlan,
    trainingsPlan => trainingsPlan.trainings
  )
  trainingsPlan: TrainingsPlan;

  @OneToOne(
    () => User,
    user => user.training
  )
  user: User;
}
