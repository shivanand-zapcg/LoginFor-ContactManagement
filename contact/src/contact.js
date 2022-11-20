import React from 'react';
import { useState, useEffect} from "react";
import {useNavigate } from "react-router-dom";
import contact from "./Contact.css";



const Contact = ()=>{
    const navigate = useNavigate();
    const [contactName, setContactName] = useState("");
    const [contactId, setContactId] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");

    const DisplayAllContacts = async ()=>{
        navigate("/allContact");
    }
    const savecontact = async (e) =>{
        e.preventDefault();
       try{
        const myData = {
            "contactId":contactId,
            "contactName":contactName,
            "contactEmail":contactEmail,
            "contactNumber":contactNumber
        }
        const result = await fetch('http://localhost:8080/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(myData)
          })
          console.log(result.headers.get("Content-Type"))
          if(isJsonString(result)){
            console.log("TRUE")
          }else{
            console.log(result)
            console.log("FALSE")
          }
       }catch(err){
        console.error(err);
       }
       
    }
 
    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
   

    return(
        <div className='divforcontact'>
        <form onSubmit={DisplayAllContacts} > 
        <input type="submit" value="Display All Contact"></input>
        </form>
        <form onSubmit={savecontact}>
		<table className='tableforcontact'>
			<tr>
				<th>Contact ID</th>
				<td><input type="text" autoFocus="autofocus" onChange={e => setContactId(e.target.value)}/></td>
			</tr>
			<tr>
				<th>Contact Name</th>
				<td><input type="text"   onChange={e => setContactName(e.target.value)}/> </td>
			</tr>

			<tr>
				<th>Contact Email</th>
				<td><input type="text"  onChange={e => setContactEmail(e.target.value)}/></td>
			</tr>
			<tr>
				<th>Contact Number</th>
				<td><input type="text" pattern="[0-9]{10}" minLength={10} maxLength={10}  onChange={e => setContactNumber(e.target.value)}/></td>
                <small>Format:- 1234567890</small>
			</tr>

			<tr>
				<td align="center"><input type="submit" value="Save Contact"></input></td>
			</tr>
		</table>
	</form>
    </div>
    )
};
export default Contact;