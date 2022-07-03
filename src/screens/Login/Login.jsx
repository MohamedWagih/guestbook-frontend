import { Box, Button, Center, Heading, Input, Stack } from '@chakra-ui/react';

function Login() {
  return (
    <Box w="100%">
      <Center>
        <Box w="50%" boxShadow="md" p="6" rounded="md" m="4">
          <Stack gap={4}>
            <Heading textAlign="center" as="h4" size="md">
              LOGIN
            </Heading>
            <Input placeholder="Email" size="md" />
            <Input placeholder="Password" type="password" size="md" />
            <Button>Login</Button>
          </Stack>
        </Box>
      </Center>
    </Box>
  );
}

export default Login;
