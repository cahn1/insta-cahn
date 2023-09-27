import { Button, Stack, TextInput } from '@mantine/core';

export function LoginPage() {
  return (
    <div>
      <Stack
        h={300}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        })}
      >
        <TextInput placeholder="Enter username" label="Username" withAsterisk />
        <TextInput
          type="password"
          placeholder="Enter password"
          label="Password"
          withAsterisk
        />
      </Stack>
    </div>
  );
}
