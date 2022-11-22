import React from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import './addUser.css'

function Adduser() {
const [username, setUsername] = useState("")
const [useremail, setUseremail] = useState("")
const [password, setPassword] = useState("")
const [userResponse, setUserResponse] = useState("")
const navigate = useNavigate();
    const saveuser = async(e)=>{
        e.preventDefault();
        if(username.length!==0 && useremail.length!==0 && password.length!==0){
         try{
            const myData = {
                "username":username,
                "email":useremail,
                "password":password,
            }
            const result =await fetch(`http://localhost:8080/adduser`, {
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(myData)
            })
            const output = await result.json();
            setUserResponse(output)
            console.log(output)
            setTimeout(() => {
                if(result.status===200){
                    navigate("/")
                }
            }, 2000);
         }catch(err){
            console.log(err)
         }
        }else{
            alert("Data Not Matching Requirement")
        }
    }
    const logout = ()=>{
        navigate("/")
    }
  return (
   <>
  <div> <button className="icon" onClick={logout}><BiLogOutCircle/></button></div>
  <div className='responseHeader'><h2>{userResponse}</h2></div>
   <form onSubmit={saveuser}>
		<table className='tableforuser'>
			<tr>
				<th>Username</th>
				<td><input type="text"  value={username} minLength={4} onChange={e => setUsername(e.target.value)}/> </td>
			</tr>
			<tr>
				<th>User Email</th>
				<td><input type="text" value={useremail} minLength={8} onChange={e => setUseremail(e.target.value)}/></td>
			</tr>
			<tr>
				<th>Password</th>
				<td><input type="text" value={password} minLength={8}  onChange={e => setPassword(e.target.value)}/></td>
			</tr>
			<tr>
				<td align="center"><input type="submit" value="Add User"></input></td>
			</tr>
		</table>
	</form>
   </>
  )
}

export default Adduser