# Angular 7/SignalR based chat


### Build and run instructions after clone repository:
1. cd (projecdir)/angular
2. npm install
3. ng build --extractCss --watch
4. Clean, build and run ASP.NET MVC solution which will automatically launch SignalR hub and renders Angular client in browser

**Troubleshooting if such errors appeared:**
5. (Optionally, if refrences not found in project) use package manager console:  
Update-Package -reinstall
6. In case of "roslyn\csc.exe not found" error, re-install/update "Microsoft.CodeDom.Providers" nuget package
7. In case of "IIS error" on running application from Visual Studio:
- Remove %userprofile%\Documents\IIS Express folder
- Remove .vs folder in the solution root folder
- If this doesn't help then restart Visual Studio as Administrator 
8. In case of connection refused error, then change starting port to another one,
and then find all  occurrences of "localhost:" in Angular files and replace them with *new port*.
By default this webapp points to localhost:33333, you could change it to another port, but update Angular settings as well.

### Additional notes
**To install SignalR for Angular:**

NOTE: use **ng2-signalr** for classic ASP.NET 4.5, not @aspnet/signalr which is compatible with ASP.NET Core

> npm install ng2-signalr jquery signalr --save
 
 Documentation for this lib is here https://www.npmjs.com/package/ng2-signalr


> Use command below for *ASP.NET Core* project (not this one):
> npm install @aspnet/signalr

**To install SignalR for ASP.NET MVC:**
1. Install nuget packages Microsoft.Owin 2.1.0, Microsoft.Owin.WebHost 2.1.0

**To add SignlarR services:**
1. ng g service services/signal-r --spec false

**To add CORS for ChatHub:**
1. Install Microsoft.Owin.Cors packages
2. See example https://stackoverflow.com/questions/9984534/how-to-use-cross-domain-connections-cors-access-control-allow-origin-with-si/9984798
3. To enable CORS for WebApi see https://stackoverflow.com/questions/32132763/mvc-web-api-cors-policy-not-working/32152011#32152011
 

### Related Links
https://www.c-sharpcorner.com/article/asp-net-signalr-angular2-and-typescript-real-time-clock/

https://developer.okta.com/blog/2018/12/21/build-basic-web-app-with-mvc-angular




