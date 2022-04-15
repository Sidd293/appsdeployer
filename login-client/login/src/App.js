import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Register from './Register';
import Update from './Update';
import {useState, useEffect} from "react";
function App() {
  const [page,setPage] = useState(1);
  const [mail , setMail] = useState("");
  const [data , setData] = useState({});
  // 1 => LOGIN 2 => REGISTER 3=> UPDATE 
  return (
    <div className="App">
{page == 1 ? <Login set = {setPage} setM = {setMail}/> : page==2 ? <Register set = {setPage} mail = {mail} setData = {setData} data = {data} />:<Update  set = {setPage} mail = {mail}  data = {data} setData = {setData}/>}


  
    </div>
  );
}

export default App;
