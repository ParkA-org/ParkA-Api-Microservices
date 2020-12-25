import { IDeleteEntityInput } from '../interfaces/delete-entity-input';

export class DeleteEntityInput implements IDeleteEntityInput {
  id: string;
  ownerId: string;
}
