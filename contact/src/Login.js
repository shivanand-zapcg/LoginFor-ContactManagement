import { useState, useRef,useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { CgProfile} from "react-icons/cg";
import Loginpage from "./Loginpage.css";
const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setAuth] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();
  
  const [authors, setAuthors] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8080/users')
      const jsonResult = await result.json()
      setAuthors(jsonResult)
    }
    fetchData()
  }, [])
  const myData={
    "username":username,
    "password":password
  }
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
   if(true){
    for(let x in authors){
        if (username === authors[x].username && password === authors[x].password) {
            localStorage.setItem("authenticated", true);
            navigate("/Contact");
            console.log(auth)
          }else{
            console.log("test")
            console.log(x)
            if(x==Object.keys(authors).length-1){
                setAuth(true)
                console.log("test")
            }else{
                continue;
            }
          }
       }
   }
  };

 
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
        <p style={auth ? { display: "block" } : { display: "none" }}>Invalid Credentials
        </p>
        <input id="submitbtn" type="submit" value="Submit" />
      </form>
    </div>
    </div>
  );
};

export default Login;
