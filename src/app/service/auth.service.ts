import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/login';
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<void> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post<void>(this.apiUrl, body.toString(), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
  }

}
