import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { Observable, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
      private afAuth: AngularFireAuth,
      private route: ActivatedRoute,
      private db: AngularFireDatabase,
      private userService: UserService
      ) {
    this.user$ = afAuth.authState;
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; 
    localStorage.setItem('returnUrl', returnUrl); // Stock l'url en attente chez le client.

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider)
    .then()
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges();
        return of(null);
      } )
      );
  }

  get userId$(){
    return this.user$.pipe(switchMap(user => {
      if (user) return user.uid;
      return of(null);
    }));
  }


}
