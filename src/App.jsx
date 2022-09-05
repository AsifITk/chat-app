import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Chatroom from "./components/Chatroom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./slices/loginSlice";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const auth = getAuth();

function App() {
  const value = useSelector((state) => state.loginInfo);
  console.log(value);
  // const dispatch = useDispatch({ type: "login", payload: userData });
  return (
    <div className="App">
      <h1>heading</h1>
    </div>
  );
}

export default App;

{
  /* <button onClick={(e) => dispatch(toggleTheme())}> Toggle</button> */
}
