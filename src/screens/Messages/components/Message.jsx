import { Avatar, Box, Center, Stack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Reply from './Reply';
function Message({ message }) {
  return (
    <Box boxShadow="md" p="6" rounded="md" m="4" bg="gray.300">
      <Stack direction="row" gap={4}>
        <Avatar name={message.author.name} />
        <Stack>
          <Stack direction="row">
            <Center>
              <Text fontSize="lg">{message.author.name}</Text>
            </Center>
            <Center>
              <Text fontSize="xs">{message.date}</Text>
            </Center>
          </Stack>
          <Text>{message.content}</Text>
          <Box marginLeft={4} bg="gray.500">
            {message.replies.map((reply) => (
              <Reply key={reply._id} reply={reply} />
            ))}
          </Box>
        </Stack>
      </Stack>
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
