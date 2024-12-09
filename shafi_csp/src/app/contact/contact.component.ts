import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  responseMessage: string | null = null;

  constructor(private http: HttpClient) {}

  onSubmit(contactForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const formData = {
      access_key: '2a6b5bc6-5a45-433c-a84e-f950248eeef4',
      name: contactForm.value.name,
      email: contactForm.value.email,
      message: contactForm.value.message
    };

    this.http.post('https://api.web3forms.com/submit', formData, { headers })
      .subscribe(
        (response: any) => {
          console.log('Success:', response);
          this.responseMessage = 'Thank you for your message! We will get back to you soon.';
          contactForm.reset();
          this.triggerAnimations();  // Trigger animations
        },
        (error: any) => {
          console.error('Error:', error);
          this.responseMessage = error?.error?.message || 'Something went wrong. Please try again later.';
          this.triggerAnimations();  // Still trigger animations so that the user knows something happened
        }
      );
  }

  triggerAnimations() {
    document.body.classList.add("sent");
    setTimeout(() => {
      this.responseMessage = null;  // Clear the message after a delay
      document.body.classList.remove("sent");  // Reset the animation class after the animation is done
    }, 1000);  // Adjust this timing based on your animation duration
  }
}