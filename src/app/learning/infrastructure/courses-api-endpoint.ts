import {environment} from '../../../environments/environment';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Course} from '../domain/model/course.entity';
import {CourseResource, CoursesResponse} from './courses-response';
import {CourseAssembler} from './course-assembler';
import {HttpClient} from '@angular/common/http';

const coursesEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderCoursesEndpointPath}`;

/**
 * API endpoint for handling course-related operations.
 */
export class CoursesApiEndpoint extends BaseApiEndpoint<Course, CourseResource, CoursesResponse, CourseAssembler>{

  /**
   * Creates a new CoursesApiEndpoint instance.
   * @param http - The HTTP client for making requests.
   */
  constructor(http: HttpClient) {
    super(http, coursesEndpointUrl, new CourseAssembler());
  }
}
