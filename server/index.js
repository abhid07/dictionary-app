import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dictionaryRoutes from './routes/dictionary.js'
import dotenv from 'dotenv'

const app = express();
dotenv.config()
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/dictionaryRoutes', dictionaryRoutes)


const PORT = process.env.PORT || 5000;
app.get("/",(req,res)=>{
    res.send("hello to dictionary app")
})
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT} port`)
    })
}).catch((err) => {
    console.log(err)
})


