import axios from 'axios';
import { useEffect, useState } from 'react';
import Message from './components/Message';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function Messages() {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const user = JSON.parse(localStorage.getItem('guestbook_user'));
    console.log('🚀 ~ Messages ~ user', user);
    const res = await axios.get(`${apiEndpoint}/messages`, {
      headers: { 'x-auth-token': user.token },
    });
    setMessages(res.data.data.messages);
  };
  useEffect(() => {
    getMessages();
  }, []);
  return (
    <div>
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
}

export default Messages;
