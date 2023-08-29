import mongoose from 'mongoose';
export const connectDb = async () => {
  try{
    const DB="mongodb://127.0.0.1:27017/pms"
       //const DB ="mongodb+srv://felexonyango19:8NOwJ6ZGbO4nz5JY@cluster0.gmrvpty.mongodb.net/myFirstDatabase?retryWrites=true"
    await mongoose.connect(DB,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify:false,
        
       
    })
    console.log(`MongoDB Connected `)
} catch (error) {
  console.error(error )
        process.exit(1)
}
};

