import React  ,{useState }from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
function Update({set , mail , data,setData}) {

 
 
  const [q,setQ] = useState(data.data)
  
    const [mode ,setMode] = useState(1)
    const [ogdata , setOgdata] = useState(data.data)
    const update = ()=>{
        console.log(data)
        axios({
            method : 'post',
              url: 'http://localhost:8080/update',
            
              data : {
                  mail : mail,
                 data : q
                 }
    
          }).then((doc)=>{
          setData(doc.data);
          }).catch(()=>{
            let timerInterval;

            Swal.fire({
              title: 'data changed',
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
          })
    }
  return (
    <div className=  "form-container left">
     
    
        {/* {mode == 1? <>{ogdata} <button onClick = {setMode(1)}>edit</button></>:<><input value = {ogdata}></input><button onClick = {setMode(0)}>save</button></>} */}
       <br/>mail id: {data.mail}
       <br></br>
       your tagline :{q}
        <br/>username: {data.username}<br/>password:{data.password}
        <textarea value = {q} placeholder = "enter the new data to be saved" onChange ={(e)=>setQ(e.target.value)}></textarea><button onClick = {update}>update</button>
    </div>
  )
}

export default Update