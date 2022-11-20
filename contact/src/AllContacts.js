import React from "react";
import { useState, useEffect ,useCallback} from "react";
import { useNavigate } from "react-router-dom";
// import { View } from "./View";
import allcontacts from './allcontacts.css';

const AllContacts = () => {
  const navigate = useNavigate();
  const [allcontacts, setAllContacts] = useState();
  const [edit, setEdit] = useState("Edit")
  const [contactName, setContactName] = useState("");
  const [contactId, setContactId] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

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
 const handleEdit = async(id2, name, email, number)=>{
  setContactId(id2)
  setContactName(name)
  setContactEmail(email)
  setContactNumber(number)
  let div = document.getElementById("popup");
  div.style.display = "block";
  let maindiv = document.querySelector(".main-pop");
  maindiv.style.display = "block";
  let bodydiv = document.querySelector("body");
  bodydiv.style.backgroundColor =
    "rgb(" + 0 + "," + 0 + "," + 0 + "," + 0.4 + ")";

    let id = document.getElementById("idtag");
    let title = document.getElementById("titletag");
    title.focus();
    let price = document.getElementById("pricetag");
    let category = document.getElementById("cattag");
    id.value = id2;
    title.value = name;
    price.value = email;
    category.value = number;
    let save = document.querySelector("#savebtn"); //SAVE button
    save.style.display="block"
    // save.addEventListener("click", ()=> {
    // });
    let closebtn = document.getElementById("close"); //close button
    closebtn.addEventListener("click", () => {
      let div = document.getElementById("popup");
      div.style.display = "none";
      let maindiv = document.querySelector(".main-pop");
      maindiv.style.display = "none";
      let bodydiv = document.querySelector("body");
      bodydiv.style.backgroundColor =
        "rgb(" + 0 + "," + 0 + "," + 0 + "," + 0 + ")";
      let save = document.getElementById("savebtn");
      save.style.display = "block";
    });
 }
const editdata = async()=>{
  let div = document.getElementById("popup");
  div.style.display = "none";
  let maindiv = document.querySelector(".main-pop");
  maindiv.style.display = "none";
  let bodydiv = document.querySelector("body");
  bodydiv.style.backgroundColor =
    "rgb(" + 0 + "," + 0 + "," + 0 + "," + 0 + ")";
  let save = document.getElementById("savebtn");
  save.style.display = "none";

  const myData = {
    "contactId":contactId,
    "contactName":contactName,
    "contactEmail":contactEmail,
    "contactNumber":contactNumber
}
const result = await fetch('http://localhost:8080/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(myData)
  })
  console.log(result.headers.get("Content-Type"))
  if(result.status==200){
    console.log("TRUE")
  }else{
    console.log(result)
    console.log("FALSE")
  }
  fetchData();
}
 
 function redirectToSaveContact(){
  navigate("/Contact")
}
  return (
   <div className="container">
    {
      <>
       <input type ="submit" value="+ add new contact" onClick={redirectToSaveContact}></input>
      
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
                <input type="submit"  value={edit} onClick={()=>{handleEdit(contact.contactId, contact.contactName, contact.contactEmail,contact.contactNumber)}} />
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
      <div className="main-pop">
      <div id="popup">
        <input id="idtag" type="text" placeholder="id" readOnly={true} onChange={(e)=> setContactId(e.target.value)}/>
        <input id="titletag" type="text" placeholder="Name" onChange={(e)=> setContactName(e.target.value)}/>
        <input id="pricetag" type="text" placeholder="Email" onChange={(e)=> setContactEmail(e.target.value)}/>
        <input id="cattag" type="text" placeholder="Number" onChange={(e)=> setContactNumber(e.target.value)} />
        <button id="close">&times;</button>
        <br />
        <button type="submit" id="savebtn" onClick={() =>{editdata()}}>SAVE</button>
      </div>
    </div>
    
      </>
    }
   </div>
  );
};
export default AllContacts;
