import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { BusinessesComponent } from './businesses/businesses.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  { path: 'register', component: RegisterComponent },
  { path: 'businesses', component: BusinessesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent, pathMatch: 'full' }, // Default route for home
  { path: 'Home', component: NotFoundComponent } // Wildcard route for 404 Not Found
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
