import { Component, OnInit } from '@angular/core';

import JoggingRecord from '../shared/JoggingRecord';
import ApiService from '../shared/api.service';
//import { HubConnection } from '@aspnet/signalr';
import { SignalR, SignalRConnection, ISignalRConnection } from 'ng2-signalr';
import { concat } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  connection: ISignalRConnection;
  nick = '';
  activeContact = 'All';
  message = '';
  messages: string[] = [];

  constructor(private apiService: ApiService, private hubConnection: SignalR) {
      
  }

  public startConnection = () => {
    this.hubConnection.connect({jsonp: true, hubName: "ChatHub", url: "http://localhost:33333" }).then((conn) => {
      
      console.log("Connected!");
      
      this.connection = conn;
      conn.status.subscribe((s) => console.warn("Connection status changed - " + s));

      // subscribe for server events
      let listner = conn.listenFor('Hello');
      listner.subscribe(() => {
        console.info('HELLO from server!');
      });

      // invoke ChatHub methods
      conn.invoke('Hello').then(() => {
        console.info('Invoke Hello on ChatHub');
      });

    }).catch((e) => {
      console.log("Error connecting to hub:  " + e);
    });
  }
  
  ngOnInit() {
    //this.apiService.getAll().subscribe(data => {
    //  this.joggingRecords = data;
    //});   

    while (this.nick.trim().length == 0)
      this.nick = window.prompt('Your name: ', 'Alon');

    this.startConnection();
  }
}
