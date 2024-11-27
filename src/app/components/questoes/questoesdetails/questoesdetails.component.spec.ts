import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestoesdetailsComponent } from './questoesdetails.component';

describe('QuestoesdetailsComponent', () => {
  let component: QuestoesdetailsComponent;
  let fixture: ComponentFixture<QuestoesdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestoesdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestoesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
