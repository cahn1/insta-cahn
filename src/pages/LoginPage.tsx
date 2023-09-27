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
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div>
      <Center>
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
            withAsterisk
          />
          <PasswordInput
            placeholder="Enter password"
            label="Password"
            withAsterisk
          />
          <Button>Login</Button>
          <Group position="center" spacing="xs">
            <Text c="dimmed">Don't have an account?</Text>
            <Link to="/signup">Sign up</Link>
          </Group>
        </Stack>
      </Center>
    </div>
  );
}
