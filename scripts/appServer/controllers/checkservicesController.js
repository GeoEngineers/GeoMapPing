var http = require("http");
var request = require('request');
var AmazonSES = require('amazon-ses');
var nodemailer = require("nodemailer");
var fs = require("fs");
var sqliteQuery = require('../lib/geoSqliteQuery.js');

var config = JSON.parse(fs.readFileSync("config.json"));
var ses;
var servicesDown = [];
var notNotified = [];
var serviceschecked = [];
var servicesList;

exports.checkServices = function()
{
  	var queryServices = 'SELECT ID, Name, Url, Notified, Up, Down from Service' ;

	var queryManager = new sqliteQuery.QueryExecutor(queryServices,
        	function (result) {
            	    if(result.length > 0)
    		        {
		              servicesList = result;
		              for(var i=0; i < result.length; i++)
		              {
			             checkService(result[i]);
		              }
			}
		},
        function (errorMessage) {
            console.log(errorMessage);
		});

    	queryManager.executeQuery();

}


function checkService(resultRow)
{
	var serviceID = resultRow.ID;
	var available = "'Available'";
	var notified = 0;
	var up = resultRow.Up;
	var down = resultRow.Down;
	var name = resultRow.Name;
	var found = false;				

	request(resultRow.Url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//The Service Was Available
			available = '"Available"';
			notified = 0;
			up = up + 1;
			found = true;
		}
		else
		{
			//The Service was Unavailable
			available = '"Unavailable"';
			notified = 1;
			down = down + 1;
			up = resultRow.Up;
			servicesDown.push(resultRow.Url);
		    	if (resultRow.Notified == 0) {
			    notNotified.push(resultRow.Url);
			}
		}
		var updateService = '';
		updateService = updateService + 'Update Service Set Status = ' + available;
		updateService = updateService + ', Notified = ' + notified; 
		updateService = updateService + ', Up = ' + up; 
		updateService = updateService + ', Down = ' + down; 		 
		updateService = updateService + ' where ID = ' + serviceID + ';';
		var queryManager = new sqliteQuery.QueryExecutor(updateService,
		    function (result) {
			serviceschecked.push(serviceID);
			var complete = checkcomplete();		
			if(complete === true)
			{
				var alertStr = "The following services were not found: <br>";	
				for(var l=0; l < servicesDown.length; l++)
		    		{
					alertStr = alertStr + "<br>" + servicesDown[l];
				}
				if(notNotified.length > 0)
				{
				    email([config.adminemail], config.adminemail, 'Message from your Web Service Monitor',  alertStr); 
				}
				else
				{
					process.exit(0);
				}	
			}		          		
		});

    		queryManager.executeQuery();		

	});
}

function email(to, from, subject, body)  {	
   
   if(config.emailservice == "Amazon")
   {
       ses = new AmazonSES(config.emailuser, config.emailpass);
       try{
           ses.send({
               from: from,
               to: to,
               subject: subject,
               body: {
                  text: body,
                  html: body
               }
            }, function (result) {
                console.log('Email Away!');
		        process.exit(0);
            });
        }
        catch (error){
            console.log('unable to send email' +  error);
        }
    }
    else
    {
	var smtpTransport = nodemailer.createTransport("SMTP",{
    		service: config.email-service,
    		auth: {
        		user: config.emailuser,
        		pass: config.emailpass
    		}
	});
	var mailOptions = {
    		from: from,
    		to: to,
    		subject: subject,
    		html: body
		}

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
    		if(error){
        		console.log(error);
    		}else{
        		console.log("Message sent: " + response.message);
			process.exit(0);
    		}
    		smtpTransport.close(); // shut down the connection pool, no more messages
	});
    }

}

function checkcomplete()
{
        console.log('Services Checked:' + serviceschecked.length + ' of ' + servicesList.length);
	var complete = true;
	for(var i=0; i < servicesList.length; i++)
	{
	   var foundID = false;
		for(var j=0; j < serviceschecked.length; j++)
		{
		    if(serviceschecked[j] == servicesList[i].ID)foundID = true;
		}
	   	if(foundID == false)complete = false;
	}
	return complete;
}



