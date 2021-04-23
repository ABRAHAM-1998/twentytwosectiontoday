import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PRIVATECHATComponent } from './privatechat.component';

describe('PRIVATECHATComponent', () => {
  let component: PRIVATECHATComponent;
  let fixture: ComponentFixture<PRIVATECHATComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PRIVATECHATComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PRIVATECHATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
