import { Component } from '@angular/core';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {

  cameraStatus: boolean;
  photos: Array<String>;
  cameraView: boolean;
  flashMode: boolean;
  maxZoom: number;
  zoomValue: number;
  viewGallery: boolean;

  constructor(private cameraPreview: CameraPreview) { 
    this.cameraStatus = true;
    this.flashMode = false;
    this.cameraView = true;
    this.photos=[];
    this.zoomValue = 1;
    this.viewGallery=false;
    this.openCamera();
  }

  openCamera(){
    this.cameraPreview.startCamera({
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      toBack: true,
      tapPhoto: false,
      previewDrag: false,
      alpha: 1,
      camera: this.cameraView ? this.cameraPreview.CAMERA_DIRECTION.BACK: this.cameraPreview.CAMERA_DIRECTION.FRONT,}).then(
      (res) => {
        this.cameraPreview.getMaxZoom().then((maxZoom) => {
          console.log(maxZoom);
          this.maxZoom = maxZoom;
          this.zoomChange();
        })
      },
      (err) => {
        console.log(err)
      });
  }

  takePicture(){
    // 'data:image/jpeg;base64,'
    this.cameraPreview.takePicture({width:window.screen.width, height:window.screen.height, quality: 100}).then((base64PictureData) => {
      this.photos.push(base64PictureData);
    });
  }

  closeCamera(){
    this.cameraPreview.stopCamera();
  }

  useFlash(){
    if(!this.flashMode){
      this.cameraPreview.setFlashMode(this.cameraPreview.FLASH_MODE.ON);
    }else{
      this.cameraPreview.setFlashMode(this.cameraPreview.FLASH_MODE.OFF);
    }
    this.flashMode = !this.flashMode;
  }

  changeView(){
    this.closeCamera();
    this.cameraView = !this.cameraView;
    this.openCamera();
  }

  zoomChange(){
    this.cameraPreview.setZoom(this.zoomValue);
  }

}
