const router = require('express').Router();
const { User } = require('./../models')
const {OAuth2Client} = require('google-auth-library')


const client = new OAuth2Client(process.env.CLIENT_ID);



// find user by token
router.get("/login", (req, res) => {
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userId = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];

        // Fetch the user by id 
        User.findByPk(userId)
        .then(oneUser=>{
            if(!oneUser) {
            res.status(404).json({msg: `This user does not exist!`});
            } else {
                res.status(200).json(oneUser);
            }
        }).catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
      }
      verify().catch(console.error);
});

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
            res.status(404).json({msg: `This user does not exist!`});
            } else {
                res.status(200).json(oneUser);
            }
        }).catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
});

// create new user
router.post('/login', (req,res) => {
    User.create({
        email: req.body.email,
        familyName: req.body.familyName,
        givenName: req.body.givenName,
        googleId: req.body.googleId,
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        isAdmin: req.body.isAdmin,
    })
        .then(newUser=>{
            res.status(200).json(newUser);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
});

// update user
router.put('/:id', (req,res) => {
    User.update({
        email: req.body.email,
        familyName: req.body.familyName,
        givenName: req.body.givenName,
        googleId: req.body.googleId,
        imageUrl: req.body.imageUrl,
        name: req.body.name
    },{
        where: ({
            googleId: req.params.id
        })
    })
        .then(updateUser => {
            if (!updateUser[0]) {
                res.status(404).json("This user does not exist!");
            } else {
                res.status(200).json(updateUser);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// delete user
router.delete('/:id', (req,res) => {
    User.destroy({
        where: ({
            googleId: req.params.id
        })
    })
        .then(delUser => {
            if (delUser === 0) {
                res.status(404).json("This user has already been deleted or does not exist")
            } else {
                res.status(200).json(delUser);
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
});

module.exports = router;