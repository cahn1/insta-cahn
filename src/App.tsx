import { MantineProvider } from '@mantine/core';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Center } from '@mantine/core';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SessionTokenProvider } from './components/SessionTokenProvider';
import { PostDetailsPage } from './pages/PostDetailsPage';

const client = new ApolloClient({
  uri: 'https://insta.web-api.dev/graphql',
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <SessionTokenProvider>
          <BrowserRouter>
            {/* <Center maw={1000} h={300} mx="auto"> */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts/:id" element={<PostDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<p>404 Not Found</p>} />
            </Routes>
            {/* </Center> */}
          </BrowserRouter>
        </SessionTokenProvider>
      </MantineProvider>
    </ApolloProvider>
  );
}
