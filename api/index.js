import express from "express";
import postRoute from "./routes/posts.js"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import cookieParser from "cookie-parser";
import multer from "multer"



const app = express();
app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "../study/public/upload");
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname);
    },
})


const upload = multer({ storage})
app.post('/api/upload', upload.single('file'), function(req, res){
    const file = req.file;
    res.status(200).json(file.filename)
}) 

app.listen(8800, ()=>{
    console.log("Connected")
})

app.use("/api/auth", authRoute) 
app.use("/api/users", userRoute) 
app.use("/api/posts", postRoute)

