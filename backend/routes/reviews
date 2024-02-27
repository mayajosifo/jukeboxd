//File to handle all route paths

const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg:'GET all reviews'})
})

router.get('/:id', (req, res) => {
    res.json({mssg:'GET a specific review by ID'})
})

router.get('/:artist', (req, res) => {
    res.json({mssg:'GET a review by artist'})
})

router.get('/:album', (req, res) => {
    res.json({mssg:'GET a review by album'})
})

router.post('/', (req, res) =>{
    res.json({mssg:'POST a new review'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg:'DELETE a review by id'})

})

router.patch('/:id', (req, res) => {
    res.json({mssg:'UPDATE a review by id'})
})

module.exports = router