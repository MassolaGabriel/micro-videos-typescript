import Entity from "../entity/entity";

export interface RepositoryInterface<E extends Entity>{
  insert(entity): Promise<void>
  findById(id): Promise<E>
  findAll(): Promise<E[]>
  update(entity): Promise<void>
  delete(id): Promise<void>
}
