import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(
        private router: Router,
        private http: HttpClient
        ) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.http.get('api/auth/logged').toPromise().then(response => {
            const data = response as { result: number };
            if (data.result === 1) {
                return true;
            } else {
                this.router.navigate(['/login']);
                alert('You are not logged in');
                return false;
            }
        });
    }
}