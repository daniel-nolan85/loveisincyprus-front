import React, { useState, createContext, useContext } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [messages, setMessages] = useState([]);
  // const [isTyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  // const [thisPost, setThisPost] = useState({});
  // const [notifModalIsOpen, setNotifModalIsOpen] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
        messages,
        setMessages,
        // isTyping,
        // setIsTyping,
        socketConnected,
        setSocketConnected,
        // thisPost,
        // setThisPost,
        // notifModalIsOpen,
        // setNotifModalIsOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
