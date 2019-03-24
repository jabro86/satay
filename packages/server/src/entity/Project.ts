import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";

import { User } from "./User";
import { Resource } from "./Resource";

@Entity("projects")
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255, nullable: true })
  tag: string;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, user => user.projects)
  user: User;

  @OneToMany(() => Resource, resource => resource.project)
  resources: Resource[];

  @Column("text")
  title: string;

  @Column("text")
  description: string;

  @Column("varchar", { length: 30 })
  serviceName: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;

  @Column("simple-json", { nullable: true }) apiCalls: {
    used: {
      submissionRequests: number;
      formRequests: number;
      emails: number;
      forms: number;
    };
    limit: {
      submissionRequests: number;
      formRequests: number;
      emails: number;
      forms: number;
    };
    reset: Date;
  };
}
