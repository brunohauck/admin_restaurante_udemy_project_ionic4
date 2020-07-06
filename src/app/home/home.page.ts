import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { TokenReturn } from '../models/token';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  token : TokenReturn;
  constructor(   
    public navCtrl: NavController,
    private  userService:  UserService, 
    private  router:  Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('flagLogado')=="sim"){
      this.goToOrders();
    }
  }
  goToOrders(){

    this.navCtrl.navigateRoot('/orders');
  
  }
  login(form){
    var postData = {
      grant_type: "password",
      client_id: 6,   // the client ID generate before
      client_secret: "HYkLZxruTZ40dXVUqwxNxWK4z3IOyjh9QTvD4nry",   // the client secret generated before
      username: form.value.email, // an User in Laravel database
      password: form.value.password // the user's password
    }
    this.userService.login(postData).subscribe((res)=>{
      console.log("Entrou no subscribe");
      console.log(res);
      if(res==undefined){
        console.log("Falha no login")
      }else{
        this.token = res;
        sessionStorage.setItem("token", JSON.stringify(this.token));
        sessionStorage.setItem("flagLogado", "sim");
        this.router.navigateByUrl('home');
      }      
    },
    (err) => {console.log(err)}
    );
  }

}
/*
ionic cordova plugin add cordova-plugin-crop
npm install @ionic-native/crop
ionic cordova plugin add cordova-plugin-camera
npm install @ionic-native/camera
ionic cordova plugin add cordova-plugin-file-transfer
npm install @ionic-native/file-transfer
ionic cordova plugin add cordova-plugin-file
npm install @ionic-native/file
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage
*/