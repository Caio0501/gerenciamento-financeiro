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

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'companies', component: CompanyListComponent },
  { path: 'company/:id', component: CompanyDetailComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'revenues', component: RevenuesComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'revenue-types', component: RevenueTypesComponent },
  { path: 'settings', component: AuxiliarySettingsComponent },
  { path: '**', redirectTo: '' }
];
