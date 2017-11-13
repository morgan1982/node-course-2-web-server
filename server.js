const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

// midleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${ req.method } ${ req.url }`;
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append to server.log');
    });
    console.log(log);    
    next();
})
//meintenance
// app.use( (req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// routes
app.get('/', (req, res) => {
    // res.send('<h1>hello there</h1>');
        res.render('home.hbs', {
            title: 'Home',
            pageTitle: 'Welcome',
            welcomeMessage: "Welcome to the site"
        })
    })

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About',
        pageTitle: 'About Page',
    });
});
app.get('/projects', (req, res) => {
    title: 'Projects',
    res.render('projects.hbs');
})

app.get('/bad', (req, res) => {
    res.send({
        status: "unable to fullfill the request"
    })
})

//bind app to a port of the machine
app.listen(port, () => {
    console.log(`serving on port ${ port }`);
});
