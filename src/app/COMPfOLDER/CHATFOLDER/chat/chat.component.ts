import { Component, OnInit, ElementRef, ViewChild, IterableDiffers } from '@angular/core';
import { DataService } from "../../../SHARED/data.service";
import { ApiserviceService } from 'src/app/SHARED/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @ViewChild('scrollMe') scrollMe: ElementRef;
  scrollTop = 24440;
  date = new Date()
  iterableDiffer: any;
  delete: true;
  localuser: any = []
  public loading = false;
  public user = '';
  room: String;
  messageText: String;
  messageArray: Array<{ user: String, message: String }> = [];


///////////////////////////ngOninit////////////////////////
  ngOnInit(): void {
    this.fn_UserProfile();
    this.join()
    this.instantChatservice.failConnection()
    setTimeout(() => {
      this.scrollon()
      if (this.messageArray.length == 0) {
        this.join()
      }

    }, 2000);

  }
///////////////////////////////////////userprofile/////////////////
  fn_UserProfile() {
    let data = { id: localStorage.getItem('id') }

    this.api.methPOst('userp', data).subscribe((res) => {
      this.user = res['arrList']['username']
      this.localuser = res['arrList']
    }, (error) => {
      // console.log(error, 'this is my error')
    })
  }

  title = 'instant-chatting';
  // user: String;

  /////////////////////////////////CONSTRUCTOR/////////////////
  constructor(
    private instantChatservice: DataService,
    private api: ApiserviceService,
    private iterableDiffers: IterableDiffers,
    private route: Router
  ) { 
    this.iterableDiffer = iterableDiffers.find([]).create(null);
    /////////////////////////////RECIVE OLD MESSAGES////////////////////
    this.instantChatservice.newUserJoined()
      .subscribe(data => {
        if (data.length > 1) {
          for (let index = data.length - 1; index >= 1; index--) {
            this.messageArray.push(data[index])
          }
        };
        let zero= 0;
        if (data[zero]['success'] === true) {
            this.loading = true
        }else{
          setTimeout(() => {
            alert('something went wrong in Public messages\n error connecting or no messages || TWENTYTWO')
            this.loading = true
          }, 10000);
        };
      });
//////////////////////////////////LEFT////////////////////
    this.instantChatservice.userLeftRoom()
      .subscribe(data => {
        this.messageArray.push(data)
        console.log(data.message)
      });
      ////////////////////////////////NEW MESSAGES************///
    this.instantChatservice.newMessageReceived()
      .subscribe(data =>{ this.messageArray.push(data)
        console.log(data.message)

      });
      
  };
  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.messageArray);
    if (changes) {
      this.scrollon()
    }
  }
  //////////////////////////////////SOCKET CONNECT JOIN**/////////////
  join() {
    this.instantChatservice.joinRoom({ user: this.user, room: this.room });
  }
  //////////////////////////////LEAVE//////////////////////////////////
  leave() {
    var scroll = 5000
    this.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    this.instantChatservice.leaveRoom({ user: this.user, room: this.room });
  }
  //////////////////////////////////SEND MESSAGE///////////////////////////////
  sendMessage() {
    var scroll = 5000
    this.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    if (this.messageText != '') {
      this.instantChatservice.sendMessage({  'id': localStorage.getItem('id'), 'user': this.user, room: this.room, message: this.messageText, date: this.date });
      this.messageText = ''
    }
    else {

    }
  }
///////////////////////////////////SCROLLL///////////////////////////////////

  scrollon() {
    var scroll = 5000
    this.scrollTop = this.scrollMe.nativeElement.scrollHeight;
  }
//////////////////////////////////////DELETE///////////////////////////////
  chatDelete(item, index) {
    let data = {
      id: item._id
    }
    this.api.methPOst('deleteGchat', data).subscribe(data => {
      if (data) {
        this.messageArray.splice(index, 1)
      }
    })
  }




}