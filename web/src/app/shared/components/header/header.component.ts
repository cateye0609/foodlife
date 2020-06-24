import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../auth/auth.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  is_loggedIn = this.authService.is_loggedIn();

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    $('.mobile-menu').slicknav({
      prependTo: '#mobile-menu-wrap',
      allowParentLinks: true
    });
  }

}
