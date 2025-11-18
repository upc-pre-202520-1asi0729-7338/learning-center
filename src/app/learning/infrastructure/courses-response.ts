import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource interface for a course.
 */
export interface CourseResource extends BaseResource {
  /**
   * The unique identifier of the course.
   */
  id: number;

  /**
   * The title of the course.
   */
  title: string;

  /**
   * The description of the course.
   */
  description: string;

  /**
   * The ID of the category associated with the course.
   */
  categoryId: number;
}

/**
 * Response interface for courses API.
 */
export interface CoursesResponse extends BaseResponse {
  /**
   * Array for course's resources.
   */
  courses: CourseResource[];
}
