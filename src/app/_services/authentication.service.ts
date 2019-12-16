import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService)  {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })

        return this.http.post<any>(`${environment.apiUrl}/authenticate`, { username: username, password: password }, { 'headers': new HttpHeaders({ 'Content-Type': 'application/json' }), observe: 'response' } )
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log(user)
                if (user && user.headers.get('authorization')) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    console.log(user.headers.get('authorization').split(" ")[1])
                    console.log(this.jwtHelper.decodeToken(user.headers.get('authorization').split(" ")[1]))
                    localStorage.setItem('currentUser', JSON.stringify({'token': user.headers.get('authorization').split(" ")[1]}));
                    localStorage.setItem('access_token', user.headers.get('authorization').split(" ")[1]);
                    localStorage.setItem('userName', this.jwtHelper.decodeToken(user.headers.get('authorization').split(" ")[1]).sub);
                    this.currentUserSubject.next({'token': user.headers.get('authorization').split(" ")[1]});
                }

                return user;
            }));

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.clear()
        this.currentUserSubject.next(null);

        this.router.navigateByUrl('/');

    }

    verifyUserName(username){
        return this.http.get(`${environment.apiUrl}/users/check/${username}`)
    }

    getUserId(username){
        return this.http.get(`${environment.apiUrl}/users/name/${username}`)
    }

    getPatientByUserId(userId){
        let relation = "Self";
        return this.http.get(`${environment.apiUrl}/patients/u/${parseInt(userId)}/${relation}`)
    }
}