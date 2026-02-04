import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { AuxiliarySettingsComponent } from './components/auxiliary-settings/auxiliary-settings.component';

import { CompanyListComponent } from './components/company-list/company-list.component';

import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RevenueTypesComponent } from './components/revenue-types/revenue-types.component';

import { ExpensesComponent } from './components/expenses/expenses.component';
import { RevenuesComponent } from './components/revenues/revenues.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  {
    path: 'companies',
    component: CompanyListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'company/:id',
    component: CompanyDetailComponent,
    canActivate: [authGuard],
  },
  { path: 'expenses', component: ExpensesComponent, canActivate: [authGuard] },
  { path: 'revenues', component: RevenuesComponent, canActivate: [authGuard] },
  {
    path: 'payment-methods',
    component: PaymentMethodsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'revenue-types',
    component: RevenueTypesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    component: AuxiliarySettingsComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
