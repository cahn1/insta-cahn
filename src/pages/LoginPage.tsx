import { gql, useMutation } from '@apollo/client';
import {
  Badge,
  Blockquote,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

export function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading }] = useMutation(LOGIN, {
    onError: (error) => {
      alert('Oops, an error happened: ' + String(error));
    },
    onCompleted: (data) => {
      console.log('cahn data=', data);
      if (!data?.login || !data.login.token) {
        alert(`Invlaid login, Please try again.`);
      } else {
        // TODO: Write to the Browsers's sessionStorage (not localStorage)
        alert(`Login successful! token: ${data.login.token}`);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ variables: { username: userName, password: password } });
  };

  console.log('userName: ', userName, 'Password: ', password);

  return (
    <Center>
      <form onSubmit={handleSubmit}>
        <Stack
          h={800}
          w={600}
          spacing="sm"
          p="md"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          })}
        >
          <Title size="h3" ta="center" fz="xl">
            Login
          </Title>
          <Divider />
          <TextInput
            label="Username"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            withAsterisk
          />
          <PasswordInput
            placeholder="Enter password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            withAsterisk
          />
          <Button type="submit" loading={loading}>
            Login
          </Button>
          <Group position="center" spacing="xs">
            <Text c="dimmed">Don't have an account?</Text>
            <Link to="/signup">Sign up</Link>
          </Group>
        </Stack>
      </form>
    </Center>
  );
}
