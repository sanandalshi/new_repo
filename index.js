const express=require('express');
const app=express();
app.set('view engine','ejs');
const bp=require('body-parser');
app.use(bp.urlencoded({extended:false}));
const multer=require('multer');

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"./uploads");
    },
filename:function(req,file,cb){
    cb(null,`${Date.now()}+${file.originalname}`);
}})


const upload=multer({storage});
app.use('/uploads', express.static('uploads'));
app.get('/',(req,res)=>{
    res.render('home');
})

app.post('/upload',upload.single("file"),(req,res)=>{
console.log(req.file);
console.log(req.body);
if(!req.file){
    res.redirect('/');
}else{
const path = `/uploads/${req.file.filename}`;
res.render('p', { name: path });
}
})


const port=process.env.PORT||8080;
app.listen(port,(a)=>{
    console.log('App is running on port 8080!');
})