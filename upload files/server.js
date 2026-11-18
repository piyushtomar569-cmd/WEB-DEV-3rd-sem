import express from 'express';
import multer from 'multer';
const app = express();
app.use(express.static('public'));
const upload=multer({dest:'upload'});
app.post('/upload',upload.single('file'),(req,res)=>{
    console.log(req.file);
    res.send('file uploaded succesfully');
})
app.listen(3000,()=>{
    console.log('server is running on 3000');
})