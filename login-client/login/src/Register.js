import React , {useState} from 'react'
import axios, { Axios } from 'axios'
import Swal from 'sweetalert2'
export default function Register({set,mail}) {
    const [otp , setOtp ] = useState("")
    const [username ,setUsername] = useState("")
    const [data ,setData]  = useState("")
    const [password , setPassword] = useState("");

const register = ()=>{

    if(password.length <=2 || username.length == 0 || data.length == 0 )
{
    let timerInterval
Swal.fire({
  title: 'invalid data entered',
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
}else 
{

    axios({
        method : 'post',
          url: 'http://localhost:8080/register',
        
          data : {
              mail : mail,
              otp  : otp ,
              data : data , 
              password : password,
              username : username,
          }

      }).then((doc)=>{
          console.log(doc);
          console.log(mail);
          if(doc.data == "wrong") {
            let timerInterval
            Swal.fire({
              title: 'Wrong otp typed',
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
        else{ set(1)
        
        }
        }).catch((err) =>{
          console.log(err);
      })

}
}

  return (
    <div className=  "form-container">Register
    <textarea placeholder='otp'  onChange = {e=>setOtp(e.target.value)}></textarea>
    <textarea placeholder='Username'  onChange = {e=>setUsername(e.target.value)}></textarea>
    <textarea placeholder='password'  onChange = {e=>setPassword(e.target.value)}></textarea>
    <textarea placeholder='Your tagline'  onChange = {e=>setData(e.target.value)}></textarea>
    <button onClick={register}>Register</button>
    </div>
  )
}
