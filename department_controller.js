const express = require('express')
const Department = require('./department')
const Product = require('./product')
const router = express.Router()

router.post('/', (req, res) => {
    console.log(req.body)
    let dpt = new Department({
        name: req.body.name
    })
    dpt.save((err, dpt) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(200).send(dpt)
    })
})

router.get('/', (req, res) => {
    Department.find().exec((err, dpts) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(200).send(dpts)
    })
})

router.delete('/:id', async (req, res) => {
    try{
        let id = req.params.id
        let prods = await Product.find({departments: id}).exec()
        if(prods.length){
            res.status(500).send({
                msg: 'Could not remove this department. You may have to fix its dependencies before.'
            })
        }
        else{
            Department.deleteOne({_id: id})
            res.status(200).send({})
        }
    }
    catch(err){
        res.status(500).send({
            msg: 'Internal error.', error: err
        })
    }
})

router.patch('/:id', (req, res) => {
    let id = req.params.id
    Department.findById(id, (err, dpt) => {
        if(err)
            res.status(500).send(err)
        else if (!res)
            res.status(404).send({})
        else{
            dpt.name = req.body.name
            dpt.save().then((d) => res.status(200).send(d))
            .catch((e) => res.status(500).send(e))
        }
    })
})

module.exports = router