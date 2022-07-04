import { Avatar, Box, Center, Flex, IconButton, Text } from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CreateReply from './CreateReply';
import Reply from './Reply';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function Message({ message }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('guestbook_user'));
    setUser(user);
  }, []);

  const deleteMessage = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`${apiEndpoint}/messages/${message._id}`, {
        headers: { 'x-auth-token': user.token },
      });
      navigate('/temp');
      navigate(-1);
    } catch (error) {
      console.log('🚀 ~ deleteMessage ~ error', error);
    } finally {
      setIsDeleting(false);
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
            {user && user.id === message.author._id && (
              <Center>
                <IconButton icon={<FiEdit3 />} />
                <IconButton
                  onClick={deleteMessage}
                  marginLeft={1}
                  colorScheme="red"
                  icon={<MdDeleteForever />}
                  isLoading={isDeleting}
                />
              </Center>
            )}
          </Flex>
          <Text>{message.content}</Text>
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
