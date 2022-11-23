import React from "react";
import { useState, useEffect ,useCallback} from "react";
import { useNavigate } from "react-router-dom";
// import { View } from "./View";
import {Navigate } from "react-router-dom";
import { BiLogOutCircle} from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import './allcontacts.css';

const AllContacts = () => {
  const navigate = useNavigate();
  const [allcontacts, setAllContacts] = useState();
  const [contactName, setContactName] = useState("");
  const [contactId, setContactId] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated")
  );

  const fetchData = 
    async () => {
      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${localStorage.getItem("jwt")}`;
          return config;
        },
        error => {
          return Promise.reject(error)
        }
      );
     
      axios.get("http://localhost:8080/allContacts").then((response) => setAllContacts(response.data))

    }
  useEffect(() => {
    fetchData();
  },[]);

  async function actionDelete (id){
    axios.interceptors.request.use(
      config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("jwt")}`;
        return config;
      },
      error => {
        return Promise.reject(error)
      }
    );
      const deleting = await  axios.delete(`http://localhost:8080/delete/${id}`)
       .then((response) => console.log(response.data))
     .catch(err => console.log(err))
     fetchData()
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
  let price = document.getElementById("emailtag");
  let category = document.getElementById("cattag");
  id.value = id2;
  title.value = name;
  price.value = email;
  category.value = number;
  // let save = document.querySelector("#savebtn"); //SAVE button
  // save.style.display="block"

    let closebtn = document.getElementById("close"); //close button
    closebtn.addEventListener("click", () => {
      let div = document.getElementById("popup");
      div.style.display = "none";
      let maindiv = document.querySelector(".main-pop");
      maindiv.style.display = "none";
      let bodydiv = document.querySelector("body");
      bodydiv.style.backgroundColor ='black';
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
    bodydiv.style.backgroundColor ='black';
    let save = document.getElementById("savebtn");
    save.style.display = "none";
    
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
      const deleting = await  axios.post(`http://localhost:8080/edit`, myData)
       .then((response) => console.log(response.data))
     .catch(err => console.log(err))
     fetchData();
    }

    function redirectToSaveContact(){
      navigate("/Contact")
}
const logout = ()=>{
  localStorage.removeItem("authenticated");
  localStorage.removeItem("jwt");
  navigate("/")
}
if(!authenticated){
  return <Navigate replace to="/" />;
}else{
  return (
    <div className="container">
    <button className="icon" onClick={logout}><BiLogOutCircle/></button>
     {
       <>
        <input type ="submit" id="addconbtn" value="+ add new contact" onClick={redirectToSaveContact}></input>
       
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
                 <input type="submit"  value="Edit" onClick={()=>{handleEdit(contact.contactId, contact.contactName, contact.contactEmail,contact.contactNumber)}} />
               </td>
               <td>
                 <button style={{color: "red", fontSize: "15px"}} onClick={()=> {actionDelete(`${contact.contactId}`)}}  ><AiFillDelete/></button>
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
         <input id="titletag" type="text" placeholder="Name" minLength={4} pattern="[a-z][A-Z]" onChange={(e)=> setContactName(e.target.value)}/>
         <input id="emailtag" type="text" placeholder="Email" minLength={8} onChange={(e)=> setContactEmail(e.target.value)}/>
         <input id="cattag" type="text" pattern="[0-9]{10}"  maxLength={10} placeholder="Number" onChange={(e)=> setContactNumber(e.target.value)} />
         <button id="close">&times;</button>
         <br />
         <button type="submit" id="savebtn" onClick={() =>{editdata()}}>SAVE</button>
       </div>
     </div>
     
       </>
     }
    </div>
   );
  }
};
export default AllContacts;

// const result = await fetch(`http://localhost:8080/delete/${id}`,{
  // method: 'DELETE'
  
  // });
  // if(result.status===200){
    //  console.log("data deleted")
    // }else{
      //  console.log("data not deleted")
      // }


      //   const result = await fetch('http://localhost:8080/edit', {
      //     method: 'POST',
      //     headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(myData)
      // })

            // const result = await fetch("http://localhost:8080/allContacts")
      // const jsonResult = await result.json();
      // setAllContacts(jsonResult);
      // console.log(jsonResult);