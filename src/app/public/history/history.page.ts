import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  items: any = []; nodata: boolean; noMoreRecords: any; lastcount: any; itemsnew: any;
  constructor(private router: Router,private api: ApiService) {}

  ngOnInit() {
  }
  ionViewWillEnter() {
   this.getData();
  }
  getData() {
    const action = '&actions=requesthistory';
    const data = '&lastcount=0';
    this.api.postData(action, data).then((res: any) => {
      console.log(res);
      const arr = Array.isArray(res.data);
      if (arr) {
        this.items = res.data;
        this.lastcount = res.lastcount;
        this.nodata = false;
      } else {
        this.nodata = true;
      }
    });
  }
  loadMoreData(event): Promise<any> {
    this.noMoreRecords = false;
    try {
      this.lastcount = this.items.length;
    } catch (e) {
      console.log('ferr', e);
    }
    console.log(this.lastcount);
    return new Promise((resolve) => {
      setTimeout(() => {
        const action = '&actions=requesthistory';
        const data = '&lastcount=' + this.lastcount;
        this.api.postData(action, data).then((res: any) => {
          this.itemsnew = res.data;
          try {
            if (this.itemsnew) {
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.itemsnew.length; i++) {
                this.items.push(this.itemsnew[i]);
                event.target.complete();
              }
            } else {
              this.noMoreRecords = true;
              event.target.complete();
            }
            if (this.itemsnew.length < this.lastcount) {
              event.target.complete();
              this.noMoreRecords = true;
            }
          } catch (e) {
            console.log('err', e);
          }
          console.log('new articles') ;
        }).catch(err => {
          console.log(err);
          event.target.disabled = true;
          this.api.systemError('Network Error ' + err);
        });
        console.log('Async operation has ended');
        resolve();
      }, 1000);
    });
  }

  getLocationMap(id: string) {
   return  window.location.href = this.api.googlemapurl + id;
  }

  openDetails(id: string) {
    const content: HTMLElement = document.getElementById('content_' + id);
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  }

  gotoDetails(item: any) {
    const navigationExtras = {
      queryParams: {
        package: this.api.encodePayload(item)
      }
    };
    this.router.navigate(['/index/home/request-detail'], navigationExtras);
  }

}
