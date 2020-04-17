import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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

  constructor(private alertController: AlertController, private camera: Camera, private geolocation: Geolocation, private localNotifications: LocalNotifications) {
    this.tabCoordLongitude = [];
    this.tabCoordLattitude = [];
    this.watch = this.geolocation.watchPosition();
    this.watch.subscribe((data) => {
      if(data.coords){
        this.tabCoordLongitude.push(data.coords.longitude);
        this.tabCoordLattitude.push(data.coords.latitude);
      }
    });
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

  takePicture(callback?: Function) {
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
      this.imgData = 'data:image/jpeg;base64,' + imageData;
      if(callback){
        callback();
      }
    }, (err) => {
      // Handle error
      console.log('erreur connard');
      
    });
  }

  savePos(callback?: Function){
    this.geolocation.getCurrentPosition().then((resp) => {
      if(resp.coords){
        this.tabCoordLongitude.push(resp.coords.longitude);
        this.tabCoordLattitude.push(resp.coords.latitude);
      }
      // resp.coords.latitude
      // resp.coords.longitude
      callback();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  sendNotification(){
    this.localNotifications.schedule({
      id: 1,
      title: 'ma notification',
      text: 'Ceci est une notification',
      icon: 'https://i.kym-cdn.com/photos/images/facebook/001/368/285/825.jpg',
      led: '#00FF00',
    });
  }

  getLocalNotication(){
    return this.localNotifications;
  }

}