var express = require('express')
var path = require('path')
var app = express()
var port = process.env.PORT || 3000

app.set('views', './view/pages')
app.set('view engine', 'jade')
// app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('movie server started on port ' + port)

app.get('/', function(req, res) {
    res.render('index', {
        title: 'movie 首页',
        movies: [{
            title: '机械战警',
            _id : 1,
            poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491225094845&di=985fa814675d14cdfce5ef1aad0f1815&imgtype=0&src=http%3A%2F%2Fimg.sj33.cn%2Fuploads%2Fallimg%2F201309%2F7-130911093243.jpg'
        },{
            title: '机械战警',
            _id : 2,
            poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491225094845&di=985fa814675d14cdfce5ef1aad0f1815&imgtype=0&src=http%3A%2F%2Fimg.sj33.cn%2Fuploads%2Fallimg%2F201309%2F7-130911093243.jpg'
        },{
            title: '机械战警',
            _id : 3,
            poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491225094845&di=985fa814675d14cdfce5ef1aad0f1815&imgtype=0&src=http%3A%2F%2Fimg.sj33.cn%2Fuploads%2Fallimg%2F201309%2F7-130911093243.jpg'
        },{
            title: '机械战警',
            _id : 4,
            poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491225094845&di=985fa814675d14cdfce5ef1aad0f1815&imgtype=0&src=http%3A%2F%2Fimg.sj33.cn%2Fuploads%2Fallimg%2F201309%2F7-130911093243.jpg'
        },{
            title: '机械战警',
            _id : 5,
            poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491225094845&di=985fa814675d14cdfce5ef1aad0f1815&imgtype=0&src=http%3A%2F%2Fimg.sj33.cn%2Fuploads%2Fallimg%2F201309%2F7-130911093243.jpg'
        }]
    })
})

app.get('/movie/:id', function(req, res) {
    res.render('detail', {
        title: 'movie 详情页'
    })
})

app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'movie 后台录入页'
    })
})

app.get('/admin/list', function(req, res) {
    res.render('list', {
        title: 'movie 列表页'
    })
})