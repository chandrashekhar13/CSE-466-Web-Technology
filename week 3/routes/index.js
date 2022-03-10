    var express = require('express');
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var upload = multer();
    var app = express();
    var router = express.Router();
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/my_db');
	
	var movieSchema = mongoose.Schema({
	MovieName: String,
	MovieYear: Number,
	MovieGenre: String,
	Director: String
});
var Movie = mongoose.model("Movie", movieSchema);
     
    app.get('/', function(req, res){
       res.render('form');
    });
     
    app.set('view engine', 'pug');
    app.set('views', './views');
     
    // for parsing application/json
    app.use(bodyParser.json()); 
    var urlencodedParser = bodyParser.urlencoded({ extended: true })
    // for parsing application/xwww-
    //form-urlencoded
     
    // for parsing multipart/form-data
    app.use(upload.array()); 
    app.use(express.static('public'));
    app.get('/addMovie', function(req, res){
   res.render('addMovie');
});
app.post('/addMovie', function(req, res){
   var movieInfo = req.body; //Get the parsed information
   
   if(!movieInfo.MovieName || !movieInfo.MovieYear || !movieInfo.MovieGenre || !movieInfo.Director){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newMovie = new Movie({
         MovieName: moiveInfo.MovieName,
         MovieYear: moiveInfo.MovieYear,
         MovieGenre: movieInfo.MovieGenre,
         Director: movieInfo.Director
      });
		
      newMoive.save(function(err, Movie){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New Movie added", type: "success", person: moiveInfo});
      });
   }
});


    app.post('/', urlencodedParser,function(req, res){
       console.log(req.body);
       const MovieName = req.body.data;
       res.send(req.body);
    });
    app.listen(8000);
    module.exports = router ;
