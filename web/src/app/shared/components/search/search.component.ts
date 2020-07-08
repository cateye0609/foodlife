import { Component, OnInit } from '@angular/core';

import { TagModel } from '../../../_models/blog.model';

import { BlogService } from '../../../blog/blog.service';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyword: string;
  tags: string[];
  tag: string;
  constructor(
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.get_tags();
  }

  // Lấy danh sách tag
  get_tags() {
    this.blogService.get_tags().subscribe(
      (res: TagModel) => {
        this.tags = res.tags;
        this.tag = this.tags[0];
      }
    )
  }
}
