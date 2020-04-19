const express = require('express')
const router = express.Router()
const User = require('../models/user')
const request = require('request')
require('dotenv').config()
const bcrypt = require('bcrypt')

//Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get one user
router.get('/:id', (req, res) => {
})

// Create one user
router.post('/', async (req, res) => {

    password = await bcrypt.hash(req.body.password, 2, async (err, hash) => {
        if (err) {
            res.json({message: err, test: "hi"})
        }        
        const user = new User({
            name: req.body.name,
            stocks: req.body.stocks,
            username: req.body.username,
            password: hash
        })
        try {
            const newUser = await user.save()
            res.status(201).json(newUser)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    })

})

// Update one user
router.put('/:id', (req, res) => {
})

// Delete one user
router.delete('/:id', (req, res) => {
})

router.get('/:id/stocks' , async (req, res) => {
    request(`https://fcsapi.com/api-v2/stock/latest?symbol=SHOP&access_key=${process.env.FCSAPIKEY}` , (error, response, body) => {
        var obj = JSON.parse(body)
        res.json(obj.response)
    })
})



module.exports = router