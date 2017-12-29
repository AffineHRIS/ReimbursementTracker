import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if ( parseInt(sessionStorage.getItem('userRole')) <= 2 ) {
            return true;
        }

        this.router.navigate(['/profile', sessionStorage.getItem('username')]);
        return false;
    }
}
