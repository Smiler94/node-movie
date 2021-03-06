var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var _ = require('underscore')
var Movie = require('./models/movie')
var app = express()
var port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/movie')

app.set('views', './view/pages')
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())  
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('movie server started on port ' + port)

app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err)
        }

        res.render('index', {
            title: 'movie 首页',
            movies: movies
        })
    })
})

app.get('/movie/:id', function(req, res) {
    var id = req.params.id

    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: 'movie ' + movie.title,
            movie: movie
        })
    })
})

app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'movie 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            language: '',
            poster: '',
            year: '',
            flash: '',
            summary: ''
        }
    })
})

app.get('/admin/update/:id', function(req, res) {
    var id = req.params.id

    if (id) {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err)
            }

            res.render('admin', {
                title: 'movie 后台录入页',
                movie: movie
            })
        })
    }
})

app.post('/admin/movie/new', function(req, res) {
    var id = req.body._id
    var movieObj = req.body
    var _movie

    if (id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err)
            }

            _movie = _.extend(movie, movieObj)
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/' + movie._id)
            })
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            flash: movieObj.flash,
            summary: movieObj.summary
        })

        _movie.save(function(err, movie) {
            if (err) {
                console.log(err)
            }

            res.redirect('/movie/' + movie._id)
        })
    }
})

app.get('/admin/list', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err)
        }

        res.render('list', {
            title: 'movie 列表页',
            movies: movies
        })
    })
})