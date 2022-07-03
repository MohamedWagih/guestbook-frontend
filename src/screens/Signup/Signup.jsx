import { Box, Button, Center, Heading, Input, Skeleton, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function Signup() {
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatedPassword: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('guestbook_user'));
    if (user) navigate('/messages');
  }, []);

  const handleSubmit = async () => {
    console.log('🚀 ~ Signup ~ formData', formData);
    const { name, email, password, repeatedPassword } = formData;
    // TODO:: Client side validation
    if (password !== repeatedPassword) {
      setError('Password must match!');
      return;
    }
    try {
      setIsLoading(true);
      await axios.post(`${apiEndpoint}/users/signup`, { name, email, password });
      toast({
        title: 'Account created.',
        description: "We've created your account for you!",
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error', error);
      if (error.response && error.response.data) {
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
              <Heading textAlign="center" as="h4" size="md">
                SIGNUP
              </Heading>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" size="md" />
              <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" size="md" />
              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
                size="md"
              />
              <Input
                name="repeatedPassword"
                value={formData.repeatedPassword}
                onChange={handleChange}
                placeholder="Repeat Password"
                type="password"
                size="md"
              />
              <Button onClick={handleSubmit} isLoading={isLoading}>
                SIGN UP
              </Button>
              <Text textAlign="center">
                Already have an account!{' '}
                <Link to="/" style={{ color: 'blue' }}>
                  login
                </Link>
              </Text>
            </Stack>
          </Skeleton>
        </Box>
      </Center>
    </Box>
  );
}

export default Signup;
