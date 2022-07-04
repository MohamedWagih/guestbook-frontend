import { Box, Button, Input, Skeleton, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function CreateReply({ messageId }) {
  const toast = useToast();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState('');

  const handleChange = (event) => {
    setReply(event.target.value);
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem('guestbook_user'));
      await axios.post(
        `${apiEndpoint}/replies/${messageId}`,
        { content: reply },
        {
          headers: { 'x-auth-token': user.token },
        },
      );
      toast({
        title: 'Submitted',
        description: 'You reply submitted successfully!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      navigate('/temp');
      navigate(-1);
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error', error);
      if (error.response && error.response.data) {
        toast({
          title: 'Error',
          description: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setError(error.response.data.message);
      } else setError('Network error!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box p="6" bg="white">
      <Skeleton isLoaded={!isLoading}>
        <Stack gap={4}>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Input name="message" onChange={handleChange} placeholder="Write your reply" size="md" />
          <Button onClick={handleSubmit} isLoading={isLoading}>
            POST
          </Button>
        </Stack>
      </Skeleton>
    </Box>
  );
}

CreateReply.propTypes = {
  messageId: PropTypes.string,
};

export default CreateReply;
