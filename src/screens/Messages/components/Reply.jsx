import { Avatar, Box, Center, Stack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Reply({ reply }) {
  return (
    <Box p="6" bg="gray.100">
      <Stack direction="row" gap={4}>
        <Avatar name={reply.author.name} />
        <Stack>
          <Center>
            <Text fontSize="lg">{reply.author.name}</Text>
          </Center>
          <Text>{reply.content}</Text>
        </Stack>
      </Stack>
    </Box>
  );
}

Reply.propTypes = {
  reply: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default Reply;
