import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.css']
})
export class BlogDialogComponent {

  isUpdate: boolean = false;
  imageUrl: string = "";
  title: string = "";
  body: string = "";
  commentData: any;

  constructor(private commentService: CommentService, @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<BlogDialogComponent>) {
    if(data.isUpdate) {
      this.isUpdate = true;
    } else {
      this.imageUrl = data.blog.imageId.toString();
      this.title = data.blog.title;
      this.body = data.blog.body;
    }
  }

  ngOnInit(): void {
    this.commentService.getComments().subscribe((res)=> {
      this.commentData = res.filter((x: {postId:any;}) => x.postId == this.data.blog.id);
    })
  }

  close() {
    this.dialogRef.close();
  }
}
