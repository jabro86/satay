import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Set } from "./Set";

@Entity("excercises")
export class Excercise extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) name: string;

  @Column("text") description: string;

  @Column("text") pictureUrl: string;

  @Column("text") videoUrl: string;

  @OneToMany(
    () => Set,
    set => set.excercise
  )
  sets: Set[];
}
