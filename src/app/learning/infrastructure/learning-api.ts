import {Injectable} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {CategoriesApiEndpoint} from './categories-api-endpoint';
import {CoursesApiEndpoint} from './courses-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../domain/model/category.entity';

@Injectable({providedIn: 'root'})
export class LearningApi extends BaseApi {
  private readonly _categoriesApiEndpoint: CategoriesApiEndpoint;
  private readonly _coursesApiEndpoint: CoursesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this._categoriesApiEndpoint = new CategoriesApiEndpoint(http);
    this._coursesApiEndpoint = new CoursesApiEndpoint(http);
  }

  getCategories(): Observable<Category[]> {
    return this._categoriesApiEndpoint.getAll();
  }

  getCategory(id: number): Observable<Category> {
    return this._categoriesApiEndpoint.getById(id);
  }

  createCategory(category: Category): Observable<Category> {
    return this._categoriesApiEndpoint.create(category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this._categoriesApiEndpoint.update(category, category.id);
  }

  deleteCategory(id: number): Observable<void> {
    return this._categoriesApiEndpoint.delete(id);
  }

  getCourses(): Observable<any> {
    return this._coursesApiEndpoint.getAll();
  }

  getCourse(id: number): Observable<any> {
    return this._coursesApiEndpoint.getById(id);
  }

  createCourse(course: any): Observable<any> {
    return this._coursesApiEndpoint.create(course);
  }

  updateCourse(course: any): Observable<any> {
    return this._coursesApiEndpoint.update(course, course.id);
  }

  deleteCourse(id: number): Observable<void> {
    return this._coursesApiEndpoint.delete(id);
  }
}
