import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasdetailsComponent } from './materiasdetails.component';

describe('MateriasdetailsComponent', () => {
  let component: MateriasdetailsComponent;
  let fixture: ComponentFixture<MateriasdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriasdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriasdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
