GeoMapPing
==========

GeoMapPing is a very simple web service monitoring tool written in <a href="http://nodejs.org">Node.js</a>.  GeoMapPing can be setup to provide email alerts (Amazon SES or SMTP) when a map service is no longer responding to API REST calls.  GeoMapPing can be deployed in the Cloud or setup behind a organization firewall to monitor map services.  

##Prerequisites##

<a href="http://nodejs.org/download/">Node.js</a>


##How to Install##
-Run npm install to update all Node modules

```
npm install
```

-Run node to launch the app.

```
node server.js
```


##Configuring Email Alerts##

GeoMapPing supports emails sent via <a href="http://aws.amazon.com/ses/">Amazon's SES product </a> as well as standard SMTP protocals.

To configure open the config.js file.  Set the adminemail variable equal to who will be receiving emails.  The emailservice variable supports the following values: Amazon, Gmail, and SMTP address.  

The emailuser and emailpass variables are intended for Amazon SES use and require your Amazon Access and Secret keys.

##Configuring The Scheduler##

GeoMapPing uses <a href="https://github.com/mattpat/node-schedule"> node-schedule </a> to handle scheduling of service health check calls.  You can configure the scheduler to check at a set interval.

To configure open the config.js file and edit the checkInterval variable with the value in minutes.

```
{
        "checkInterval": 5,
        "port": 1337,
        "host": "localhost",
        "adminemail": "",
        "emailservice": "Amazon",
        "emailuser": "",
        "emailpass": ""
}
```

The above example checks every 5 minutes.

##Known Issues##
- The monitoring tool does support ArcGIS.com Map Services in addition to ArcGIS Services.  ArcGIS.com Map Services are not exactly removed the same way as standard ArcGIS Server Map Services.  Instead of checking for straight HTTP status calls, ArcGIS.com Map Service calls intercept the Service status. 
- Secure Map Services are not yet supported.  

## License

  BSD, see LICENSE.txt
