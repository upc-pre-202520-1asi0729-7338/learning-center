import {Injectable} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {CategoriesApiEndpoint} from './categories-api-endpoint';
import {CoursesApiEndpoint} from './courses-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../domain/model/category.entity';

/**
 * API service for learning-related operations, including categories and courses.
 */
@Injectable({providedIn: 'root'})
export class LearningApi extends BaseApi {
  private readonly _categoriesApiEndpoint: CategoriesApiEndpoint;
  private readonly _coursesApiEndpoint: CoursesApiEndpoint;

  /**
   * Creates a new LearningApi instance.
   * @param http - The HTTP client for making requests.
   */
  constructor(http: HttpClient) {
    super();
    this._categoriesApiEndpoint = new CategoriesApiEndpoint(http);
    this._coursesApiEndpoint = new CoursesApiEndpoint(http);
  }

  /**
   * Retrieves all categories.
   * @returns An observable of an array of categories.
   */
  getCategories(): Observable<Category[]> {
    return this._categoriesApiEndpoint.getAll();
  }

  /**
   * Retrieves a category by its ID.
   * @param id - The ID of the category.
   * @returns An observable of the category.
   */
  getCategory(id: number): Observable<Category> {
    return this._categoriesApiEndpoint.getById(id);
  }

  /**
   * Creates a new category.
   * @param category - The category to create.
   * @returns An observable of the created category.
   */
  createCategory(category: Category): Observable<Category> {
    return this._categoriesApiEndpoint.create(category);
  }

  /**
   * Updates an existing category.
   * @param category - The category to update.
   * @returns An observable of the updated category.
   */
  updateCategory(category: Category): Observable<Category> {
    return this._categoriesApiEndpoint.update(category, category.id);
  }

  /**
   * Deletes a category by its ID.
   * @param id - The ID of the category to delete.
   * @returns An observable that completes when the deletion is done.
   */
  deleteCategory(id: number): Observable<void> {
    return this._categoriesApiEndpoint.delete(id);
  }

  /**
   * Retrieves all courses.
   * @returns An observable of an array of courses.
   */
  getCourses(): Observable<any> {
    return this._coursesApiEndpoint.getAll();
  }

  /**
   * Retrieves a course by its ID.
   * @param id - The ID of the course.
   * @returns An observable of the course.
   */
  getCourse(id: number): Observable<any> {
    return this._coursesApiEndpoint.getById(id);
  }

  /**
   * Creates a new course.
   * @param course - The course to create.
   * @returns An observable of the created course.
   */
  createCourse(course: any): Observable<any> {
    return this._coursesApiEndpoint.create(course);
  }

  /**
   * Updates an existing course.
   * @param course - The course to update.
   * @returns An observable of the updated course.
   */
  updateCourse(course: any): Observable<any> {
    return this._coursesApiEndpoint.update(course, course.id);
  }

  /**
   * Deletes a course by its ID.
   * @param id - The ID of the course to delete.
   * @returns An observable that completes when the deletion is done.
   */
  deleteCourse(id: number): Observable<void> {
    return this._coursesApiEndpoint.delete(id);
  }
}
