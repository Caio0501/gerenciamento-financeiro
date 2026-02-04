import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Usuario,
} from '../models/auth.models';
import { environment } from '../../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl + '/auth';
  private tokenKey = 'auth_token';
  private userKey = 'current_user';
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // Initialize user from local storage
    const userJson = localStorage.getItem(this.userKey);
    if (userJson) {
      this.currentUserSubject.next(JSON.parse(userJson));
    }
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, data)
      .pipe(tap((response) => this.setSession(response)));
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, data)
      .pipe(tap((response) => this.setSession(response)));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getCurrentUser(): Usuario | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem(this.tokenKey, authResponse.token);

    const usuario: Usuario = {
      id: authResponse.id,
      nome: authResponse.nome,
      email: authResponse.email,
    };

    localStorage.setItem(this.userKey, JSON.stringify(usuario));
    this.currentUserSubject.next(usuario);
  }
}
