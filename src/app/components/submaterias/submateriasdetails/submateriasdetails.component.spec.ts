import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmateriasdetailsComponent } from './submateriasdetails.component';

describe('SubmateriasdetailsComponent', () => {
  let component: SubmateriasdetailsComponent;
  let fixture: ComponentFixture<SubmateriasdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmateriasdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmateriasdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
