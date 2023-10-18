const jwt = require('./jwt.js')
const SECRET_KEY = require('../config/secretKey.js')

//DON'T FORGET TO ALTER THE PAYLOAD DEPENDING ON THE TASK

async function createToken(user){
    const payload = {
        _id: user._id,
        username : user.username,
        email: user.email,
    }

    const token = await jwt.sign(payload,SECRET_KEY)           

    return token
}

module.exports = createToken