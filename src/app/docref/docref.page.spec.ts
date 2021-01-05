import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocrefPage } from './docref.page';

describe('DocrefPage', () => {
  let component: DocrefPage;
  let fixture: ComponentFixture<DocrefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocrefPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocrefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
