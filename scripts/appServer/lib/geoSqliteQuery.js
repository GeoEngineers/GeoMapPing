var sqlite3 = require('sqlite3').verbose();

var dbfile = 'servicemonitor.db';

var errorMessages = {
    connectError: 'could not connect to database',
    queryError: 'error running query'
};

exports.QueryExecutor = function (query, success, error) {     
    
    this.executeQuery = function() {
	
	try
	{		   
	   if(query.indexOf("SELECT ") > -1)
	   {		
		    var db = new sqlite3.Database(dbfile);
		    db.serialize(function() {
			db.all(query, function(err, result) {		    
            	    	if (err) error(err); 
		    		success(result);
  			});
		});
		db.close();		
	   }
	   else
	   {
		try
		{
		    var db = new sqlite3.Database(dbfile);
		    db.serialize(function() {
			db.run(query);
		    });
		    db.close();          
	            success('Success');
		}
		catch(error)
		{
			console.log(error);
		}
	   }

	
	}
	catch(err){console.log(err);}
    }
};

