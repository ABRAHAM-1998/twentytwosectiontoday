import { Component, OnInit, Input } from '@angular/core';
import { ApiserviceService } from 'src/app/SHARED/apiservice.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';



@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  @Input() fromParent;

  constructor(private api: ApiserviceService) { }
  isHidden: boolean = true;
  isHiddenb: boolean = false;
  public loading = false;


  ngOnInit(): void {
    this.fnshowpost();
  }
  public imagecrop = false;
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
  public parameter = []
  uploadFiles() {
    this.imagecrop = false;
    let data = {
      img: this.croppedImage,
      id: localStorage.getItem('id')
    }

    this.api.methPOst('upload', data).subscribe((body) => {
      console.log(body)
      if (body) {
        this.fnshowpost()

      } else {
        console.log('err on recivibresponse')
      }

    });

  }




  public userpost: any = [];
  public userdata: any = [];
  fnshowpost() {
    this.api.methPOst('userpost', { 'id': this.fromParent || localStorage.getItem('id') }).subscribe((res) => {
      console.log(res)
      if (res['data']) {
        this.loading = true;

      }
      this.userpost = res['data']['post'];
      this.userdata = res['data']['usrdata'];
      this.userdata.forEach(element => {
        if (element._id === localStorage.getItem('id')) {
          this.isHidden = false;
          this.isHiddenb = true;
        } else {
          console.log('not user ')
        }


      });


    })

  }
  fn_delete(deleteid) {
    this.loading = false;

    this.api.methPOst('postdelete', { key: deleteid._id }).subscribe((res) => {
      if (res['apistatus'] = true) {
        this.fnshowpost();
      } else {
        console.log('DELETION POST FAILED')
      }
    })
  }

}
