import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NO_ERRORS_SCHEMA  } from '@angular/core';

import { CameraPage } from './camera.page';
import { CameraPreview} from '@ionic-native/camera-preview/ngx';

describe('CameraPage', () => {
  let component: CameraPage;
  let fixture: ComponentFixture<CameraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraPage ],
      imports: [IonicModule.forRoot()],
      providers: [CameraPreview],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changeView', () => {
    component.changeView();
    expect(component.cameraView).toBeFalsy();
  });

  it('useFlashTrue', () => {
    component.flashMode = true;
    component.useFlash();
    expect(component.flashMode).toBeFalsy();
  });

  it('useFlashFalse', () => {
    component.flashMode = false;
    component.useFlash();
    expect(component.flashMode).toBeTruthy();
  });

  it('zoomChange', () => {
    component.zoomValue = 2;
    component.zoomChange();
    component.getCameraPreview().getZoom().then((currentZoom) => {
      expect(currentZoom).toEqual(2);
    });
  })

  it('openCameraTrue', () => {
    component.cameraView = true
    component.openCamera(() => {
      expect(component.maxZoom).toBeTruthy;
    })
  })

  it('openCameraFalse', () => {
    component.cameraView = false
    component.openCamera(() => {
      expect(component.maxZoom).toBeTruthy;
    })
  })


  it('takePicture', () => {
    component.photos = [];
    component.takePicture(() => {
      expect(component.photos.length).toBeGreaterThan(0);
    })
  })
});
