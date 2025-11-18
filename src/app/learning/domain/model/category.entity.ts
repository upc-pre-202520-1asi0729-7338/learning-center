/**
 * Represents a category entity in the learning domain.
 */
export class Category {
  private _id: number;
  private _name: string;

  /**
   * Creates a new Category instance.
   * @param category - The category data object containing id and name.
   */
  constructor(category:{ id: number, name: string}) {
    this._id = category.id;
    this._name = category.name;
  }

  /**
   * Gets the category's unique identifier.
   * @returns The category ID.
   */
  get id(): number {
    return this._id;
  }

  /**
   * Sets the category's unique identifier.
   * @param value - The new ID value.
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Gets the category name.
   * @returns The category name.
   */
  get name(): string {
    return this._name;
  }

  /**
   * Sets the category name.
   * @param value - The new name value.
   */
  set name(value: string) {
    this._name = value;
  }
}
