const mongoose = require("mongoose");
require("dotenv").config(); // Nạp biến môi trường
const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        // Ket noi voi mongodb
        await mongoose.connect(
            "mongodb+srv://baochung_101124:Pbc19402400@fluttercluster.vavrq.mongodb.net/flutter_db?retryWrites=true&w=majority&appName=flutterCluster"
        );
        console.log("Connect successfully!!!");
    } catch (error) {
        console.log("Connect failure!!!", error);
        process.exit(1);
    }
};
module.exports = connectDB;