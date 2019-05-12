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
        this.startConnection = function () {
            _this.hubConnection.connect({ jsonp: true, hubName: "ChatHub", url: "http://localhost:33333" }).then(function (conn) {
                console.log("Connected!");
                _this.connection = conn;
                conn.status.subscribe(function (s) { return console.warn("Connection status changed - " + s); });
                // subscribe for server events
                var listner = conn.listenFor('Hello');
                listner.subscribe(function () {
                    console.info('HELLO from server!');
                });
                // invoke ChatHub methods
                conn.invoke('Hello').then(function () {
                    console.info('Invoke Hello on ChatHub');
                });
            }).catch(function (e) {
                console.log("Error connecting to hub:  " + e);
            });
        };
    }
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