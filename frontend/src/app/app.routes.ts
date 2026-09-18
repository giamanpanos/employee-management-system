import { Routes } from '@angular/router';

import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
  },
  {
    path: 'employees/new',
    component: EmployeeFormComponent,
  },
  {
    path: 'employees/:id/details',
    component: EmployeeDetailsComponent,
  },
  {
    path: 'employees/:id',
    component: EmployeeFormComponent,
  },
];
