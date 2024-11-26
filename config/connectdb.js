import mongoose from 'mongoose';

export function connectdb(){
    mongoose.connect('mongodb://127.0.0.1:27017/baochungst22a')
.then(() => console.log('Kết nối mongodb thành công!'))
.catch(err => console.error("Connection error:", err));
}
