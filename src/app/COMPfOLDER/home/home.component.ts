import { ChangeDetectionStrategy, Component, ViewChild, AfterViewInit } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


import { ApiserviceService } from '../../SHARED/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private api: ApiserviceService) { }
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  ngOnInit(): void {
    setTimeout(() => {
      this.getPost();
      
    }, 500);
  }
  public loading = true;

  public data: any = [];
  public postdetails = [];
  getPost() {
    let data = {
      'id': localStorage.getItem('id'),
      page: 0
    }
    this.api.methPOst('getposts', data).subscribe((res) => {
      this.data = res['data'];
      this.loading = res['apistatus']
      // console.log(this.data);

      this.data.forEach(element => {
        this.postdetails.push(element.postdetails)

      });
    })

  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  // idTrackFn = (pokemon: Pokemon) => pokemon.number;

  // currentIndex(index) {
  //   console.log('currentIndex', index);
  //   let data = {
  //     page:index,
  //     'id':localStorage.getItem('id'),
  //   }
  //   this.api.methPOst('getposts', data).subscribe((res) => {
  //     this.data = res['data'];
  //     this.loading = res['apistatus']
  //     this.data.forEach(element => {
  //       console.log(element.postdetails);
  //       this.postdetails.push(element.postdetails)

  //     });
  //   });
  // }

  // gotToScrollIndex() {
  //   this.viewport.scrollToIndex(Math.floor(Math.random() * this.viewport.getDataLength()) + 1  );
  // }
  // number:number

}
