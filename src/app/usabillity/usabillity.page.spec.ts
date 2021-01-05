import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsabillityPage } from './usabillity.page';

describe('UsabillityPage', () => {
  let component: UsabillityPage;
  let fixture: ComponentFixture<UsabillityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsabillityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsabillityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
