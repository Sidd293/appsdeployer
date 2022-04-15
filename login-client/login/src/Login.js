import React ,{useState,useEffect} from 'react'
import './App.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Update from './Update';
function Login({set,setM,setData,data}) {
  const [log , setLog] = useState(false)
    var p =0;
const [dat,setDat] = useState({});


    const [mail, setMail] = useState("");
    const [password,setPassword] = useState('');

    const register = ()=>{
        if(mail.length <=0){
         }
        else{
        axios({
          method : 'post',
            url: 'http://localhost:8080/sendotp',
            
            data : {
                mail : mail
            }

        })
        setM(mail);    
        set(2)

        }
    }
    const login = ()=>{
       setM(mail)
       axios({
        method : 'post',
          url: 'http://localhost:8080/login',
        
          data : {
              mail : mail,
              password : password,
             }

      }).then(doc=> {
          console.log(doc);
         
       
        // setData(doc.data);
 
    if(doc  == null)
    {
    
    }
    else 
    {
        setDat(doc.data);
        setLog(true)
  
    console.log("logged in")
    
        
    }

    }).catch(err=>{
        let timerInterval;

        Swal.fire({
          title: 'Your password is wrong or you are not registered',
          html: 'I will close in <b></b> milliseconds.',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
       

      }
        
        
        );
       
    }


 return ( 
    <div className=  "form-container">
        {!log?<>login
<textarea placeholder='email id' onChange = {e=>setMail(e.target.value)}></textarea>
<textarea placeholder='password'  onChange = {e=>setPassword(e.target.value)}></textarea>
<div className='btn-container'><button onClick={register}>register</button><button onClick={login}>login</button></div>
 </> :<Update  set = {set} mail = {mail}  data = {dat} setData = {setData}/>}
 </div>
  )
}

export default Login