import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// var SimplePeer = require('simple-peer');

declare var SimplePeer: any;


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent  {
  peer: any;

  targetpeer: any;
  stream: MediaStream

  async ngOnInit() {
    try {
      // This peer is the initiator and transfering the streaming to the other connected peer 
      if (location.hash === '#init') {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true })
        this.peer = new SimplePeer({
          initiator: location.hash === '#init',
          stream: stream
        })
      }
      else {
        this.peer = new SimplePeer()
      }

      // triggers when signal is sent from remote
      this.peer.on('signal', function (data) {
        console.log(JSON.stringify(data));
      })

      this.peer.on('data', (data) => {
        console.log('Received Data: ' + data)
      })

      this.peer.on('stream', (stream) => {
        // got remote video stream, now let's show it in a video tag
        this.videoElement.srcObject = stream
      })
    } catch (error) {
      console.log(error)
    }
  }

  connect() {
    this.peer.signal(this.targetpeer);
  }

  message() {
    this.peer.send('Hello world');
  }

  @ViewChild('myvideo') videoElementRef: ElementRef;
  get videoElement(): HTMLVideoElement {
    return this.videoElementRef.nativeElement
  }
}
