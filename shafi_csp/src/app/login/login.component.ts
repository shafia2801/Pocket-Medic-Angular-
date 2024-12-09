import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Import UserService
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  messageClass: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.message = 'Both email and password are required.';
      this.messageClass = 'error';
      return;
    }

    this.userService.login(this.email, this.password).subscribe(
      response => {
        // Handle successful login
        this.message = 'Login successful!';
        this.messageClass = 'success';

      
 // Store the username
 this.userService.setCurrentUser(response.username);

        // Save user token or any other needed information
        localStorage.setItem('userToken', response.token); // Example

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/home']); // Adjust the path as needed
        }, 2000);
      },
      error => {
        // Handle login error
        this.message = 'Login failed. Please try again.';
        this.messageClass = 'error';
      }
    );
  }
}