const express = require('express')
// const { route } = require('.')
const NarutoModel = require('../models/NarutoModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    NarutoModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/naruto')
    })
})

router.get('/', (req, res) => {
  NarutoModel.find((err, data) => {
    if (!err){
        res.render('naruto/index', {naruto: data})
    }
  })
})

router.get('/list', (req, res) => {
    NarutoModel.find((err, data) => {
        if (!err) {
            res.render('naruto/list', {naruto: data, })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    NarutoModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete the item succeed !");
            res.redirect("/naruto");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("naruto/new");
})

//nhan & xu ly du lieu tu form ADD
router.post('/add', (req, res) => {
    NarutoModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add item succeed !')
            res.redirect("/naruto")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    NarutoModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.render("naruto/update", {naruto: data})
        }
    })
})

//nhan & xu ly du lieu tu form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var naruto = req.body;
    NarutoModel.findByIdAndUpdate(id, naruto, (err) => {
        if (!err) {
            console.log("Update item succeed !")
            res.redirect("/naruto")
        }
    })
})

router.get('detail/:id', (req, res) => {
    NarutoModel.findById(req.params.id, (err, naruto) => {
        if (!err) {
            res.render('naruto/info', {naruto: naruto})
        }
    })
})

//search function
router.post('/search', (req, res) => {
    NarutoModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('naruto', {naruto: data})
        }
    })
})

//sort function
router.get('/sort/asc', (req, res) => {
    NarutoModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('naruto/index', { naruto: data })
            }
        })
})


router.get('/sort/desc', (req, res) => {
    NarutoModel.find()
    .sort({name: -1 })
    .exec((err, data) => {
        if (!err) {
            res.render('naruto/index', {naruto: data})
        }
    })
})
module.exports = router