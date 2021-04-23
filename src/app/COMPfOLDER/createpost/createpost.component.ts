import { Component, AfterContentInit, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiserviceService } from '../../SHARED/apiservice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {

  constructor(private api: ApiserviceService,
    private route: Router
  ) { }

  breakpoint: number;


  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }

  public hidden = false;
  public loading = true;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  todayDate: Date = new Date();


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.hidden = true;

  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.post.image = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  public post: any = {
    location: '',
    Description: '',
    image: '',
    date: this.todayDate,
    id: localStorage.getItem('id')
  }
  fnPst() {
    this.loading = false;
    this.api.methPOst('newpost', this.post).subscribe((res) => {
      console.log(res)
      if (res['apistatus'] == true) {
        this.loading = true;

        this.route.navigate(['mainui'])
      }
    })

  }

}
