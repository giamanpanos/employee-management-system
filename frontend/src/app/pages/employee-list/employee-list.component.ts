import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = false;
  errorMessage = '';

  displayedColumns = ['id', 'name', 'email', 'position', 'salary', 'actions'];

  private readonly employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.errorMessage = '';

    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load employees:', error);
        this.loading = false;
        this.errorMessage =
          error?.error?.message ||
          'Unable to load employees. Please try again.';
      },
    });
  }

  deleteEmployee(id: number): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this employee?',
    );

    if (!confirmed) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees();
      },
      error: (error) => {
        console.error('Failed to delete employee:', error);
      },
    });
  }
}
