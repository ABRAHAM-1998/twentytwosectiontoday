import { Injectable } from '@angular/core';
import {
  Routes,
  RouterModule,
  Router,
  ActivatedRoute,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthgurdService {
  constructor(private route: Router) { }
}
@Injectable()
class UserService {


  isLoggedIn(): boolean {
    if (localStorage.getItem('token') && localStorage.getItem('id')) {
      // alert('logged in  => =>[[[[[ [AUTH-GUARD MESSAGE ]]]]]]')
      return true 
    } else {
      alert('\n \n logged  out => => [[[[  AUTH-GUARD MESSAGE ]]]]] \n \n This popup is declared for security check \n please press Ok and Continue \n CONTACT SUPORT:::@ \n INSTAGRAM :::: annihilation_of_trinity_mind')
      return false
    }

  }

}

class AlwaysAuthGuard implements CanActivate {
  canActivate() {
    // console.log("AlwaysAuthGuard");
    return true;
  }
}

@Injectable()
class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private userService: UserService, private route: Router) { }

  canActivate() {
    // console.log("OnlyLoggedInUsers");
    if (this.userService.isLoggedIn()) {

      return true

    } else {
      window.alert("\n \nTWENTYTWO'S SECURITY CHECK : SECURED! \n \n This popup is declared for security check \n please press Ok and Continue \n CONTACT SUPORT:::@ \n INSTAGRAM :::: annihilation_of_trinity_mind");
      

      return this.route.parseUrl("login");
    }
  }
}
@Injectable()
class AlwaysAuthChildrenGuard implements CanActivateChild {
  constructor(private userService: OnlyLoggedInUsersGuard, private route: Router) { }

  canActivateChild() {
    if (this.userService.canActivate() == true) {
      // console.log(true,'dfhjjf autgh')

      return true

    } else {
      window.alert("You don't have permission to view this page");
      

      return this.route.parseUrl("login");
    }

  }
}

export {
  UserService, AlwaysAuthGuard, AlwaysAuthChildrenGuard, OnlyLoggedInUsersGuard

}