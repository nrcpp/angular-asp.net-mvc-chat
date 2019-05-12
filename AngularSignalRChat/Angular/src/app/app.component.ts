import { Component, OnInit } from '@angular/core';

import { Contact, ChatMessage } from '../shared/Models';
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
  messages: ChatMessage[] = [];
  contacts: Contact[] = [];

  constructor(private apiService: ApiService, private hubConnection: SignalR) {
      
  }

  public addContact = (contact: string, department: string) => {
    console.log("Contact: " + contact);
    console.log("Department: " + department);

    // update layout and contacts array
    this.contacts.push({ name: contact, department: department });
  }

  public addNewMessageToPage = (name, contact, message, time) => {
    console.warn(`[${time}]: ${name} to ${contact}: ${message}`);

    this.messages.push({
      name: name,
      contact: contact,
      message: message,
      time: time
    });
  }
   
  public startConnection = () => {
    this.hubConnection.connect({ jsonp: true, hubName: "ChatHub", url: "http://localhost:33333" }).then((conn) => {

      console.log("Connected!");

      this.connection = conn;
      conn.status.subscribe((s) => console.warn("Connection status changed - " + s));

      // subscribe for server events
      let listner = conn.listenFor('Ping');
      listner.subscribe(() => {
        console.info('Ping from server!');
      });

      conn.listenForRaw('addContact').subscribe((data: any[]) => this.addContact(data[0], data[1]));
      conn.listenFor('clearContacts').subscribe(() => this.contacts = []);
      conn.listenFor('clearMessages').subscribe(() => this.messages = []);
      conn.listenForRaw('addNewMessageToPage').subscribe((data: any[]) => this.addNewMessageToPage(data[0], data[1], data[2], data[3]));

      // invoke ChatHub methods
      conn.invoke('Connect', this.nick, this.activeContact).then(() => {
        console.info('Notify hub for new connection of ' + this.nick);
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
