const mongoose = require('mongoose')
require('dotenv').config()

module.exports = connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('DB Conectada')
        
    } catch (error) {
        console.log('Db connection error', error)
        process.exit();
    }
}