import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth: AuthService, private db: AngularFireDatabase, private userService: UserService) { }
  
  canActivate():Observable<boolean> {
    
    return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin))
  }
}
