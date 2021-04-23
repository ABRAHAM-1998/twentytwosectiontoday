import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from ".././SHARED/apiservice.service";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserprofileComponent } from '../COMPfOLDER/PROFILE-C/userprofile/userprofile.component';


@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.scss']
})
export class NavbarMainComponent implements OnInit {

  constructor(private api: ApiserviceService,private sanitizer:DomSanitizer,private route:Router,private modalService:NgbModal) { }


  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.pdata['imgurl']);
}

  ngOnInit(): void {
    this.fn_UserProfile();
  }
  public pdata =[]
  fn_UserProfile() {
    let data ={ id: localStorage.getItem('id') }

    this.api.methPOst('userp',data).subscribe((res) => {
      this.pdata = res['arrList']
    }, (error) => {
      // console.log(error, 'this is my error')
    })
  }
  fn_View(id) {
    const modalRef = this.modalService.open(UserprofileComponent, { size: 'lg', centered: true });
    let data =id
    modalRef.componentInstance.fromParent = data;

  }
  fn_logout(){
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
