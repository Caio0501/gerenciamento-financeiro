import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private selectedCompanySubject = new BehaviorSubject<Empresa | null>(null);
  selectedCompany$ = this.selectedCompanySubject.asObservable();

  constructor() {
    // Try to load from localStorage if needed, or leave null
    const stored = localStorage.getItem('selectedCompany');
    if (stored) {
      try {
        this.selectedCompanySubject.next(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored company', e);
      }
    }
  }

  setCompany(empresa: Empresa | null) {
    this.selectedCompanySubject.next(empresa);
    if (empresa) {
      localStorage.setItem('selectedCompany', JSON.stringify(empresa));
    } else {
      localStorage.removeItem('selectedCompany');
    }
  }

  getCurrentCompany(): Empresa | null {
    return this.selectedCompanySubject.value;
  }
}
