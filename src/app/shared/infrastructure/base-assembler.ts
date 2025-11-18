import {BaseEntity} from '../domain/model/base-entity';
import {BaseResource, BaseResponse} from './base-response';

/**
 * Base assembler interface.
 * @template TEntity  - Base entity interface.
 * @template TResource - Base resource interface.
 * @template TResponse - Base response interface.
 */
export interface BaseAssembler<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse> {
  /**
   * Converts a resource to an entity.
   * @param resource - The resource to convert.
   * @returns The converted entity.
   */
  toEntityFromResource(resource: TResource): TEntity;

  /**
   * Converts an entity to a resource.
   * @param entity - The entity to convert.
   * @returns The converted resource.
   */
  toResourceFromEntity(entity: TEntity): TResource;

  /**
   * Converts a response to an array of entities.
   * @param response - The response to convert.
   * @returns The array of entities.
   */
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
