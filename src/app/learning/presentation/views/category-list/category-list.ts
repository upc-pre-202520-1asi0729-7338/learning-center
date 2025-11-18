import {Component, computed, inject, ViewChild} from '@angular/core';
import {LearningStore} from '../../../application/learning.store';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {TranslatePipe} from '@ngx-translate/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatError} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-category-list',
  imports: [
    TranslatePipe,
    MatProgressSpinner,
    MatSort,
    MatError,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatButton
  ],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
/**
 * Component for displaying and managing a list of categories.
 */
export class CategoryList {
  readonly store = inject(LearningStore);
  protected router = inject(Router);

  /**
   * Columns to display in the table.
   */
  displayedColumns: string[] = ['id', 'name', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Data source for the table, computed from the store's categories.
   */
  dataSource = computed(() => {
    const source = new MatTableDataSource(this.store.categories());
    source.sort = this.sort;
    source.paginator = this.paginator;
    return source;
  });

  /**
   * Navigates to the edit page for the specified category.
   * @param id - The ID of the category to edit.
   */
  editCategory(id: number) {
    this.router.navigate(['learning/categories', id, 'edit']).then();
  }

  /**
   * Deletes the specified category.
   * @param id - The ID of the category to delete.
   */
  deleteCategory(id: number) {
    this.store.deleteCategory(id);
  }

  /**
   * Navigates to the new category creation page.
   */
  navigateToNew() {
    this.router.navigate(['learning/categories/new']).then();
  }

  /**
   * Lifecycle hook that runs after the view has been checked.
   * Ensures the data source's paginator and sort are set.
   */
  ngAfterViewChecked() {
    if (this.dataSource().paginator !== this.paginator) {
      this.dataSource().paginator = this.paginator;
    }
    if (this.dataSource().sort !== this.sort) {
      this.dataSource().sort = this.sort;
    }
  }
}
