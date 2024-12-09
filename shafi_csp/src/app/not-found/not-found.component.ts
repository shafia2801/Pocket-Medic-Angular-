import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent  implements OnInit {
  showTable: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.showTable = true;
    }, 10); // Short delay to ensure the initial state is applied
  }
}


