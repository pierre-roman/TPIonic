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
  });

  it('takePicture', () => {
    component.imgData = "";
    component.takePicture(() => {
      expect(component.imgData.length).toBeGreaterThan(0);
    });
  })

  it('savePos', () => {
    component.tabCoordLongitude = [];
    component.tabCoordLattitude = [];
    component.savePos(() => {
      expect(component.tabCoordLattitude.length).toBeGreaterThan(0);
      expect(component.tabCoordLongitude.length).toBeGreaterThan(0);
    })
  })

  it('sendNotification', () => {
    component.sendNotification();
    component.getLocalNotication().get(1).then((notificationTest) => {
      expect(notificationTest.id).toBe(1);
    });    
  })

  /*it('change title', () => {
    component.title = 'Mon Titre';
    expect(component.title).toBe('Mon Titre');
  });

  it('update title', () => {
    component.updateTitle();
    expect(component.title).toBe('Mon Nouveau Titre');
  });*/
});