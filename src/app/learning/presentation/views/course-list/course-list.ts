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
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-course-list',
  imports: [
    TranslatePipe,
    MatProgressSpinner,
    MatError,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatIcon,
    MatPaginator,
    MatButton
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
/**
 * Component for displaying and managing a list of courses.
 */
export class CourseList {
  readonly store = inject(LearningStore);
  protected router = inject(Router);

  /**
   * Columns to display in the table.
   */
  displayedColumns: string[] = ['id', 'title', 'description', 'category', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Data source for the table, computed from the store's courses.
   */
  dataSource = computed(() => {
    const source = new MatTableDataSource(this.store.courses());
    source.sort = this.sort;
    source.paginator = this.paginator;
    return source;
  });

  /**
   * Navigates to the edit page for the specified course.
   * @param id - The ID of the course to edit.
   */
  editCourse(id: number) {
    this.router.navigate(['learning/courses', id, 'edit']).then();
  }

  /**
   * Deletes the specified course.
   * @param id - The ID of the course to delete.
   */
  deleteCourse(id: number) {
    this.store.deleteCourse(id);
  }

  /**
   * Navigates to the new course creation page.
   */
  navigateToNew() {
    this.router.navigate(['learning/courses/new']).then();
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
