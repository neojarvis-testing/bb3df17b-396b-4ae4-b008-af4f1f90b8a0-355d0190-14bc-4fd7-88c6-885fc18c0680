import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    const routePath = route.url[0]?.path;

    if((routePath === 'ADMIN' && !this.authService.isAdmin()) || (routePath === 'USER' && !this.authService.isUser())){
      alert('You are not authorized to view this page');
      this.router.navigate(['/error']);
      return false;
    }
    return true;
  }
}
