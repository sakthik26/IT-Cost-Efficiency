const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user.model");
const UserRight = require("../models/userRight");
const Measures = require("../models/measure");
const Customer = require("../models/customer");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
//sign in
router.get("/current", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

router.post('/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // For the given username fetch user from DB
    // let mockedEmail = 'admin';
    // let mockedPassword = 'password';

    let user = await User.findOne({ email: email });
    let userRight = await UserRight.findOne({ userId: user.id });
    console.log('userright' + userRight)
    if (user) {



        bcrypt.compare(req.body.password, user.password, function (err, response) {
            if (err) {
                // handle error
                res.status(400).send("Email ID or the password doesn't match");
            }
            if (response) {
                // Send JWT
                let token = jwt.sign({ email: this.email }, config.get('myprivatekey'))
                //currently setting the customer id here - Admin portal to switch the customer

                res.header("x-access-token", token).send({
                    success: true,
                    message: 'Authentication successful!',
                    id: user.id,
                    customerId: userRight !== undefined && userRight !== null ? userRight.customerId : null,
                    token: token
                });
            } else {
                // response is OutgoingMessage object that server response http request
                res.status(400).send({ success: false, message: '"Email ID or the password doesnot match' });
            }
        });
    }
    else
        return res.status(400).send("User account not found!");
})

router.post("/", async (req, res) => {
    // validate the request body first
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //find an existing user
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    // user - user 
    // userrght.find({ userid }).then()


    const token = user.generateAuthToken();
    res.header("x-access-token", token).send({
        id: user._id,
        name: user.name,
        email: user.email,
        token: token
    });
});

module.exports = router;