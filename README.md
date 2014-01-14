GeoMapPing
==========

#What is GeoMapPing#

GeoMapPing is a very simple web service monitoring tool written in <a href="http://nodejs.org">Node.js</a>.  GeoMapPing can be setup to provide email alerts when a map service is no longer responding to API REST calls.  GeoMapPing can be deployed in the Cloud or setup behind a organization firewall to monitor map services.  

#Prerequisites#

<a href="http://nodejs.org/download/">Node.js</a>


#How to Install#
-Run npm install to update all Node modules

```
npm install
```

-Install <a href="https://github.com/bower/bower">bower</a>

```
bower install
```

<B>NOTE:</B> You might have to install bower globally if you run into errors installing bower.

```
bower install -g
```

-Run node to launch the app.

```
node server.js
```

<img src="http://geopublic.s3.amazonaws.com/GeoMapPing_Landing.png" width="900px"/>

#Configuring Email Alerts#

GeoMapPing supports emails sent via <a href="http://aws.amazon.com/ses/">Amazon's SES product </a> as well as standard SMTP protocals.
