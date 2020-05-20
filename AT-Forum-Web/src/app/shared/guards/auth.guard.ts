import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {AuthState} from '../../auth/shared/auth.state';
import {AuthUser} from '../../auth/shared/auth-user';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @Select(AuthState.loggedInUser) user$: Observable<AuthUser>;

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigateByUrl('login');
          return false;
        }
      })
    );
  }
}
