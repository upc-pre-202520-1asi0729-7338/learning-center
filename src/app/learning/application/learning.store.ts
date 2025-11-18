import {computed, Injectable, Signal, signal} from '@angular/core';
import {Category} from '../domain/model/category.entity';
import {Course} from '../domain/model/course.entity';
import {LearningApi} from '../infrastructure/learning-api';
import {retry} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

/**
 * Learning store.
 *
 * Learning store,responsible for managing the state of the learning context.
 * It provides signals for categories, courses, loading state, and error messages.
 * It also provides methods for adding, updating, and deleting categories and courses,
 * as well as loading categories and courses from the API.
 *
 * @example
 * const categories = learningStore.categories;
 * const courses = learningStore.courses;
 * const loading = learningStore.loading;
 * const error = learningStore.error;
 *
 * learningStore.addCategory(category);
 * learningStore.updateCategory(category);
 * learningStore.deleteCategory(id);
 * learningStore.addCourse(course);
 * learningStore.updateCourse(course);
 *
 */
@Injectable({providedIn: 'root'})
export class LearningStore {
  // Signals
  private readonly _categoriesSignal = signal<Category[]>([]);
  private readonly _coursesSignal = signal<Course[]>([]);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);
  // Properties
  readonly categories = this._categoriesSignal.asReadonly();
  readonly courses = this._coursesSignal.asReadonly();
  readonly loading = this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();
  readonly categoriesCount = computed(() => this.categories().length);
  readonly coursesCount = computed(() => this.courses().length);

  constructor(private learningApi: LearningApi) {
    this.loadCategories();
    this.loadCourses();
  }

  /**
   * Retrieves a category by its ID.
   * @param id - The ID of the category, can be null or undefined.
   * @returns A signal containing the category or undefined.
   */
  getCategoryById(id: number | null | undefined): Signal<Category | undefined> {
    return computed(() => id ? this.categories().find(category => category.id === id) : undefined);
  }

  /**
   * Retrieves a course by its ID.
   * @param id - The ID of the course.
   * @returns A signal containing the course or undefined.
   */
  getCourseById(id: number): Signal<Course | undefined> {
    return computed(() => id ? this.courses().find(c => c.id === id) : undefined);
  }

  /**
   * Adds a new category.
   * @param category - The category to add.
   */
  addCategory(category: Category): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.learningApi.createCategory(category).pipe(retry(2)).subscribe({
      next: createdCategory => {
        this._categoriesSignal.update(categories => [...categories, createdCategory]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create category'));
        this._loadingSignal.set(false);
      }
    })
  }

  /**
   * Updates an existing category.
   * @param category - The category to update.
   */
  updateCategory(category: Category): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.learningApi.updateCategory(category).pipe(retry(2)).subscribe({
      next: updatedCategory => {
        this._categoriesSignal.update(categories =>
          categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to update category'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Deletes a category by its ID.
   * @param id - The ID of the category to delete.
   */
  deleteCategory(id: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.learningApi.deleteCategory(id).pipe(retry(2)).subscribe({
      next: () => {
        this._categoriesSignal.update(categories => categories.filter(category => category.id !== id));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to delete category'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Adds a new course.
   * @param course - The course to add.
   */
  addCourse(course: Course): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.learningApi.createCourse(course).pipe(retry(2)).subscribe({
      next: createdCourse => {
        this._coursesSignal.update(courses => [...courses, createdCourse]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create course'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Updates an existing course.
   * @param course - The course to update.
   */
  updateCourse(course: Course): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.learningApi.updateCourse(course).pipe(retry(2)).subscribe({
      next: updatedCourse => {
        this._coursesSignal.update(courses =>
          courses.map(cat => cat.id === updatedCourse.id ? updatedCourse : cat));
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to update course'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Deletes a course by its ID.
   * @param id - The ID of the course to delete.
   */
  deleteCourse(id: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.learningApi.deleteCategory(id).pipe(retry(2)).subscribe({
      next: () => {
        this._coursesSignal.update(courses => courses.filter(course => course.id !== id));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to delete course'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads categories from the API.
   */
  loadCategories(): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.learningApi.getCategories().pipe(takeUntilDestroyed()).subscribe({
      next: categories => {
        this._categoriesSignal.set(categories);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load categories'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads courses from the API.
   */
  loadCourses(): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.learningApi.getCourses().pipe(takeUntilDestroyed()).subscribe({
      next: courses => {
        this._coursesSignal.set(courses);
        this._loadingSignal.set(false);
        this.assignCategoriesToCourses();
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load courses'));
        this._loadingSignal.set(false);
      }
    });
  }

  private assignCategoriesToCourses(): void {
    this._coursesSignal.update(courses => courses.map(course => this.assignCategoryToCourse(course)));
  }

  private assignCategoryToCourse(course: Course): Course {
    const categoryId = course.categoryId ?? 0;
    course.category = categoryId ? this.getCategoryById(categoryId)() ?? null : null;
    return course;
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not Found` : error.message;
    }
    return fallback;
  }

}
