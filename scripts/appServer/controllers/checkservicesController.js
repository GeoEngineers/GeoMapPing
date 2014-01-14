var http = require("http");
var request = require('request');
var AmazonSES = require('amazon-ses');
var nodemailer = require("nodemailer");
var fs = require("fs");
var bookshelf = require('bookshelf');
var _ = require('lodash');
var when = require('when');
var services = require('../src/services.js');
var geoUtilities = require('../../appServer/lib/geoUtilities.js');
var config = JSON.parse(fs.readFileSync("config.json"));
var ses;
var servicesDown = [];
var notNotified = [];
var serviceschecked = [];
var servicesList;

exports.checkServices = function()
{
	servicesDown = [];
	notNotified = [];
	serviceschecked = [];
	services.getCurrentServicesList()
    	.then(function(result){
    		 if(result.length > 0)
    		 {
		         servicesList = result;
		         for(var i=0; i < result.length; i++)
		         {
			         checkService(result[i]);
		         }
		     }
	});
}


function checkService(resultRow)
{
	var serviceID = resultRow.Id;
	var available = "'Available'";
	var notified = 0;
	var up = resultRow.Up;
	var down = resultRow.Down;
	var name = resultRow.Name;
	var found = false;			
	if(resultRow.Url != null && resultRow.Url != "" && resultRow.Url != undefined)
	{
		request(resultRow.Url, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.indexOf("Invalid URL") == -1) {
				//The Service Was Available				
				available = 'Available';
				notified = 0;
				up = up + 1;
				found = true;
			}
			else
			{
				//The Service was Unavailable
				available = 'Unavailable';
				notified = 1;
				down = down + 1;
				up = resultRow.Up;
				servicesDown.push(resultRow.Url);
		    	if (resultRow.Notified == 0) {
			    	notNotified.push(resultRow.Url);
				}
			}
			var ServicesListItem = 
			{
				ID: serviceID,
				Status: available,
				Notified: notified,
				Up: up,
				Down: down
			};
				services.saveServicesListItem(ServicesListItem).then(
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
					}		          		
				});	

			});
	}
	else
	{
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
			}		
	}
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
            });
        }
        catch (error){
            console.log('unable to send email' +  error);
        }
    }
    else
    {
	var smtpTransport = nodemailer.createTransport("SMTP",{
    		service: config.emailservice,
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
		    if(serviceschecked[j] == servicesList[i].Id)
		    	foundID = true;
		}
	   	if(foundID == false)complete = false;
	}
	return complete;
}



