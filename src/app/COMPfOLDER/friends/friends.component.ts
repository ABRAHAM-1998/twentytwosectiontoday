import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../SHARED/apiservice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from '../PROFILE-C/profile/profile.component';
import { UserprofileComponent } from '../PROFILE-C/userprofile/userprofile.component';
import { Router } from '@angular/router';
import { PRIVATECHATComponent } from '../CHATFOLDER/privatechat/privatechat.component';
import { DataService } from 'src/app/SHARED/data.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  constructor(private api: ApiserviceService, private modalService: NgbModal, private route: Router,
    private instantChatservice: DataService,) { }

  ngOnInit(): void {
    this.fn_list();
    this.requestList()
    this.requestinList();
  }
  public loading = false;
  public options: string[];
  public friends: any = {
    search: '',
    'id': localStorage.getItem('id')
  }
  public friendlist: any = [];
  public reqested: any = [];
  public myfriends: any = []


  fnSearch() {

    this.api.methPOst('frndSearch', this.friends).subscribe((res) => {
      // console.log(res)
      this.options = res['data']
    })
  }

  valuechangeMaterial(e) {
    this.friends.search = e;
    // console.log(this.friends);
  }

  fn_View(id) {
    const modalRef = this.modalService.open(UserprofileComponent, { size: 'lg', centered: true });
    let data = id._id
    modalRef.componentInstance.fromParent = data;

  }
  fn_list() {
    let data = { id: localStorage.getItem('id') }

    this.api.methPOst('friends', data).subscribe((res) => {
      this.myfriends = res['data']
      if (res['data']) {
        this.loading = true;
      }
      // console.log(this.friendlist)

    })
  }
  fn_fndReq(id) {
    let data = { reqid: id._id, userid: localStorage.getItem('id') }
    this.api.methPOst('request', data).subscribe((res) => {
      this.requestList();
    })
  }
  requestList() {
    let data = { id: localStorage.getItem('id') }
    this.api.methPOst('requestedout', data).subscribe((res) => {
      // console.log(res)
      if (res['apistatus'] = true) {
        this.loading = true;
        this.friendlist = res['data']
      }
    })
  }
  cancelreq(id) {
    let data = { userid: localStorage.getItem('id'), reqid: id }
    this.api.methPOst('cancelreq', data).subscribe((res) => {
      // console.log(res)
      if (res['apistatus'] = true) {
        this.loading = true;
        this.requestList();
      }
    })
  }
  requestinList() {
    let data = { id: localStorage.getItem('id') }
    this.api.methPOst('requestedin', data).subscribe((res) => {
      // console.log(res)
      if (res['apistatus'] = true) {
        this.reqested = res['data']
      }
    })
  }
  Accept(id) {
    let data = { userid: localStorage.getItem('id'), reqid: id }
    this.api.methPOst('acceptreq', data).subscribe((res) => {
      console.log(res)
      if (res['apistatus'] = true) {
        this.requestinList();
        this.fn_list()
      }
    })

  }

  pmsg(id) {
  this.instantChatservice.socketOn()
    const modalRef = this.modalService.open(PRIVATECHATComponent, { size: 'lg', centered: true });
    let data = {
      id: id._id,
      name:id.username,
      online:id.online
    }
    modalRef.componentInstance.fromParent = data;
  }
}
