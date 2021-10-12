import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {
  keyword: string;
  constructor() { }

  ngOnInit(): void {
    // Search model
    $('.search-switch').on('click', function () {
      $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
      $('.search-model').fadeOut(400, function () {
        $('#search-input').val('');
      });
    });
  }


  // Search
  search() {
    $("#search-input").on('keyup', function (e) {
      if (e.keyCode === 13) {
        console.log($("#search-input").val());
      }
    });
  }
}
