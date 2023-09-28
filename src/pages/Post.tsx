import { AspectRatio, Box, Button, Group, Text } from '@mantine/core';
import { GetPostDetail_post } from '../__generated__/GetPostDetail';
import { useDisclosure, useToggle } from '@mantine/hooks';
import { GetPosts_posts } from '../__generated__/GetPosts';

type PostProps = {
  post: GetPosts_posts | GetPostDetail_post;
};

export const Post = (props: PostProps) => {
  const [visible, { toggle }] = useDisclosure(false);
  const { post } = props;

  if (!post) {
    return null;
  }
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
      <AspectRatio ratio={1} maw={400} mx="auto">
        <img src={post.photo} alt={post.caption} width="100%" height="auto" />
      </AspectRatio>
      <Group>
        {post.isLikedByViewer ? '❤️' : '🤍'}
        <Button variant="outline" color="red">
          Comment
        </Button>
      </Group>
      <Text>{post.likeCount} likes</Text>
      <Text c="dimmed">{post.caption}</Text>
    </Box>
  );
};
