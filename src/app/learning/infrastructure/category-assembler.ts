import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {CategoriesResponse, CategoryResource} from './categories-response';
import {Category} from '../domain/model/category.entity';

/**
 * Assembler for converting between Category entities and API resources/responses.
 */
export class CategoryAssembler implements BaseAssembler<Category, CategoryResource, CategoriesResponse>{
  /**
   * Converts a category response to an array of Category entities.
   * @param response - The API response.
   * @returns An array of Category entities.
   */
  toEntitiesFromResponse(response: CategoriesResponse): Category[] {
    return response.categories.map(category => this.toEntityFromResource(category));
  }

  /**
   * Converts a category resource to a Category entity.
   * @param resource - The API resource.
   * @returns The Category entity.
   */
  toEntityFromResource(resource: CategoryResource): Category {
    return new Category({id: resource.id, name: resource.name});
  }

  /**
   * Converts a Category entity to a category resource.
   * @param entity - The Category entity.
   * @returns The category resource.
   */
  toResourceFromEntity(entity: Category): CategoryResource {
    return {
      id: entity.id,
      name: entity.name
    } as CategoryResource;
  }
}
