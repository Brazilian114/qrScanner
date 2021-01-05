import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WarehousetaskPage } from './warehousetask.page';

describe('WarehousetaskPage', () => {
  let component: WarehousetaskPage;
  let fixture: ComponentFixture<WarehousetaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehousetaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WarehousetaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
