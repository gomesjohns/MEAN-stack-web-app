import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  userStatus;
  userName;
  constructor()
  {
    this.userStatus= sessionStorage.getItem('userStatus');
    this.userName= sessionStorage.getItem('studentName');
  }

  ngOnInit() {
  }
}


