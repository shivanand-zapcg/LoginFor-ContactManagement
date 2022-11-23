import axios from 'axios';
import { useState, useRef,useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { CgProfile} from "react-icons/cg";
import "./Loginpage.css";
const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setAuth] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();
  const [users, setUsers] = useState()
const getUsers = async ()=>{
  axios.post("http://localhost:8080/users").then((response) => setUsers(response.data))
  .then((result)=>console.log(result)) 
}

  useEffect(() => {
    // fetchToken()
    // set("shivanand", "12345678")
    getUsers()
  }, [])

  const set= async(user, pass)=>{
    const myData2 = {
      username:user,
      password:pass
  }
  
  const JWTToken= await  axios.post("http://localhost:8080/authenticate",myData2)
  localStorage.setItem("jwt", JWTToken.data)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   if(true){
    for(let x in users){
        if (username === users[x].username && password === users[x].password) {
          set(username, password);
            localStorage.setItem("authenticated", true);
            navigate("/Contact");
          }else{
            if(x==Object.keys(users).length-1){
                setAuth(true)
            }else{
                continue;
            }
          }
       }
   }
  };  
  function redirectToSaveContact(){
    navigate("/addUser")
  }
 
  return (
    <div className="main-div">
      <div className="welcomeh1"><h1>Welcome Back</h1></div>
      <div className="profileicon"><CgProfile/></div>
    <div className="welcomepage">
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text" name="Username" onChange={(e) => setusername(e.target.value)}
          placeholder="  Enter the username"
          ref={emailInput}
        />
        <label>Password</label>
        <input
          type="password" name="Password" onChange={(e) => setpassword(e.target.value)}
          placeholder="  Enter the password"
          ref={passwordInput}
        />
        <div id='check'><p style={auth ? { display: "block" } : { display: "none" }}>Invalid Credentials</p></div>
        <input className="submitbtn" type="submit" value="Sign IN" />
        <input className="submitbtn" value="Sign Up" onClick={redirectToSaveContact}></input>
      </form>
      
    </div>
    </div>
  );
};

export default Login;



  // const [jwt , setJwt] = useState("")
  //  const token = async ()=>{
  //   await fetch("http://localhost:9090/authenticate",{
  //     method: 'POST',
  //     headers :{
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(myData)
  //   }).then((response) => console.log(response))
  //   .then((result) => setJwt(result))
  //   console.log(jwt)
  //  }
  // axios.interceptors.request.use(
  //   config => {
  //     config.headers.authorization = `Bearer ${jwtToken}`;
  //     return config;
  //   },
  //   error => {
  //     return Promise.reject(error)
  //   }
  // )
  // axios.post("http://localhost:8080/users").then((response) => setUsers(response.data))
  // .catch(err => console.log(err))

        // const result = await fetch('http://localhost:8080/users',{
      //   method:'POST'
      // })
      // const jsonResult = await result.json()
      // setUsers(jsonResult)

    // const fetchToken = async () => {
    //   const myData2 = {
    //     username:"shivanand",
    //     password:"12345678"
    // }
    
    //   const JWTToken = await  axios.post("http://localhost:8080/authenticate",myData2)
    //   .then((response) => console.log(response.data))
    //   .catch(err => console.log(err))
    // }

      // axios.interceptors.request.use(
  //   config => {
  //     config.headers.authorization = `Bearer ${jwtToken}`;
  //     return config;
  //   },
  //   error => {
  //     return Promise.reject(error)
  //   }
  // );