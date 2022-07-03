import { Box, Button, Center, Heading, Input, Skeleton, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    console.log('🚀 ~ Signup ~ formData', formData);
    const { email, password } = formData;
    // TODO:: Client side validation

    try {
      setIsLoading(true);
      const res = await axios.post(`${apiEndpoint}/users/signin`, { email, password });
      console.log('🚀 ~ handleSubmit ~ res', res.headers['x-auth-token']);

      const token = res.headers['x-auth-token'];
      const user = { ...res.data.data, token };
      localStorage.setItem('guestbook_user', JSON.stringify(user));

      toast({
        title: 'Logged In.',
        description: 'You are logged in successfully!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      navigate('/messages');
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

  const handleChange = (event) => {
    setError(null);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <Box w="100%">
      <Center>
        <Box w="50%" boxShadow="md" p="6" rounded="md" m="4">
          <Skeleton isLoaded={!isLoading}>
            <Stack gap={4}>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Heading textAlign="center" as="h4" size="md">
                LOGIN
              </Heading>
              <Input name="email" onChange={handleChange} placeholder="Email" size="md" />
              <Input name="password" onChange={handleChange} placeholder="Password" type="password" size="md" />
              <Button onClick={handleSubmit} isLoading={isLoading}>
                Login
              </Button>
            </Stack>
          </Skeleton>
        </Box>
      </Center>
    </Box>
  );
}

export default Login;
