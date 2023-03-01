const router = require('express').Router();

const { User } = require('./../models')

// find all users
router.get('/', (req, res) => {
    User.findAll()
        .then ((user) => {
        res.json(user)
        })
        .catch((err)=> {
        console.log(err);
        res.status(500).json({msg: err})
        })
});

// find one user by id
router.get('/:id', (req,res) => {
    User.findByPk(req.params.id)
        .then(oneUser=>{
            if(!oneUser) {
            res.status(404).json({msg: `This user does not exist!`})
            }
            res.json(oneUser)
        }).catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
});

// create new user

// update user

// delete user

module.exports = router;