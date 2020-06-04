import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'foodlife';

  // Ẩn loading khi đổi route
  routeChange() {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");
  }

  // Đổi bg css
  setbg() {
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });
  }
  ngOnInit() {
    this.setbg();
  }
}
