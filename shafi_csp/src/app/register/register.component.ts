import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { UserService } from '../user.service';

declare const gapi: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 

  ngOnInit(): void {
    console.log('RegisterComponent ngOnInit');
    this.googleInit();
  }

  googleInit() {
    console.log('Google API init');
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '878402405336-8q0n2751t8nlocd5tm2mrh46vji98vga.apps.googleusercontent.com', // Replace this with your actual Client ID
      });
      console.log('Google Auth2 initialized');
    });
  }

  onSignIn(googleUser: any) {
    const id_token = googleUser.getAuthResponse().id_token;

    this.userService.authenticateWithGoogle(id_token).subscribe(response => {
      console.log('User authenticated', response);
    }, error => {
      console.error('Error authenticating user', error);
    });
  }
  
  username: string = '';
  email: string = '';
  password: string = '';
  message: string = '';
  messageClass: string = '';

  constructor(private http: HttpClient, private router: Router,private userService: UserService) {}

  register() {
    // Clear previous messages
    this.message = '';
    this.messageClass = '';

    // Validate form fields
    if (!this.username.trim()) {
      this.message = 'Username is required.';
      this.messageClass = 'error';
      return;
    }
    if (this.username.length < 5) {
      this.message = 'Username must be at least 5 characters long.';
      this.messageClass = 'error';
      return;
    }
    if (!this.email.trim()) {
      this.message = 'Email is required.';
      this.messageClass = 'error';
      return;
    }
    if (!this.validateEmail(this.email)) {
      this.message = 'Invalid email address.';
      this.messageClass = 'error';
      return;
    }
    if (!this.password.trim()) {
      this.message = 'Password is required.';
      this.messageClass = 'error';
      return;
    }
    if (this.password.length < 6) {
      this.message = 'Password must be at least 6 characters long.';
      this.messageClass = 'error';
      return;
    }

    // Send registration request
    this.http.post<any>('http://localhost:8080/user/register', {
      username: this.username,
      email: this.email,
      password: this.password
    }).pipe(
      tap(response => {
        // Log response for debugging
        console.log('Registration response:', response);

        // Check if the response indicates success
        if (response && response.message === 'User registered successfully') {
          this.message = 'Registration successful!';
          this.messageClass = 'success';

          // Clear input fields
          this.username = '';
          this.email = '';
          this.password = '';

          // Navigate to login page after 2 seconds
          setTimeout(() => {
            console.log('Navigating to login page...');
            this.router.navigate(['/login']).then(() => {
              console.log('Navigation successful');
            }).catch(err => {
              console.error('Navigation error:', err);
            });
          }, 2000);
        } else {
          // Handle unexpected successful response
          this.message = 'Unexpected response from server.';
          this.messageClass = 'error';
        }
      }),
      catchError(error => {
        // Handle error response
        if (error.status === 400 && error.error.message) {
          this.message = error.error.message;
        } else if (error.status === 500) {
          this.message = 'Server error. Please try again later.';
        } else {
          this.message = 'Registration succesfull!.';
        }
        this.messageClass = 'error';
        return of(null); // Return an observable to complete the stream
      })
    ).subscribe();
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  
}
 