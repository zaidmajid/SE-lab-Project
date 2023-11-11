import mongoose from "mongoose";
mongoose.set('strictQuery', true);
import colors from "colors";
//const mongoUri = "mongodb+srv://Mahhnoor:Mahhnooralee11@cluster0.x0zv0dm.mongodb.net/Petrolium";


const connectToMongo = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/Petrolium', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', (err) => {
        console.log('Failed to connect with db')
    });
    db.once('open', () => {
        console.log('Connected with db')
    });
    
}


export default connectToMongo;