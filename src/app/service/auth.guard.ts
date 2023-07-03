import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {
  const auth = inject(AuthService);
  return auth.isLoggedIn();
};
