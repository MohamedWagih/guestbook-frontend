import {
  Avatar,
  Box,
  Center,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateReply from './CreateReply';
import EditableControls from './EditableControls';
import Reply from './Reply';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function Message({ message }) {
  const navigate = useNavigate();
  const toast = useToast();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageContent, setMessageContent] = useState(message.content || '');
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('guestbook_user'));
    setUser(user);
  }, []);

  const handleEditableChange = (value) => {
    setMessageContent(value);
    setError(null);
  };

  const editMessage = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `${apiEndpoint}/messages/${message._id}`,
        {
          content: messageContent,
        },
        {
          headers: { 'x-auth-token': user.token },
        },
      );
      toast({
        title: 'Message Edit Successfully!',
        description: 'Message Edited successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // navigate('/temp');
      // navigate(-1);
    } catch (error) {
      console.log('🚀 ~ editMessage ~ error', error);
      if (error.response && error.response.data) {
        toast({
          title: 'Message Edit Error',
          description: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setError(error.response.data.message);
      } else {
        toast({
          title: 'Message Delete Error',
          description: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setError('Network error!');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMessage = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${apiEndpoint}/messages/${message._id}`, {
        headers: { 'x-auth-token': user.token },
      });
      navigate('/temp');
      navigate(-1);
    } catch (error) {
      console.log('🚀 ~ deleteMessage ~ error', error);
      if (error.response && error.response.data) {
        toast({
          title: 'Message Delete Error',
          description: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else
        toast({
          title: 'Message Delete Error',
          description: 'Network error!',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box boxShadow="md" p="6" rounded="md" m="4" bg="gray.300">
      <Flex direction="row" gap={4}>
        <Avatar name={message.author.name} />
        <Flex flexDir="column" flex="1">
          <Flex flexDirection="row" justifyContent="space-between">
            <Center>
              <Text fontSize="lg">{message.author.name}</Text>
            </Center>
            <Center>
              <Text fontSize="xs">{message.date}</Text>
            </Center>
          </Flex>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Box marginTop={2} marginBottom={2}>
            <Editable
              textAlign="left"
              value={messageContent}
              onChange={handleEditableChange}
              fontSize="md"
              isPreviewFocusable={false}>
              <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                <EditablePreview />
                <EditableTextarea py={2} px={4} bg="white" />
                {user && user.id === message.author._id && (
                  <EditableControls isLoading={isLoading} deleteMessage={deleteMessage} editMessage={editMessage} />
                )}
              </Flex>
            </Editable>
          </Box>

          <Box bg="gray.500">
            <CreateReply messageId={message._id} />
            {message.replies.map((reply) => (
              <Reply key={reply._id} reply={reply} />
            ))}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        content: PropTypes.string,
        author: PropTypes.shape({
          _id: PropTypes.string,
          name: PropTypes.string,
          email: PropTypes.string,
        }),
      }),
    ),
  }),
};

export default Message;
