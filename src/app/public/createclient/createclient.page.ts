import { Component, OnInit, ViewChild } from '@angular/core';

import { IonSlides} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { CountrymodalPage } from '../../public/countrymodal/countrymodal.page';


@Component({
  selector: 'app-createclient',
  templateUrl: './createclient.page.html',
  styleUrls: ['./createclient.page.scss'],
})
export class CreateclientPage implements OnInit {  
  
  disablePrevBtn = true;
  disableNextBtn = false;
  disableBackBtn = false;
  disableSubmitBtn = true;
  @ViewChild('mySlider', {static: true})  slides: IonSlides;
  @ViewChild('form', {static: true}) testFormElement; phonenumber: any;
  countries: any;
  dataReturned: any;
  country: any;
  countrycode: any;
  userid: any;
  username: any;

  constructor(private api: ApiService, private authService: AuthService, public modalController: ModalController) {
    this.phonenumber = "+233";
    this.country = "Ghana";
    this.countrycode = "+233";
    this.userid = localStorage.getItem('USERID');
    this.username = localStorage.getItem('FULLNAME');
   }

  
  async openModal() {
    const modal = await this.modalController.create({
      component: CountrymodalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title",
        "countries": this.countries
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        this.phonenumber = "+" + this.dataReturned.COUN_EXTENSION;
        this.country = this.dataReturned.COUN_NAME;
        this.countrycode = "+" + this.dataReturned.COUN_EXTENSION;
      
        console.log(this.dataReturned.COUN_EXTENSION);
      }
    });
 
    return await modal.present();
  }

  fetchcountries(){
    const action = '&actions=fetchcountry';
    const data = '';
    this.api.postData(action, data).then((res: any) => {
      const repo_countries = res.data;
      this.countries = res.data;
      console.log(this.countries);
    });
  }


  ngOnInit() {
    this.fetchcountries();  
  }

  swipePrev() {
    this.slides.slidePrev();
  }

  swipeNext() {
    this.slides.getActiveIndex().then((active: number) => {
      console.log(active);
      if (active === 0) {
        // this.authService.checkNumber(this.phonenumber, '1').then((check: any) => {
        //   check ? console.log('logged-in') :  this.slides.slideNext();
        // });
        this.slides.slideNext();
      } else {
        this.slides.slideNext();
      }
    });
  }

  doCheck() {
    const prom1 = this.slides.isBeginning();
    const prom2 = this.slides.isEnd();

    Promise.all([prom1, prom2]).then((data) => {
      if (data[0]) {
        this.disablePrevBtn = true;
        this.disableNextBtn = false;
        this.disableBackBtn = false;
        this.disableSubmitBtn = true;
      } else if (data[1]) {
        this.disablePrevBtn = false;
        this.disableNextBtn = true;
        this.disableBackBtn = true;
        this.disableSubmitBtn = false;
      } else {
        this.disablePrevBtn = false;
        this.disableNextBtn = false;
        this.disableBackBtn = true;
        this.disableSubmitBtn = true;
      }
    });
  }

  userSignup(params: any, type= 1) {
    this.authService.appEmployeeRegister(params, type, this.userid, this.username);
  }

  subform() {
    this.testFormElement.ngSubmit.emit();
  }


}
