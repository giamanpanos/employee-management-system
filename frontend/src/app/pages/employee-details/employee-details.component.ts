import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly employeeService = inject(EmployeeService);

  employee: Employee | null = null;
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loading = true;

    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        this.employee = employee;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.errorMessage =
          error?.error?.message || 'Employee could not be loaded.';
      },
    });
  }
}
