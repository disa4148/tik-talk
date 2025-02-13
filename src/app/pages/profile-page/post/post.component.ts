import { Component } from '@angular/core';
import { CreatePostComponent } from "../create-post/create-post.component";
import { PostFeedComponent } from "../post-feed/post-feed.component";

@Component({
  selector: 'app-post',
  imports: [CreatePostComponent, PostFeedComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

}
