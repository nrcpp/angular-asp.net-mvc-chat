import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import ApiService from '../shared/api.service';
//import { HubConnection } from '@aspnet/signalr';
import { SignalR } from 'ng2-signalr';
var AppComponent = /** @class */ (function () {
    function AppComponent(apiService, hubConnection) {
        var _this = this;
        this.apiService = apiService;
        this.hubConnection = hubConnection;
        this.nick = '';
        this.activeContact = 'All';
        this.message = '';
        this.messages = [];
        this.contacts = [];
        this.addContact = function (contact, department) {
            console.log("Contact: " + contact);
            console.log("Department: " + department);
            // update layout and contacts array
            _this.contacts.push({ name: contact, department: department });
        };
        this.addNewMessageToPage = function (name, contact, message, time) {
            console.warn("[" + time + "]: " + name + " to " + contact + ": " + message);
            _this.messages.push({
                name: name,
                contact: contact,
                message: message,
                time: time
            });
        };
        this.startConnection = function () {
            _this.hubConnection.connect({ jsonp: true, hubName: "ChatHub", url: "http://localhost:33333" }).then(function (conn) {
                console.log("Connected!");
                _this.connection = conn;
                conn.status.subscribe(function (s) { return console.warn("Connection status changed - " + s); });
                // subscribe for server events
                var listner = conn.listenFor('Ping');
                listner.subscribe(function () {
                    console.info('Ping from server!');
                });
                conn.listenForRaw('addContact').subscribe(function (data) { return _this.addContact(data[0], data[1]); });
                conn.listenFor('clearContacts').subscribe(function () { return _this.contacts = []; });
                conn.listenFor('clearMessages').subscribe(function () { return _this.messages = []; });
                conn.listenForRaw('addNewMessageToPage').subscribe(function (data) { return _this.addNewMessageToPage(data[0], data[1], data[2], data[3]); });
                // invoke ChatHub methods
                conn.invoke('Connect', _this.nick, _this.activeContact).then(function () {
                    console.info('Notify hub for new connection of ' + _this.nick);
                });
            }).catch(function (e) {
                console.log("Error connecting to hub:  " + e);
            });
        };
    }
    AppComponent.prototype.onSendClick = function () {
        this.connection.invoke('Send', this.nick, this.activeContact, this.message);
        this.message = '';
    };
    AppComponent.prototype.onSendKey = function (event) {
        if (event.keyCode == 13 || event.which == 13)
            this.onSendClick();
    };
    AppComponent.prototype.ngOnInit = function () {
        //this.apiService.getAll().subscribe(data => {
        //  this.joggingRecords = data;
        //});   
        while (this.nick.trim().length == 0)
            this.nick = window.prompt('Your name: ', 'Alon');
        this.startConnection();
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService, SignalR])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map