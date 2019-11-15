import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";

import { User } from "./User";
import { Set } from "./Set";

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
    () => Set,
    set => set.trainings
  )
  sets: Set[];
}
