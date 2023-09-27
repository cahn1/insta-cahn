import { MantineProvider } from '@mantine/core';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Center } from '@mantine/core';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

const client = new ApolloClient({
  uri: 'https://insta.web-api.dev/graphql',
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          {/* <Center maw={1000} h={300} mx="auto"> */}
          <Routes location={'/login'}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          {/* </Center> */}
        </BrowserRouter>
      </MantineProvider>
    </ApolloProvider>
  );
}
