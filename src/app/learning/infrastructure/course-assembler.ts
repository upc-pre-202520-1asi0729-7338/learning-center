import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Course} from '../domain/model/course.entity';
import {CourseResource, CoursesResponse} from './courses-response';

/**
 * Assembler for converting between Course entities and API resources/responses.
 */
export class CourseAssembler implements BaseAssembler<Course, CourseResource, CoursesResponse>{

  /**
   * Converts a course resource to a Course entity.
   * @param resource - The API resource.
   * @returns The Course entity.
   */
  toEntityFromResource(resource: CourseResource): Course {
    return new Course({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      categoryId: resource.categoryId});
  }

  /**
   * Converts a Course entity to a course resource.
   * @param entity - The Course entity.
   * @returns The course resource.
   */
  toResourceFromEntity(entity: Course): CourseResource {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      categoryId: entity.categoryId
    } as CourseResource;
  }

  /**
   * Converts a course response to an array of Course entities.
   * @param response - The API response.
   * @returns An array of Course entities.
   */
  toEntitiesFromResponse(response: CoursesResponse): Course[] {
    return response.courses.map(course => this.toEntityFromResource(course));
  }
}
