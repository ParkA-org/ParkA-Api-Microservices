import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from "typeorm";
import { IBaseEntity } from "../interfaces/base-entity.interface";
import { IFeature } from "../interfaces/feature-entity.interface";

@Entity()
@Unique(['name'])
export class Feature implements IFeature, IBaseEntity{

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    updatedAt: string;

    @Column()
    createdAt: string;

    @Column()
    name: string;
}