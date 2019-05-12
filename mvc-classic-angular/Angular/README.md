# Angular

USE this link for instructions:
https://developer.okta.com/blog/2018/12/21/build-basic-web-app-with-mvc-angular

Build instructions after clone:
1. cd (projecdir)/angular
2. npm install
3. ng build --extractCss --watch
4. (Optionally, if refrences not found in project) package manager console:  Update-Package -reinstall
5. In case of "roslyn\csc.exe not found" error, re-install/update "Microsoft.CodeDom.Providers" nuget package

To install SignalR for Angular:
npm install ng2-signalr jquery signalr --save
More details is here https://www.npmjs.com/package/ng2-signalr

Note that this library is only compatible with ASP.NET Core
npm install @aspnet/signalr

To install SignalR for ASP.NET MVC:
1. Install nuget packages Microsoft.Owin 2.1.0, Microsoft.Owin.WebHost 2.1.0

To add SignlarR services:
1. ng g service services/signal-r --spec false

To add CORS for ChatHub:
1. Install Microsoft.Owin.Cors packages
2. See example https://stackoverflow.com/questions/9984534/how-to-use-cross-domain-connections-cors-access-control-allow-origin-with-si/9984798
3. To enable CORS for WebApi see https://stackoverflow.com/questions/32132763/mvc-web-api-cors-policy-not-working/32152011#32152011
 

#### Example of integration SignalR and Angular 2

https://www.c-sharpcorner.com/article/asp-net-signalr-angular2-and-typescript-real-time-clock/


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
