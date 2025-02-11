import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmateriaslistComponent } from './submateriaslist.component';

describe('SubmateriaslistComponent', () => {
  let component: SubmateriaslistComponent;
  let fixture: ComponentFixture<SubmateriaslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmateriaslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmateriaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
