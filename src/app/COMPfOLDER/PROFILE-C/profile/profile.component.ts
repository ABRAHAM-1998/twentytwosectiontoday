import { Component, OnInit ,Input} from '@angular/core';
import { ApiserviceService } from "../../../SHARED/apiservice.service";
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DataService } from "../../../SHARED/data.service";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() fromParent;
  constructor(private api: ApiserviceService, private sanitizer: DomSanitizer,private data :DataService) { }


  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.pdata['imgurl']);
  }

  ngOnInit(): void {
  }
  public imagecrop = false;
  public loading = true;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagecrop = true;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
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
  

  // public data = { pdata:this.fromParent}
  public pdata:any=[]

  fn_UserProfile() {
    this.loading = false;


    this.api.methPOst('/userp', { 'id': this.fromParent._id }).subscribe((res) => {
      this.pdata = res['arrList']
       this.loading = res['apistatus'];
    }, (error) => {
      // console.log(error, 'this is my error')
    })
  }
  //  ||||||||||||||||||||||||||||||||||| IMAGE UPLOD ||||||||||||||||||||||||||||||||||||||
  public parameter = []
  uploadFiles() {
    this.imagecrop = false;
     this.loading = false;
    let data = {
      img: this.croppedImage,
      id: localStorage.getItem('id')
    }

    this.api.methPOst('',data).subscribe((body) => {
      console.log(body)
      if (body) {
        this.fn_UserProfile();

      } else {
        console.log('err on recivibresponse')
      }

    });

  }
}