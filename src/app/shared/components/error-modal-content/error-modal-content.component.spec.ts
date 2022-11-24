import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorModalContentComponent } from './error-modal-content.component';

describe('ErrorModalContentComponent', () => {
  let component: ErrorModalContentComponent;
  let fixture: ComponentFixture<ErrorModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorModalContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
