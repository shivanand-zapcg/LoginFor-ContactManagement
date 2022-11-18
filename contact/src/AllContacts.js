import React from "react";
import { useState, useEffect ,useCallback} from "react";
// import { View } from "./View";
import allcontacts from './allcontacts.css';

const AllContacts = () => {
  const [allcontacts, setAllContacts] = useState();

  const fetchData = useCallback(
    async () => {
      const result = await fetch("http://localhost:8080/allContacts")
      const jsonResult = await result.json();
      setAllContacts(jsonResult);
      console.log(jsonResult);
    }
  )
  useEffect(() => {
    console.log("Helo")
    // fetch("http://localhost:8080/allContacts")
    // .then(response => response.json())
    // .then(json => setAllContacts(json))
    fetchData();
  },[]);

  async function actionDelete (id){
    console.log(id)
    const result = await fetch(`http://localhost:8080/delete/${id}`);
    if(result.status===200){
     console.log("data deleted")
    }else{
     console.log("data not deleted")
    }
    fetchData();
 }
  function action(query){
    console.log(query)
 }
 
  return (
   <div className="container">
    {
      
      <div>
      <table>
        <thead>
            <tr>
          <th>ContactId</th>
          <th>ContactName</th>
          <th>ContactEmail</th>
          <th>ContactNumber</th>
          <th>Actions</th>
          </tr>
        </thead>
       <tbody>
        {/* <View contacts={authors}/> */}
        {allcontacts &&
          allcontacts.map((contact) => (
            <tr key={contact.contactId}>
              <td>{contact.contactId}</td>
              <td>{contact.contactName}</td>
              <td>{contact.contactEmail}</td>
              <td>{contact.contactNumber}</td>
              <td>
                <input type="submit"  value="Edit" />
              </td>
              <td>
                <button onClick={()=> {actionDelete(`${contact.contactId}`)}}  >Delete</button>
              </td>
            </tr>
          ))
        }
       </tbody>
      </table>
      </div>
      
    }
   </div>
  );
};
export default AllContacts;
