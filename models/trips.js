import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

 const Schema = mongoose.Schema;
 const AutoIncrement = AutoIncrementFactory(mongoose);

const tripSchema = new Schema({
    customerName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        get: (v) => v ? v.toLocaleDateString('vi-VN') : '', 
    },    
    time: {
        type: String,
        required: true,
    },
    placeCity:{
         type: String,
         required: true,
    }, 
    image:{
        type:String,
        required: false,
    }   
    
 }); 


// Thêm id tự động tăng vào schema
tripSchema.plugin(AutoIncrement, { inc_field: 'id' }); // Chỉ định trường 'id' tự động tăng

// Tạo model 'Book' từ schema
const Trip = mongoose.model('my_trips', tripSchema);

export default Trip;
