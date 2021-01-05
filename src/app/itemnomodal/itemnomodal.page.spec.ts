import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemnomodalPage } from './itemnomodal.page';

describe('ItemnomodalPage', () => {
  let component: ItemnomodalPage;
  let fixture: ComponentFixture<ItemnomodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemnomodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemnomodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
