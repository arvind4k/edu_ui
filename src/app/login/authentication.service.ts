import {Injectable} from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { User } from './user.model'
 
@Injectable()
export class AuthenticationService {
  
  private authUrl = 'http://localhost:9001/auth';
  private headers = new Headers({'Accepts':'text/plain ; application/json', 'Content-type':'Application/json; charset=utf-8', 'Access-Control-Allow-Origin':'*'});
 
  constructor(
    private http: Http,
    private router: Router
  ){}
 
  login(username: string, password: string): Observable<boolean> {
    return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
          .map((response: Response) => {
            console.log(JSON.stringify({username: username, password: password}));
            // login successful if there's a jwt token in the response
            let token = response.json() && response.json().token;
            if (response.status==200) {
              // store username and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
              // return true to indicate successful login
              return true;
            } else {
              // return false to indicate failed login
              return false;
            }
      });//.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
 
    getToken(): String {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      return token ? token : "";
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/home']);
    }

    isLoggedIn(): boolean {
      var token: String = this.getToken();
      return token && token.length > 0;
    }
}