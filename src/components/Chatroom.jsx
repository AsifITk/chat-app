import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ref, push, set, onValue, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

import { addChatroom } from "../slices/ChatroomSlice";

import { database } from "../firebase-config";
import { async } from "@firebase/util";

function Chatroom() {
  let currUser = JSON.parse(localStorage.getItem("currentUser")).email;

  let navigate = useNavigate();
  let chatrooms = useSelector((state) => state.chatRooms.chatrooms);
  console.log(chatrooms);
  const dispatch = useDispatch();

  //!get all the room
  useEffect(() => {
    let arr = [];
    const dbRef = ref(database, "rooms/");
    onValue(dbRef, (snapshot) => {
      arr = [];
      snapshot.forEach((childSnapshot) => {
        let arr2 = [];
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childData, childKey);
        arr2.push(childKey);
        arr2.push(childData);
        arr.push(arr2);
      });

      dispatch(addChatroom(arr));
    });
  }, []);

  // !make the room
  const email = useSelector((state) => state.loginInfo.user.email);
  // const rooms = useSelector((state) => state.chatRooms);
  let roomInput = useRef(null);
  // !delete a room

  let deleteRoom = async (room) => {

    const roomRef = ref(database, "rooms/" + room);
    await remove(roomRef);



  }

  // !push the room to firebase
  async function writeNewPost() {


    let currUser = JSON.parse(localStorage.getItem("currentUser")).email;

    const postData = {
      admin: currUser,
      // name: roomInput.current.value, 
      chats: {
        // 0: {
        //   sentby: "test@assas.com",
        //   message: "This assa test message",
        //   time: Date.now()
        // }
      }
    };

    //! A post entry.
    const postListRef = ref(database, "rooms/" + roomInput.current.value);
    // const newPostRef = push(postListRef);
    await set(postListRef, postData);
    roomInput.current.value = "";
  }

  return (
    <div className="room-container">
      <h1>Enter A Room Name</h1>
      <input
        className="room-input"
        ref={roomInput}
        type="text"
        onKeyPress={(e) => e.key === "Enter" && writeNewPost()}
      />
      {chatrooms.map((chatroom) => {
        console.log(chatroom[1].admin);
        console.log(currUser)
        if (chatroom[1].admin == currUser) {

          return (
            <>
              <div
                key={chatroom[0]}
                className="card"
                onClick={(e) => {
                  navigate(`/chatroom/${chatroom[0]}`);
                }}
              >
                <h1>{chatroom[0]}</h1>
                <h2>{chatroom[1].admin}</h2>
                <button onClick={(e) => {

                  deleteRoom(chatroom[0])
                  e.stopPropagation();
                }}>X</button>
              </div>
            </>
          );
        } else {
          return (<div
            key={chatroom[0]}
            className="card"
            onClick={(e) => {
              navigate(`/chatroom/${chatroom[0]}`);
            }}
          >
            <h1>{chatroom[0]}</h1>
            <h2>{chatroom[1].admin}</h2>

          </div>
          )
        }


      }


      )}
    </div>
  );
}

export default Chatroom;
