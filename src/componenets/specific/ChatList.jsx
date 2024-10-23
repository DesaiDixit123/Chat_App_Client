/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handeleDeleteChat,
}) => {
  
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100vh"} bgcolor={"bisque"}>
      {chats?.map((data, index) => {
        const { _id, avatar, name, groupChat, members } = data;


        console.log("Chat data:", data);
        // console.log("onlineUsers:", onlineUsers);

        // console.log("chat id:",chatId)
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );
        // console.log("messageAlert:", newMessageAlert);
        const isOnline = members?.some((member) => onlineUsers.includes(_id));
        // console.log(isOnline);

        const isSameUser = chatId === _id;
        return (
          <ChatItem
            index={index}
            key={_id}
            _id={_id}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            groupChat={groupChat}
            sameSender={isSameUser}
            handeleDeleteChat={handeleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
