import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mybids',
  templateUrl: './mybids.page.html',
  styleUrls: ['./mybids.page.scss'],
})
export class MybidsPage implements OnInit {

  userid: string; jobs: any; jobImageUrl: any; nodata: boolean;
  constructor(private api: ApiService) {
    this.userid  = localStorage.getItem('USERID');
    this.jobImageUrl = localStorage.getItem('IMAGEURL') + 'photos/';
  }

  ngOnInit() {
    this.nodata = false;
    this.getSubscripbedJobs();
  }

  getSubscripbedJobs() {
    const action = '&actions=myrequest';
    const data = '&artisancode=' + this.userid;
    this.api.postData(action, data).then((res: any) => {
      console.log(res.data);
      const arr = Array.isArray(res.data);
      if (arr) {
        this.jobs = res.data;
      } else {
        this.nodata = true;
      }
    });
  }

  gotoDetails(reqcode: any) {

  }

  gotoNotifications() {}

  openDetails(id: string) {
    const content: HTMLElement = document.getElementById('content_' + id);
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  }

}
