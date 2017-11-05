import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizePhotoComponent } from './customize-photo.component';

describe('CustomizePhotoComponent', () => {
  let component: CustomizePhotoComponent;
  let fixture: ComponentFixture<CustomizePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
