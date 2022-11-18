import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from './contact';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AllContacts from './AllContacts';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="allContact" element={<AllContacts />} />
      </Routes>
    </BrowserRouter>
);

reportWebVitals();
