import React from "react";
import { useEffect} from "react";



export const View = ({ contacts }) => {

    useEffect(() => {
       
      }, []);
    async function actionDelete (query){
       console.log(query)
       const result = await fetch(`http://localhost:8080/delete/${query}`);
       if(result.status===200){
        console.log("data deleted")
       }else{
        console.log("data not deleted")
       }
    }

  return contacts.map((contact) => (
    <tr key={contact.contactId}>
      <td>{contact.contactId}</td>
      <td>{contact.contactName}</td>
      <td>{contact.contactEmail}</td>
      <td>{contact.contactNumber}</td>
      <td>
        <input type="submit"  value="Edit" />
      </td>
      <td>
        <input type="submit" onClick={()=> {actionDelete(`${contact.contactId}`)}}  value="Delete" />
      </td>
    </tr>
  ));
};
