import React from 'react';
import { useState, useRef,useEffect } from "react";


const Contact = ()=>{

    const [contactName, setContactName] = useState("");
    const [contactId, setContactId] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    const savecontact = async (e) =>{
        e.preventDefault();
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
    }

    return(
        <form onSubmit={savecontact}>
		<table>
			<tr>
				<th>Contact ID</th>
				<td><input type="text" value={contactName} autoFocus="autofocus"  onChange={e => setContactId(e.target.value)}/></td>
			</tr>
			<tr>
				<th>Contact Name</th>
				<td><input type="text"  onChange={e => setContactName(e.target.value)}/> </td>
			</tr>

			<tr>
				<th>Contact Email</th>
				<td><input type="text"  onChange={e => setContactEmail(e.target.value)}/></td>
			</tr>
			<tr>
				<th>Contact Number</th>
				<td><input type="text"  onChange={e => setContactNumber(e.target.value)}/></td>
			</tr>

			<tr>
				<td align="center"><input type="submit" value="Save Product"></input></td>
			</tr>
		</table>
	</form>
    )
};
export default Contact;