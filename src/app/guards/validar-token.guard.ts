import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return localStorage.getItem('user') !== null;
  }

  canLoad(): Observable<boolean> | boolean {
    if (localStorage.getItem('user') === null) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }
}
