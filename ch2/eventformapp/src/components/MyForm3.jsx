import { useState } from "react";


export default function MyForm3() {
  const [ user, setUser ] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = event => {
    alert(`안녕하세요, ${user.firstName} ${user.lastName}. Email 주소는 ${user.email}입니다.`);
    event.prevetDefault();
  }


  const handleChange = event => {
    setUser( {...user, [event.target.name]: event.target.value} )
  }
  

  return(
    <form onSubmit={handleSubmit}>
      <label>First Name </label>
      <input type="text" name="firstName" value={user.firstName} onChange={handleChange}/> <br /><br />

      <label>Last Name </label>
      <input type="text" name="lastName" value={user.lastName} onChange={handleChange}/> <br /><br />

      <label>Email </label>
      <input type="email" name="email" value={user.email} onChange={handleChange}/> <br /><br />

      <input type="submit" value="제출" />
    </form>
  );
}