import { Box, Button, Skeleton, Stack, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function CreateMessage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem('guestbook_user'));
      await axios.post(
        `${apiEndpoint}/messages`,
        { content: message },
        {
          headers: { 'x-auth-token': user.token },
        },
      );
      toast({
        title: 'Submitted',
        description: 'You message submitted successfully!',
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
    <Box boxShadow="md" p="6" rounded="md" m="4">
      <Skeleton isLoaded={!isLoading}>
        <Stack gap={4}>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Textarea name="message" onChange={handleChange} placeholder="Write your message" size="md" />
          <Button onClick={handleSubmit} isLoading={isLoading}>
            POST
          </Button>
        </Stack>
      </Skeleton>
    </Box>
  );
}

export default CreateMessage;
