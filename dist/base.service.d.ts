import { DataSource, EntityTarget } from "typeorm";
import { BaseEntity } from "./base.entity";
export declare class BaseService<T extends BaseEntity> {
    private repository;
    constructor(entity: EntityTarget<T>, dataSource: DataSource);
    create(data: Partial<T>): Promise<T>;
    findOne(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    delete(id: number): Promise<void>;
}
