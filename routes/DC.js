const express = require('express')
const DCModel = require('../models/DCModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    DCModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/dc')
    })
})




router.get('/', (req, res) => {
    DCModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('dc/index', { dc: data })
        }
    })
})

router.get('/list', (req, res) => {
    DCModel.find((err, data) => {
        if (!err) {
            res.render('dc/list', { dc: data, })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    DCModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete the item succeed !");
            //var message = "Delete student succeed !";
            //redirect về trang /student (URL không phải view)
            res.redirect("/dc");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("dc/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    //Cách 1: dùng "save"
    // var student = new StudentModel(req.body)
    // student.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Add student succeed !")
    //         res.redirect("/student")
    //     }
    // })
    //Cách 2: dùng "create"
    DCModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add item succeed !')
            res.redirect("/dc")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    DCModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("dc/update", { dc: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var dc = req.body;
    DCModel.findByIdAndUpdate(id, dc, (err) => {
        if (!err) {
            console.log("Update item succeed !")
            res.redirect("/xephinh")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    DCModel.findById(req.params.id, (err, dc) => {
        if (!err) {
            res.render('dc/info', { dc: dc })
        }
    })
})



//search function
router.post('/search', (req, res) => {
    DCModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('dc/index', { dc: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    DCModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('dc/index', { dc: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    DCModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('dc/index', { dc: data })
            }
        })
})
module.exports = router