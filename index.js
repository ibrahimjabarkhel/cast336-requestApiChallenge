/* Require external APIs and start our application instance */
var express = require('express');
var app = express();
var request = require('request');

/* Configure our server to read public folder and ejs files */
app.use(express.static('public'));
app.set('view engine', 'ejs');

/* The handler for the DEFAULT route */
app.get('/', function(req, res){
    res.render('home');
});

https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&format=json&jscmd=data

/* The handler for the /results route */
app.get('/results', function(req, res){
	
	var isbnNumber = "ISBN:" + req.query.ISBN_val;
	var url = 'https://openlibrary.org/api/books?bibkeys=' + isbnNumber + '&format=json&jscmd=data';
	request(url, function(error, response, dataStream){
		if (!error && response.statusCode == 200){
			var data = JSON.parse(dataStream);
			// console.log('data=', data);
			res.render('results', {data: data, isbnNumber: isbnNumber});
		}
	});
});

/* The handler for undefined routes */
app.get('*', function(req, res){
   res.render('error'); 
});

/* Start the application server */
app.listen(process.env.PORT , process.env.IP, function(){
    console.log('Server has been started');
})
