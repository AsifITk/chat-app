import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { database } from "../firebase-config";
import { getDatabase, ref, onValue, set } from "firebase/database";
import styles from "./Room.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { async } from "@firebase/util";

function Room() {
  let { id } = useParams();
  let [roomData, setroomData] = useState(null);
  let text = useRef();
  let currUser = useRef(JSON.parse(localStorage.getItem("currentUser")).email);

  let getChats = async () => {
    // !Get data from firebase

    const starCountRef = ref(database, "rooms/" + id);
    await onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();

      console.log(data);
      await setroomData(() => data);
      console.log(roomData);

    });

    // !write data to redux store
    // !write data to firebase
  };

  let sendMessage = async (data) => {
    let currUser = JSON.parse(localStorage.getItem("currentUser")).email;

    await set(ref(database, "rooms/" + id + "/chats/" + Date.now()), {
      sentby: currUser,
      message: text.current.value,
      time: Date.now(),
    });
    text.current.value = "";

  };

  useEffect(() => {
    getChats();
  }, []);

  if (roomData == null) {
    return <h1>Loading!!</h1>;
  }

  return (
    <div className={styles.room}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.head}>
            {currUser.current} <span>X</span>
          </div>

          <div className={styles.today}>
            <span className={styles.line}></span> TODAY{" "}
            <span className={styles.line}></span>
          </div>
          <div className={styles.messages}>
            {roomData.chats ? Object.keys(roomData.chats).map((key) => {
              // console.log(roomData.chats[key].sentby)
              // console.log(currUser)

              if (roomData.chats[key].sentby == currUser.current) {
                return (<div key={roomData.chats[key].time} className={styles.right}>
                  <div className={styles.msg}>
                    {roomData.chats[key].message}
                  </div>
                  <div className={styles.time}>{new Date(roomData.chats[key].time).toLocaleTimeString()}</div>
                </div>)

              }
              else {
                return (<div key={roomData.chats[key].time} className={styles.left}>
                  <div className={styles.msg}>
                    {roomData.chats[key].message}
                  </div>
                  <div className={styles.time}>{new Date(roomData.chats[key].time).toLocaleTimeString()}</div>
                </div>)
              }


            }) : <h1>nothing</h1>}
          </div>
          {/* //!Send message */}
          <div className={styles.input}>
            <span>
              <input type="text" ref={text} className={styles.inputBtn} />
            </span>
            <span>
              <button onClick={() => sendMessage(text.current.value)}>
                SEND
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
