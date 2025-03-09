import { DataSource, EntityTarget, FindOneOptions, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";

export class BaseService<T extends BaseEntity> {
  private repository: Repository<T>;

  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    this.repository = dataSource.getRepository(entity);
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = this.repository.create(data as T);
    return await this.repository.save(entity);
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOne({ where: { id } } as FindOneOptions<T>);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  //   async update(id: number, data: Partial<T>): Promise<T | null> {
  //     const entity = await this.repository.findOneBy({
  //       where: { id },
  //     } as FindOneWhere<T>);
  //     if (!entity) {
  //       throw new Error("Entity not found");
  //     }

  //     Object.assign(entity, data);
  //     return await this.repository.save(entity);
  //   }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error("Entity not found");
    }
  }
}
