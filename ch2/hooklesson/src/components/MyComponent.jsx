import React from 'react';
import AuthContext from "./AuthContext";

export default function MyComponent() {
  const authContext = React.useContext(AuthContext);

  return(
    <>
      <h1>안녕하세요, {authContext} 님</h1>
    </>
  );
}