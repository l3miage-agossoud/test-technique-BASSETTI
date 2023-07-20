import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailPieceComponent } from './view-detail-piece.component';

describe('ViewDetailPieceComponent', () => {
  let component: ViewDetailPieceComponent;
  let fixture: ComponentFixture<ViewDetailPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailPieceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
