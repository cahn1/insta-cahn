import { gql, useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { GetPostDetail } from '../__generated__/GetPostDetail';
import { useSessionToken } from '../components/SessionTokenProvider';
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
  Divider,
} from '@mantine/core';
import { useMemo } from 'react';
import { useDisclosure } from '@mantine/hooks';

export function PostDetailsPage() {
  const { sessionToken, setSessionToken } = useSessionToken();
  const [visible, { toggle }] = useDisclosure(false);
  const params = useParams();
  console.log('cahn params=', params);

  const GET_POST_DETAIL = gql`
    query GetPostDetail($postId: String!) {
      post(id: $postId) {
        id
        author {
          id
          name
          profilePhoto
          username
        }
        photo
        caption
        isLikedByViewer
        likeCount
        comments {
          id
          author {
            id
            name
            profilePhoto
          }
          text
          createdAt
        }
      }
    }
  `;

  const { loading, error, data } = useQuery<GetPostDetail>(GET_POST_DETAIL, {
    variables: {
      postId: params.id,
    },
  });
  const post = useMemo(() => data?.post, [data]);

  if (!sessionToken) {
    return <Navigate to="/login" />;
  }
  if (error) {
    return <p>Error: {String(error)}</p>;
  }
  if (loading) {
    return <Loader color="blue" />;
  }

  if (post) {
    return (
      <Stack>
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
          <AspectRatio ratio={1} maw={400} mx="auto">
            <img
              src={post.photo}
              alt={post.caption}
              width="100%"
              height="auto"
            />
          </AspectRatio>
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
        </Box>
        <Divider />
        <Text>Comments ({post.comments.length})</Text>
        {post.comments.map((comment) => {
          return (
            <Box
              key={comment.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '0px',
              }}
            >
              <Group>
                <img
                  src={comment.author.profilePhoto}
                  alt={comment.author.name}
                  width="50px"
                  height="50px"
                  style={{
                    borderRadius: '50%',
                    border: '1px solid #ccc',
                    padding: '5px',
                  }}
                />
                <Text>{comment.author.name}</Text>
                <Text c="dimmed">{comment.text}</Text>
              </Group>
              <Text c="dimmed">{comment.createdAt}</Text>
            </Box>
          );
        })}
      </Stack>
    );
  }
}
