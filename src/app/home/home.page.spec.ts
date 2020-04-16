import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';

import { HomePage } from './home.page';
import {RouterTestingModule} from '@angular/router/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [Camera, Geolocation, LocalNotifications]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.title).toBeUndefined();
  });

  /*it('change title', () => {
    component.title = 'Mon Titre';
    expect(component.title).toBe('Mon Titre');
  });

  it('update title', () => {
    component.updateTitle();
    expect(component.title).toBe('Mon Nouveau Titre');
  });*/
});