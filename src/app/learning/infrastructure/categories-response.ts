import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource interface for a category.
 */
export interface CategoryResource extends BaseResource {
  /**
   * The unique identifier of the category.
   */
  id: number;

  /**
   * The name of the category.
   */
  name: string;
}

/**
 * Response interface for categories API.
 */
export interface CategoriesResponse extends BaseResponse {
  /**
   * Array of category resources.
   */
  categories: CategoryResource[];
}
