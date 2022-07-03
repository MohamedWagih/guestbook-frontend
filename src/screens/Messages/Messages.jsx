import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateMessage from './components/CreateMessage';
import Message from './components/Message';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function Messages() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const user = JSON.parse(localStorage.getItem('guestbook_user'));
    if (!user) navigate('/');
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
      <CreateMessage />
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
}

export default Messages;
