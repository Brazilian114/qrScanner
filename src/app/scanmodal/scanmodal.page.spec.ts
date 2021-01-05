import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanmodalPage } from './scanmodal.page';

describe('ScanmodalPage', () => {
  let component: ScanmodalPage;
  let fixture: ComponentFixture<ScanmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
