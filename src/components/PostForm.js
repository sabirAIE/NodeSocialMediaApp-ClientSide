import gql from "graphql-tag";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";

import { useMutation } from "@apollo/react-hooks";

//imoprt Graph ql
import { FETCH_ALL_POSTS } from "../utils/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: values,

    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_ALL_POSTS,
      });
      data.getPosts = [...data.getPosts, result.data.createPost];
      proxy.writeQuery({ query: FETCH_ALL_POSTS, data });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h4>Create New Post</h4>
      <Form.Field>
        <Form.Input
          placeholder="What's in your Mind"
          name="body"
          onChange={onChange}
          value={values.body}
        />
        <Button type="submit" color="blue">
          Post
        </Button>
      </Form.Field>
    </Form>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      userName
      comments {
        id
        body
        userName
        userName
      }
      likes {
        userName
      }
      likeCount
      commentCount
    }
  }
`;
export default PostForm;
