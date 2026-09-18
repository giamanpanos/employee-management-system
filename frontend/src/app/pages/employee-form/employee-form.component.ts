import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly employeeService = inject(EmployeeService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  employeeId: number | null = null;
  isEditMode = false;
  errorMessage = '';

  employeeForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    position: [''],
    salary: [null as number | null, [Validators.min(0)]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeId = Number(id);
      this.isEditMode = true;
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          name: employee.name,
          email: employee.email,
          position: employee.position ?? '',
          salary: employee.salary ?? null,
        });
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Employee could not be loaded.';
      },
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';

    const employee: Employee = {
      name: this.employeeForm.value.name!,
      email: this.employeeForm.value.email!,
      position: this.employeeForm.value.position || '',
      salary: this.employeeForm.value.salary ?? null,
    };

    if (this.isEditMode && this.employeeId !== null) {
      this.employeeService.updateEmployee(this.employeeId, employee).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.handleError(error);
        },
      });
    } else {
      this.employeeService.createEmployee(employee).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.handleError(error);
        },
      });
    }
  }

  private handleError(error: any): void {
    this.errorMessage =
      error?.error?.message || 'Something went wrong. Please try again.';
  }
}
