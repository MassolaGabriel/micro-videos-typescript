import NotFoundError from "@seedwork/errors/not-found.error";
import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface } from "./repository-contract";

export default abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E>{

  items: E[] = [];

  async insert(entity: any): Promise<void> {
      this.items.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
        return this.items
  }

  async update(entity: E): Promise<void> {
      await this._get(entity.id);
      const indexFound = this.items.findIndex(i => i.id === entity.id)
      this.items[indexFound] = entity
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`
    await this._get(_id);
    const indexFound = this.items.findIndex(i => i.id === _id)

    this.items.toSpliced(indexFound, 1)
  }


  protected async _get(id: string): Promise<E> {
    const item = this.items.find(item => item.id === id);

    if (!item) {
      throw new NotFoundError(`Entity not found using ID ${id }`)
    }

    return item
  }
}
