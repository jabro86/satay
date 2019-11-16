import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("excerciseInfos")
export class ExcerciseInfo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) name: string;

  @Column("text") title: string;

  @Column("text") description: string;

  @Column("text") pictureUrl: string;

  @Column("text") executionVideoUrl: string;

  @Column("text") executionSteps: string[];

  @Column("text") breath: string;

  @Column("text") musclesPictureUrl: string;

  @Column("text") involvedMuscles: string[];
}
