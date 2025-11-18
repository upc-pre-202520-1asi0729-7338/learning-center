import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Category} from '../domain/model/category.entity';
import {CategoriesResponse, CategoryResource} from './categories-response';
import {CategoryAssembler} from './category-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const categoriesEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderCategoriesEndpointPath}`;

/**
 * API endpoint for handling category-related operations.
 */
export class CategoriesApiEndpoint extends BaseApiEndpoint<Category, CategoryResource, CategoriesResponse, CategoryAssembler> {
  /**
   * Creates a new CategoriesApiEndpoint instance.
   * @param http - The HTTP client for making requests.
   */
  constructor(http: HttpClient) {
    super(http, categoriesEndpointUrl, new CategoryAssembler());
  }
}
