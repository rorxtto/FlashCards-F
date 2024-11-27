import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestoeslistComponent } from './questoeslist.component';

describe('QuestoeslistComponent', () => {
  let component: QuestoeslistComponent;
  let fixture: ComponentFixture<QuestoeslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestoeslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestoeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
