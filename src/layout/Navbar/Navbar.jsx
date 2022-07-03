import { Box, Heading } from '@chakra-ui/react';

function Navbar() {
  return (
    <Box bg="gray" p={4} color="white">
      <Heading m={0} as="h4" size="md">
        Guestbook
      </Heading>
    </Box>
  );
}

export default Navbar;
