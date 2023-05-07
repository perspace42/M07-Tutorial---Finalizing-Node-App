//Add packages
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


//express app
const app = express();

//connect to mongoDB
const dbURI = "mongodb+srv://netninja:test1234@cluster0.loc61cc.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    //Listen For Requests After Connection Is Complete
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine','ejs');

// middleware & static files
app.use(express.static('public'));
//This line is for accepting form data
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));



app.get('/',(req,res) => {
    //Sends content to browser (automatically sets Content-Type: text/html;)
    //res.send('<p>home page</p>');

    //sends the file to the browser
    //when a relative path is used root must be provided to show what directory is a relative too
    //res.sendFile('./views/index.html', {root: __dirname});
    res.redirect('/blogs');
});


app.get('/about',(req,res) => {
    //Sends content to browser (automatically sets Content-Type: text/html;)
    //res.send('<p>about page</p>');

    //sends the file to the browser
    //when a relative path is used root must be provided to show what directory is a relative too
    //res.sendFile('./views/about.html', {root: __dirname});
    res.render('about',{title: 'About'});

});

//blog routes
app.use('/blogs',blogRoutes);

//404 page
app.use((req,res) => {
    //remember to add '/url', to the parameters of use if uncommenting this code
    // the line /url is if the url is any other previously undefined url
    //res.sendFile('./views/404.html', {root: __dirname});

    //another way to do the 404 page (if status is 404, send error page)
    //res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404',{title: '404'});
});

