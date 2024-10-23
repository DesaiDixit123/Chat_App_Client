/* eslint-disable react-hooks/exhaustive-deps */
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { grayColor, orange } from "../componenets/constants/color";
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, STOP_TYPING, STRAT_TYPING } from "../componenets/constants/event";
import FileMenu from "../componenets/dialogs/FileMenu";
import AppLayout from "../componenets/Layouts/AppLayout";
import MessageComponent from "../componenets/shared/MessageComponent";
import { InputBox } from "../componenets/styles/StylesComponent";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { getSocket } from "../socket";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/mis";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../componenets/Layouts/Loaders";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const containerref = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();
const navigate =useNavigate()
  const bottomRef=useRef(null)
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping,setIamTyping]=useState(false)
  const [userTyping,setUserTyping]=useState(false)
  const tipingTimeout = useRef(null)

  


  console.log(userTyping)

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerref,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    // console.log("members",members)
    if (!IamTyping) {
      

    socket.emit(STRAT_TYPING, { members, chatId });

      setIamTyping(true)
    }

    if(tipingTimeout.current) clearTimeout(tipingTimeout.current)
      tipingTimeout.current= setTimeout(() => {
      socket.emit(STOP_TYPING,{members,chatId})
      setIamTyping(false)
    }, [2000]);
  };
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;
    // console.log("member: ", members);
    socket.emit(NEW_MESSAGE, { chatId, members, message });

    setMessage("");
  };

  useEffect(() => {

    socket.emit(CHAT_JOINED,{userId:user._id,members})
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED,{userId:user._id,members})
    };
  }, [chatId]);

  useEffect(() => {
    if(bottomRef.current) bottomRef.current.scrollIntoView({behavior:"smooth"})
  }, [messages])
  

useEffect(() => {
  
 if(!chatDetails.data?.chat)  return  navigate("/")
}, [chatDetails.data]);


  const newMessagesHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true)
    },
    [chatId]
  );
  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;


      setUserTyping(false)
    },
    [chatId]
  );
  const alertListener = useCallback((content) => {
    (data) => {
      
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content:data.message,
      
        sender: {
          _id: "drasfgjsduidfteydvdhgdefydwgh",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
  
      setMessage((prev)=>[...prev,messageForAlert])
    }
  },[chatId])

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesHandler,
    [STRAT_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);
  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  // Scroll to the bottom when the message list changes
  useEffect(() => {
    if (containerref.current) {
      containerref.current.scrollTo({
        top: containerref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [allMessages]);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerref}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
          {
            userTyping && <TypingLoader/>
          }
          <div ref={bottomRef} />
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
