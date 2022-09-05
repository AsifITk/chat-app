import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../slices/loginSlice";
import { ref, set } from "firebase/database";
import { database, auth } from "../firebase-config";

const provider = new GoogleAuthProvider();

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    let result = await signInWithPopup(auth, provider);
    // !write data to redux store

    const user = result.user;
    console.log(user);
    console.log(user.uid);
    let userData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      userid: user.uid
    };
    dispatch(login(userData));
    console.log(userData);
    let mail = user.email.split(".").join("_");

    // !write data to firebase
    async function writeUserData(userData, mail) {
      // const database = getDatabase();
      await set(ref(database, "users/" + mail), userData);
    }
    console.log(userData);
    await writeUserData(userData, mail);
    navigate("chatroom");
  };
  return (
    <div>
      {/* header */}
      {/* <div className="head">
        <h1 className="logo">ChatIN</h1>
        <h1 className="login-btn">
          <button>Login</button>
        </h1>
      </div> */}
      {/*header end
       */}
      {/* 

       body start */}
      <div className="main">
        <h1 className="intro">ChatIn</h1>
        <button onClick={loginWithGoogle} className="google-btn">
          Login With Google
        </button>
      </div>
      {/* body end */}
    </div>
  );
}

export default Login;
