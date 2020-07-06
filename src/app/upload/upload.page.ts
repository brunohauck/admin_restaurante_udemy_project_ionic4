import { Component, OnInit } from '@angular/core';
import { ImagePicker} from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  url: string;
  constructor(
    private imagePicker: ImagePicker,
    private photoService: PhotoService,
    private crop: Crop,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private transfer: FileTransfer
  ) { }
  ngOnInit() {
  }
  cropUpload(){
    this.url = 'http://localhost/upload/upload.php';
    this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 0}).then((results)=>{
      for(let i = 0; i < results.length; i++){
        this.crop.crop(results[i], {quality: 100}).then( newImage => {
          const fileTransfer: FileTransferObject = this.transfer.create();
          const uploadOpts: FileUploadOptions = {
            fileKey: 'file',
            fileName: newImage.substr(newImage.lastIndexOf('/')+1)
          };
          fileTransfer.upload(newImage, this.url, uploadOpts)
            .then((data)=>{
              console.log(data.response)
              //requisição http para nossa API para atulizar o banco de dados na tabela de restaurante 
              //com URL da Imagem
            })
        });
      }
    })
  }
}
