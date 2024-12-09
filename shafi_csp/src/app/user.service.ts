import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public currentUser: Observable<string | null> = this.currentUserSubject.asObservable();

  [x: string]: any;
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  getRegistrations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/register`);
  }
  deleteRegistration(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/register/${email}`);
  }

  updateRegistration(username: string, user: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/register/${username}`, user);
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }
  setCurrentUser(username: string) {
    this.currentUserSubject.next(username);
  }

  getCurrentUser(): Observable<string | null> {
    return this.currentUser;
  }

  private googleAuthUrl = '/api/auth/google';

 
  authenticateWithGoogle(idToken: string): Observable<any> {
    console.log('Authenticating with Google:', idToken);
    return this.http.post(this.googleAuthUrl, { idToken });
  }

}
