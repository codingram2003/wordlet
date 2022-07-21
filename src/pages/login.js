import React, { useState } from "react";
import Axios from "axios";
import "./styles.css";
import Wordle from './wordle'


function Login() {

  
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [luserName, setLuserName] = useState('');
  const [lpassword, setLpassword] = useState('');
  const [loginstatus, setLoginstatus]= useState('');
  const [registerstatus, setRegisterstatus]= useState('');
  const [loggedIn, setLoggedIn]= useState(false);
  const [Pscore, setPscore]= useState('');
  const [attempt, setAttempt]= useState('');
  
  const registerUser=()=>{
    Axios.post('https://wordle-123.herokuapp.com/api/register', {userName:userName, password:password}).then((response)=>{
      setRegisterstatus(response.data.message)
      
    })
  };
  const login=()=>{
    Axios.post('https://wordle-123.herokuapp.com/api/login', {luserName:luserName, lpassword:lpassword}).then((response)=>{
      if (response.data.message){
        setLoginstatus(response.data.message)
      } else{
        setLoginstatus(response.data[0].userName)
        setPscore(response.data[0].A_1)
        setAttempt(response.data[0].A_2)
        setLoggedIn(true);
      }
      console.log(response)
    });
  };

  

  return (

    <div>
      {loggedIn ? <Wordle user={loginstatus} pscore={Pscore} attempt={attempt}/> : <div >
        <div className="register"><h1>REGISTER</h1>
      <label id="username">Username:</label>
      <input type="text" id="uname"name="userName" placeholder="New username" onChange={(e) => { setUserName(e.target.value); } } /><br/><br/><br/>
      
      <label id="password">Password:</label>
      <input type="text" id="pass" name="password" placeholder="New password" onChange={(e) => { setPassword(e.target.value); } } /><br/><br/>

      <button onClick={registerUser}>Submit</button>
      
      <h1>{registerstatus}</h1>
      </div>
      
      





      <div className="login">
      <h1>Login</h1><br/>
      <label>Username:</label>
      <input type="text" name="luserName" placeholder="Enter your username" onChange={(e) => { setLuserName(e.target.value); } } /><br/><br/><br/>
      <label>Password:</label>
      <input type="text" name="lpassword" placeholder="Enter your password" onChange={(e) => { setLpassword(e.target.value); } } /><br/><br/>

      <button onClick={login}>Submit</button>


      <h1>{loginstatus}</h1>
      </div>

    </div>}
    </div>
    
   
  )};

  
  

export default Login;