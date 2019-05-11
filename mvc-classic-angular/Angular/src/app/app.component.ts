import { Component, OnInit } from '@angular/core';

import JoggingRecord from '../shared/JoggingRecord';
import ApiService from '../shared/api.service';
//import { HubConnection } from '@aspnet/signalr';
import { SignalR, SignalRConnection } from 'ng2-signalr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  joggingRecords: Array<JoggingRecord>;
  
  constructor(private apiService: ApiService, private hubConnection: SignalR) {
      
  }

  public startConnection = () => {
    this.hubConnection.connect({
      jsonp: true, hubName: "ChatHub", url: "http://localhost:50000" }).then((c) => {
      //do stuff
      console.log("connected!");
      c.status.subscribe((s) => console.warn("HEllo from server!!!"));

    }).catch((e) => {
      console.log("Error connecting to hub:  " + e);
    });
  }
  
  ngOnInit() {
    this.apiService.getAll().subscribe(data => {
      this.joggingRecords = data;
    });   

    this.startConnection();
  }
}
