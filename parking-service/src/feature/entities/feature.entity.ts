import { Column, Entity } from "typeorm";
import { IFeature } from "../interfaces/feature-entity.interface";

@Entity()
export class Feature implements IFeature{
    @Column()
    name: string;
}