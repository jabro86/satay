import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("excercises")
export class Excercise extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") title: string;

  @Column("text") description: string;

  @Column("text") pictureUrlExcercise: string;

  @Column("text") videoUrlExcercise: string;

  @Column("text") stepsExcercise: string[];

  @Column("text") breathing: string;

  @Column("text") pictureUrlMuscles: string;

  @Column("text") listInvolvedMuscles: string[];
}
