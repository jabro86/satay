import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("excercises")
export class Excercise extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") title: string;

  @Column("text") description: string;

  @Column("text") pictureUrl: string;

  @Column("text") videoUrlExcercise: string;

  @Column("text") howToExcercise: string[];

  @Column("text") howToBreath: string;

  @Column("text") pictureUrlBody: string;

  @Column("text") listInvolvedMuscles: string[];
}
