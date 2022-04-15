var express = require('express');
const mongoose= require('mongoose');
var nodemailer =  require('nodemailer')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express();
mongoose.connect('mongodb+srv://admin:pass123@cluster0.4py1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true 
})
app.use(cors())
app.use(bodyParser.urlencoded({
    extended : true,
}))
app.use(express.json());
app.use(bodyParser.json())



Schema = mongoose.Schema;
otp_schema = new Schema({
    otp : String,
    mail : String,
    },{
        timestamps :true,
    })
    userSchema = new Schema({
        username  : String,
        password : String , 
        mail : String ,
        data  : String,

    })

    var transporter  = nodemailer.createTransport({
        service  : "gmail",
        auth : {
            user : "siddharthabajpai.temp@gmail.com" ,
            pass : "sidd293@123"
        }
    })


app.post('/sendotp',(req,res)=>{
var otp_val  =Math.floor(999  + Math.random()*1000);
console.log(req.body)

Otp = mongoose.model("Otp", otp_schema);
d = new Otp({
    mail : req.body.mail,
    otp : otp_val,
})
Otp.findOne({mail:req.body.mail}).then((doc)=>{


if(doc!=null)
{ 
    console.log('to update');
    // Otp.updateOne({mail:req.body.mail},{otp:otp_val});
    Otp.updateOne({mail:req.body.mail},{otp : otp_val}).then(()=>{console.log("updated")}).catch(err=>{
        console.log(err);
    })

}
else 

{
 console.log("no update");
    d.save();
    transporter.sendMail({
        from : "siddharthabajpai.temp@gmail.com",
        to : req.body.mail,
        subject : "registration otp",
        text : "your registration otp is " + otp_val,
    })
}
res.send("mail sent")

}).catch((err)=>{

    res.send("mail not sent")

})
console.log(otp_val);
   
})

// otp , mail , data , password

app.post('/register',(req,res)=>{
    User = mongoose.model("User", userSchema);
    console.log(req.body);
    // console.log(res)
    User.findOne({mail:req.body.mail}).then((doc) => {
           if(doc==null)
           {
            Otp = mongoose.model("Otp", otp_schema);
      
            Otp.findOne({mail:req.body.mail}).then((doc)=>{
                
            //    var obj = JSON.parse(req.body);

        //   console.log(obj)
                if(doc.otp == req.body.otp) {
        var user = new User({
            mail: req.body.mail,
            password : req.body.password+"",
            data : req.body.data,
            username :req.body.username,
        })
        user.save();
        console.log("user registered");
        res.status(200).send("user registerd");
                }
                else res.send("wrong");
            })
           }
           else res.send("user is already registerd")
    })
  
    // Otp.findOne({"mail"})
})

// mail  password
app.post('/login', (req,res)=>{
   User = mongoose.model("User", userSchema);
   console.log(req.body);
   User.findOne({mail: req.body.mail}).then((doc)=>{
       if(doc == null) res.status(404).send("user not registered");
       else{ if(doc.password == req.body.password) res.send(doc)
   else res.status(404).send(Error(404))
    }
   }) 
})

// mail , data

app.post("/update" ,(req,res) =>{

   User = mongoose.model("User", userSchema);
    console.log(req.body)
   User.findOne({mail:req.body.mail}).then((doc)=>{
        User.updateOne({mail: req.body.mail},{data :  req.body.data}).then((doc)=>{
            res.send(doc)
        })
    })


})



app.listen(8080,()=>{
    console.log("server is running")
})


