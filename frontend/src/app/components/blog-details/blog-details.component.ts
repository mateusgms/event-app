import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { posts } from '../../posts';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  post;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.post = posts[+params.get('postId')];
    });
  }

}
