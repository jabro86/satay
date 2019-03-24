import { Content } from "@faas/common";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Project } from "./Project";

@Entity("resource")
export class Resource extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @ManyToOne(() => Project, project => project.resources)
  project: Project;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("simple-json")
  content: Content;
}
