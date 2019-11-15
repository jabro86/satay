import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Excercise } from "./Excercise";
import { User } from "./User";

@Entity("trainings")
export class Training extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) name: string;

  @Column("text") description: string;

  @Column("uuid") userId: string;

  @ManyToOne(
    () => User,
    user => user.trainings
  )
  user: User;

  @ManyToMany(
    () => Excercise,
    excercise => excercise.trainings
  )
  excercise: Excercise[];
}
