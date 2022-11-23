import React from 'react';
import { useState} from "react";
import {useNavigate, Navigate } from "react-router-dom";
import "./Contact.css";
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios'

const Contact = ()=>{
    const navigate = useNavigate();
    const [contactName, setContactName] = useState("");
    const [contactId, setContactId] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [contactResponse, setContactResponse] = useState("")
    const [authenticated, setauthenticated] = useState(
        localStorage.getItem("authenticated")
      );

    const DisplayAllContacts = async ()=>{
        navigate("/allContact");
    }
    const savecontact = async (e) =>{
        e.preventDefault();
       if(contactId.length!==0 &&contactName.length!==0 &&contactEmail.length!==0 &&contactNumber.length!==0) {
        try{
          const myData = {
            "contactId":contactId,
            "contactName":contactName,
            "contactEmail":contactEmail,
            "contactNumber":contactNumber
        }
        axios.interceptors.request.use(
          config => {
            config.headers.authorization = `Bearer ${localStorage.getItem("jwt")}`;
            return config;
          },
          error => {
            return Promise.reject(error)
          }
        );
          const saving = await  axios.post("http://localhost:8080/save",myData)
           .then((response) => setContactResponse(response.data))
         .catch(err => console.log(err))

           }catch(err){
            console.error(err);
           }
           setContactNumber("")
           setContactEmail("")
           setContactId("")
           setContactName("")
           console.log(contactResponse)    
           setTimeout(() => {
            setContactResponse("")
           }, 5000);
       }else{
        alert("data is not matching requirement")
       }
       
    }
    const logout = ()=>{
        localStorage.removeItem("authenticated");
        localStorage.removeItem("jwt");
        navigate("/")
    }
  if(!authenticated){
    return <Navigate replace to="/" />;
  }else{
    return(
        <div className='divforcontact'>
         <button className="icon" onClick={logout}><BiLogOutCircle/></button>
        <form onSubmit={DisplayAllContacts} > 
        <input type="submit" value="Display All Contact" className='allcontactinput'></input>
        </form>
        <div className='responseHeader'>
        <h2>{contactResponse}</h2>
        </div>
        <form onSubmit={savecontact}>
		<table className='tableforcontact'>
			<tr>
				<th>Contact ID</th>
				<td><input type="text" pattern='[0-9]' autoFocus="autofocus" minLength={1} placeholder="Enter Numbers Only" value={contactId} onChange={e => setContactId(e.target.value)}/></td>
			</tr>
			<tr>
				<th>Contact Name</th>
				<td><input type="text"  value={contactName} minLength={5} placeholder="Minimum 5 characters" onChange={e => setContactName(e.target.value)}/> </td>
			</tr>

			<tr>
				<th>Contact Email</th>
				<td><input type="text" value={contactEmail} minLength={8} placeholder="Minimum 8 characters" onChange={e => setContactEmail(e.target.value)}/></td>
			</tr>
			<tr>
				<th>Contact Number</th>
				<td><input type="text" value={contactNumber} pattern="[0-9]{10}"  maxLength={10}  onChange={e => setContactNumber(e.target.value)}/></td>
                <small>Format:- 1234567890</small>
			</tr>

			<tr>
				<td align="center"><input type="submit" value="Save Contact"></input></td>
			</tr>
		</table>
	</form>
    </div>
    )
  }
};
export default Contact;
            // const myData = {
            //     "contactId":contactId,
            //     "contactName":contactName,
            //     "contactEmail":contactEmail,
            //     "contactNumber":contactNumber
            // }
            // const result = await fetch('http://localhost:8080/save', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(myData)
            //   })
            //   const output = await result.json();
            //   setContactResponse(output)
            //   console.log(output)