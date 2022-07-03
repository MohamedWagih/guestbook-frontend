import { Avatar, Box, Center, Flex, Heading, IconButton, Spacer, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('guestbook_user'));
    if (user) setUser(user);
    else {
      setUser(null);
    }
  }, [localStorage.getItem('guestbook_user')]);

  const logout = () => {
    localStorage.removeItem('guestbook_user');
    navigate('/');
  };

  return (
    <Box bg="gray" p={4} color="white">
      <Flex>
        <Heading m={0} as="h4" size="md">
          Guestbook
        </Heading>
        <Spacer />
        {user && (
          <>
            <Stack direction="row" gap={1}>
              <Avatar size="sm" name={user.name} />

              <Center>
                <Text fontSize="lg">{user.name}</Text>
              </Center>
              <Center>
                <IconButton colorScheme="red" rightIcon={<FiLogOut />} onClick={logout} size="sm" />
              </Center>
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default Navbar;
