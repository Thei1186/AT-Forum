import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {AuthState} from '../../auth/shared/auth.state';
import {Role} from '../../users/shared/role';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  @Select(AuthState.role) role$: Observable<Role>;

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.role$.pipe(
      map(role => {
        if (role) {
          return role.roleName === 'admin' || role.roleName === 'superAdmin';
        } else {
          this.router.navigateByUrl('login');
          return false;
        }
      })
    );
  }

}
