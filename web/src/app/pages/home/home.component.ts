import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../auth/auth.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  is_loggedIn = this.authService.is_loggedIn();
  
  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    $(".mobile-menu").slicknav({
      prependTo: '#mobile-menu-wrap',
      allowParentLinks: true
    });
  }
}
