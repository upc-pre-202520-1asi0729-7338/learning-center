import {Category} from './category.entity';

/**
 * Represents a course entity in the learning domain.
 */
export class Course {
  private _id: number;
  private _title: string;
  private _description: string;
  private _categoryId: number;
  private _category: Category | null;

  /**
   * Creates a new Course instance.
   * @param course - The course data object containing id, title, description, categoryId, and optional category.
   */
  constructor(course:{ id: number, title: string, description: string, categoryId: number, category?: Category}) {
    this._id = course.id;
    this._title = course.title;
    this._description = course.description;
    this._categoryId = course.categoryId;
    this._category = course.category ?? null;
  }

  /**
   * Gets the course's unique identifier.
   * @returns The course ID.
   */
  get id(): number {
    return this._id;
  }

  /**
   * Sets the course's unique identifier.
   * @param value - The new ID value.
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Gets the course title.
   * @returns The course title.
   */
  get title(): string {
    return this._title;
  }

  /**
   * Sets the course title.
   * @param value - The new title value.
   */
  set title(value: string) {
    this._title = value;
  }

  /**
   * Gets the course description.
   * @returns The course description.
   */
  get description(): string {
    return this._description;
  }

  /**
   * Sets the course description.
   * @param value - The new description value.
   */
  set description(value: string) {
    this._description = value;
  }

  /**
   * Gets the category ID associated with the course.
   * @returns The category ID.
   */
  get categoryId(): number {
    return this._categoryId;
  }

  /**
   * Sets the category ID associated with the course.
   * @param value - The new category ID value.
   */
  set categoryId(value: number) {
    this._categoryId = value;
  }

  /**
   * Gets the category associated with the course.
   * @returns The category or null if not set.
   */
  get category(): Category | null {
    return this._category;
  }

  /**
   * Sets the category associated with the course.
   * @param value - The new category value or null.
   */
  set category(value: Category | null) {
    this._category = value;
  }
}
