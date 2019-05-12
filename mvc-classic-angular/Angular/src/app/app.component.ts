import { Component, OnInit } from '@angular/core';

import JoggingRecord from '../shared/JoggingRecord';
import ApiService from '../shared/api.service';
//import { HubConnection } from '@aspnet/signalr';
import { SignalR, SignalRConnection } from 'ng2-signalr';
import { concat } from 'rxjs';


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
    this.hubConnection.connect({jsonp: true, hubName: "ChatHub", url: "http://localhost:33333" }).then((connection) => {
      
      console.log("Connected!");
      connection.status.subscribe((s) =>  console.warn("Connection status changed - " + s));

      // subscribe for server events
      let listner = connection.listenFor('Hello');
      listner.subscribe(() => {
        console.info('HELLO from server!');
      });

      connection.invoke('Hello').then(() => {
        console.info('Invoke Hello on ChatHub');
      });

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
