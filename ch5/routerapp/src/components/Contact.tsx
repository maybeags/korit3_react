import ContactBusan from "./ContactBusan";
import { Routes, Route } from "react-router-dom";

export default function Contact() {
  
  return (
    <>
      <h3>Contact Component</h3>
      <Routes>
        <Route path="busan" element = { <ContactBusan />} />
      </Routes>
    </>
    
  );
}