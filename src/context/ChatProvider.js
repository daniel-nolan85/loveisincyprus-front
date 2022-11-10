import React, { useState, createContext, useContext } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  // const [thisPost, setThisPost] = useState({});
  // const [notifModalIsOpen, setNotifModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pointsQuestionsModalIsOpen, setPointsQuestionsModalIsOpen] =
    useState(false);
  const [newAds, setNewAds] = useState(0);
  const [newVerifs, setNewVerifs] = useState(0);
  const [chatUsers, setChatUsers] = useState([]);
  const [theirChats, setTheirChats] = useState([]);
  const [typersId, setTypersId] = useState('');
  const [theirId, setTheirId] = useState('');
  const [reportedContent, setReportedContent] = useState(0);

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
        isTyping,
        setIsTyping,
        socketConnected,
        setSocketConnected,
        // thisPost,
        // setThisPost,
        // notifModalIsOpen,
        // setNotifModalIsOpen,
        modalIsOpen,
        setModalIsOpen,
        pointsQuestionsModalIsOpen,
        setPointsQuestionsModalIsOpen,
        newAds,
        setNewAds,
        newVerifs,
        setNewVerifs,
        chatUsers,
        setChatUsers,
        theirChats,
        setTheirChats,
        typersId,
        setTypersId,
        theirId,
        setTheirId,
        reportedContent,
        setReportedContent,
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
