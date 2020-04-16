import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title: string;
  imgData: string;
  tabCoordLongitude: Array<any>;
  tabCoordLattitude: Array<any>;
  watch: any;

  constructor(private alertController: AlertController, private camera: Camera, private geolocation: Geolocation) {
    this.tabCoordLongitude = [];
    this.tabCoordLattitude = [];
    this.watch = this.geolocation.watchPosition();
    this.watch.subscribe((data) => {
      if(data.coords && data.coords.longitude && data.coords.latitude){
        this.tabCoordLongitude.push(data.coords.longitude);
        this.tabCoordLattitude.push(data.coords.latitude);
      }
    });
  }

  updateTitle() {
    this.title = 'Mon Nouveau Titre';
  }

  /**
   * https://ionicframework.com/docs/api/alert
   */
  async fireAlert() {
    // creation de l alerte
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    // quand l alerte sera masquée
    alert.onDidDismiss().then(() => console.log('alerte masquée'))

    // affichage de l alerte
    await alert.present();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      console.log(imageData);
      this.imgData = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  savePos(){
    this.geolocation.getCurrentPosition().then((resp) => {
      if(resp.coords && resp.coords.longitude && resp.coords.latitude){
        this.tabCoordLongitude.push(resp.coords.longitude);
        this.tabCoordLattitude.push(resp.coords.latitude);
      }
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}