import {
  Button,
  Loader,
  Stack,
  LoadingOverlay,
  AspectRatio,
  Group,
  Box,
  Image,
  Text,
} from '@mantine/core';
import { useSessionToken } from '../components/SessionTokenProvider';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useDisclosure } from '@mantine/hooks';
import { GetPosts, GetPosts_posts } from '../__generated__/GetPosts';
import { useMemo } from 'react';

export function HomePage() {
  const { sessionToken, setSessionToken } = useSessionToken();
  const [visible, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const GET_POSTS = gql`
    query GetPosts {
      posts {
        id
        photo
        caption
        isLikedByViewer
        likeCount
        commentCount
        author {
          id
          name
          profilePhoto
        }
      }
    }
  `;

  const { loading, error, data } = useQuery<GetPosts>(GET_POSTS);
  const posts: GetPosts_posts[] = useMemo(() => data?.posts, [data]);

  console.log('cahn sessionToken=', sessionToken);

  if (!sessionToken) {
    return <Navigate to="/login" />;
  }
  if (error) {
    return <p>Error: {String(error)}</p>;
  }
  if (loading) {
    return <Loader color="blue" />;
  }

  if (posts.length !== 0) {
    return (
      <Stack>
        {posts.map((post) => {
          return (
            <Box
              key={post.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '0px',
              }}
            >
              <Group>
                <img
                  src={post.author.profilePhoto}
                  alt={post.author.name}
                  width="50px"
                  height="50px"
                  style={{
                    borderRadius: '50%',
                    border: '1px solid #ccc',
                    padding: '5px',
                  }}
                />
                <p>{post.author.name}</p>
              </Group>
              <Link to={`/posts/${post.id}`}>
                <AspectRatio ratio={1} maw={400} mx="auto">
                  <img
                    src={post.photo}
                    alt={post.caption}
                    width="100%"
                    height="auto"
                    // style={{ cursor: 'pointer' }}
                    // onClick={() => navigate(`/posts/${post.id}`)}
                  />
                </AspectRatio>
              </Link>
              <Group>
                <Button
                  variant="outline"
                  color="blue"
                  onClick={() => {
                    toggle();
                  }}
                >
                  {post.isLikedByViewer ? 'Unlike' : 'Like'}
                </Button>
                <Button variant="outline" color="red">
                  Comment
                </Button>
              </Group>
              <Text>{post.likeCount} likes</Text>
              <Text c="dimmed">{post.caption}</Text>
              <Text>View {post.commentCount} comments</Text>
            </Box>
          );
        })}
      </Stack>
    );
  }
}
