import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";



function Header() {
  let currUser = JSON.parse(localStorage.getItem("currentUser"));

  let navigate = useNavigate();
  let logout = async () => {
    localStorage.clear();
    const auth = getAuth();
    await signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    navigate(`/`);


  }





  return (
    <div className="head">
      <h1 className="logo">ChatIN</h1>
      {
        currUser ? (<h1 className="login-btn">
          <button onClick={() => logout()}>Logout</button>
        </h1>) : (<h1 className="login-btn">
          <button>Login</button>
        </h1>)
      }

    </div>
  );
}

export default Header;
