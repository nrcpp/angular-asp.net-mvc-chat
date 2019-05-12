import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import ApiService from '../shared/api.service';
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';
import { FormsModule } from '@angular/forms';
// >= v2.0.0
export function createConfig() {
    var c = new SignalRConfiguration();
    c.hubName = 'ChatHub';
    //c.qs = { user: 'alon' };
    c.url = 'http://localhost:33333';
    c.logging = true;
    // >= v5.0.0
    c.executeEventsInZone = true; // optional, default is true
    c.executeErrorsInZone = false; // optional, default is false
    c.executeStatusChangeInZone = true; // optional, default is true
    return c;
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                HttpClientModule,
                BrowserModule,
                SignalRModule.forRoot(createConfig),
                FormsModule,
            ],
            providers: [ApiService],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map