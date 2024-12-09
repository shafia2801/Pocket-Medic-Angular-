import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
})
export class HomeComponent  implements OnInit {
  username: string | null = null;
  registrations: any[] = [];
  dataFetched: boolean = false;
  selectedRegistration: any = null;
  updateForm: FormGroup;
  

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.updateForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit():void  {
    this.userService.getCurrentUser().subscribe(username => { 
      console.log('Current user:', username);
      this.username = username;
    });
  }

  fetchRegistrations() {
    this.userService.getRegistrations().subscribe(
      (data: any[]) => {
        this.registrations = data;
        this.dataFetched = true;
      },
      (error) => {
        console.error('Error fetching registrations:', error);
      }
    );
  }

  deleteRegistration(email: string) {
    if (confirm('Are you sure you want to delete this registration?')) {
      this.userService.deleteRegistration(email).subscribe(
        (response => {
          console.log('Registration deleted successfully');
          this.fetchRegistrations(); // Refresh the data after deletion
          alert('Registration deleted successfully');
        }),
        (error) => {
          console.error('Error deleting registration:', error);
        }
      );
    }
  }

  editRegistration(registration: any) {
    this.selectedRegistration = registration;
    this.updateForm.patchValue({
      username: registration.username,
      email: registration.email,
      password: registration.password
    });
  }

  updateRegistration() {
    if (this.updateForm.valid && this.selectedRegistration) {
      const updatedUser = this.updateForm.value;
      this.userService.updateRegistration(this.selectedRegistration.username, updatedUser).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.registrations = this.registrations.map(reg => 
            reg.username === this.selectedRegistration.username ? updatedUser : reg
          );
          this.selectedRegistration = null; // Clear selection
          this.updateForm.reset();
          alert('User updated successfully');
        },
        (error) => {
          console.error('Error updating registration:', error);
          alert('Error updating registration');
        }
      );
    }
  }



  // Method for navigation to registration component
  navigateToRegistration(): void {
    this.router.navigate(['/register']);
  }
}