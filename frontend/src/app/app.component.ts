import { Component, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterOutlet,
  Router,
  RouterLinkActive,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { StateService } from './services/state.service';
import { AuthService } from './services/auth.service';
import { Empresa } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  companies: Empresa[] = [];
  selectedCompany: Empresa | null = null;

  constructor(
    private api: ApiService,
    private state: StateService,
    private router: Router,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    // Verificar autenticação ao iniciar o app
    this.checkAuthentication();

    this.loadCompanies();

    // Subscribe to selected company changes
    this.state.selectedCompany$.subscribe((c) => (this.selectedCompany = c));

    // Subscribe to company creation events
    this.state.companyCreated$.subscribe((newCompany) => {
      if (newCompany) {
        // Reload companies list when a new one is created
        this.loadCompanies(newCompany);
      }
    });
  }

  checkAuthentication() {
    const isAuthenticated = this.authService.isAuthenticated();
    const currentPath = this.router.url;
    const publicPaths = ['/login', '/register'];

    // Se não está autenticado e não está em rota pública, redirecionar para login
    if (!isAuthenticated && !publicPaths.includes(currentPath)) {
      this.router.navigate(['/login']);
    }

    // Se está autenticado e está tentando acessar login/register, redirecionar para dashboard
    if (isAuthenticated && publicPaths.includes(currentPath)) {
      this.router.navigate(['/']);
    }
  }

  loadCompanies(selectCompany?: Empresa) {
    this.api.getEmpresas().subscribe((data) => {
      this.companies = data;

      if (selectCompany) {
        // Select the newly created company
        const found = this.companies.find((c) => c.id === selectCompany.id);
        if (found) {
          this.selectedCompany = found;
          this.state.setCompany(found);
        }
      } else {
        // Auto-select first if none selected
        const current = this.state.getCurrentCompany();
        if (current) {
          // Validation: check if still exists
          const found = this.companies.find((c) => c.id === current.id);
          this.selectedCompany =
            found || (this.companies.length > 0 ? this.companies[0] : null);
        } else if (this.companies.length > 0) {
          this.selectedCompany = this.companies[0];
        }

        this.state.setCompany(this.selectedCompany);
      }
    });
  }

  onCompanyChange(empresa: Empresa) {
    this.state.setCompany(empresa);
    this.router.navigate(['/']); // Go to dashboard on change
  }

  navigateToCompanies() {
    this.router.navigate(['/companies']);
  }

  logout() {
    this.authService.logout();
  }
}
