import { Component, ElementRef, Input, IterableDiffers, OnInit, ViewChild } from '@angular/core';
import { DataService } from "../../../SHARED/data.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/SHARED/apiservice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-privatechat',
  templateUrl: './privatechat.component.html',
  styleUrls: ['./privatechat.component.scss'],
  providers:[DatePipe]
})
export class PRIVATECHATComponent implements OnInit {
  @Input() fromParent;
  @ViewChild('scrollMe') scrollMe: ElementRef;
  iterableDiffer: any;

  public localid: string = localStorage.getItem('id');
  public messageArray = [];
  messageText: string;
  messageLoading: false
  public online;

  scrollTop;
  public room:any;
  myDate = new Date();
  public typingArray=[]
  public typing;
  constructor(
    private instantChatservice: DataService,
    private iterableDiffers: IterableDiffers,
    private modalservise: NgbModal,
    private route: ActivatedRoute,
    private api: ApiserviceService,
    private datePipe: DatePipe
  ) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
    this.room = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');


    this.instantChatservice.recievemsg()
      .subscribe(data => {
        if (this.fromParent.id === data['from']) {
          this.messageArray.push(data)
        }

      })
    this.instantChatservice.recieveOldMsg()
      .subscribe(data => {
        for (let i = data.length - 1; i >= 0; i--) {
          this.messageArray.push(data[i])

        }
      });

    this.instantChatservice.recvetyping()
      .subscribe(data => {
        if(data['from'] == this.fromParent.id){
          this.typingArray.push(data)
          this.typing =  this.fromParent.name+"" + data['typing']
        }
      })


  }


  ngOnInit(): void {
    this.collectOldMesg();
    this.onlinecheck()
    this.join()
    setInterval(() => {
      this.onlinecheck()
      this.typing ='';
    }, 1000);

  }
  sendMessage() {
    let data = {
      from: localStorage.getItem('id'),
      to: this.fromParent.id,
      message: this.messageText
    }
    console.log(data)
    if (this.messageText !== '') {
    this.messageArray.push(data)
    this.instantChatservice.sendprivaetmsg(data);
    this.messageText = '';
    }

  }

  collectOldMesg() {
    this.instantChatservice.collectOldmMsg({ to: this.fromParent.id, from: localStorage.getItem('id'), name: this.fromParent.name });
  }


  close() {
    this.modalservise.dismissAll()
    this.instantChatservice.socketOff()

  }
  scrollon() {
    var scroll = 5000
    this.scrollTop = this.scrollMe.nativeElement.scrollHeight;
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.messageArray);
    if (changes) {
      this.scrollon()
    }
  }

  join() {
    this.instantChatservice.joinRoom({ localid: localStorage.getItem('id') });
  }
  onKey(test) {
    // console.log("typing.......")
    this.instantChatservice.typing({to:this.fromParent.id+ this.room,from:this.localid,typing:' is typing...'})
  }

  onlinecheck(){
    let data ={
      id:this.fromParent.id
    }
    this.api.methPOst('onlinecheck',data ).subscribe((res) => {
      // console.log(res['res']['online'])
      this.online = res['res']['online']

    })
  }



}
