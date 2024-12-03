const mongoose = require("mongoose");
require("dotenv").config(); // Nạp biến môi trường
const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        // Ket noi voi mongodb
        await mongoose.connect(
            "mongodb+srv://an100277:AeeReISLciRp5Aqf@binhan.awftk.mongodb.net/flutter_db?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("Connect successfully!!!");
    } catch (error) {
        console.log("Connect failure!!!", error);
        process.exit(1);
    }
};
module.exports = connectDB;