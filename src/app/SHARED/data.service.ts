import { Injectable, Input, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { promise } from 'protractor';
import { DatePipe } from '@angular/common';
import { ConstantPool } from '@angular/compiler';
import { Console } from 'console';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public touserId: any;
  public tousername: any;
  myDate = new Date();
  room: string;
  constructor(
    private datePipe: DatePipe
  ) { 
    this.room = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.socket.on('connect_failed', function() {
      console.log('failed to connect')
   })
  }


  private socket = io('https://node-twentytwo.herokuapp.com');
  // private socket = io('http://localhost:4201',{
    // reconnectionDelayMax:100

  // })


  joinRoom(data) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    let observable = new Observable<[]>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    let observable = new Observable<{ user: String, message: String ,id:string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  // ========================================================9090909=========================================
  collectOldmMsg(data) {
    this.socket.emit('messages', data)
    this.touserId = data.to
    this.tousername = data.name
    // console.log(data)

  }

  recievemsg() {
    setTimeout(() => {
    }, 2000);
    let observable = new Observable<[]>(observer => {
      this.socket.on(localStorage.getItem('id'), (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }


  sendprivaetmsg(data) {
    this.socket.emit('recievemsg', data)
  }
  recieveOldMsg() {
    let observable = new Observable<[]>(observer => {
      this.socket.on(localStorage.getItem('id'), (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;

  }


  typing(data){
    this.socket.emit('typing',data)
  }
  recvetyping(){
    let observable = new Observable<[]>(observer => {
      this.socket.on(localStorage.getItem('id')+this.room, (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable

  }



  socketOff(){
    this.socket.disconnect()
  }
  socketOn(){
    this.socket.connect()
  }
  failConnection(){
    this.socket.on('connect_failed', function() {
      console.log('failed to connect')
   })
  }

}

