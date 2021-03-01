import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import MyPopup from "../utils/MyPopup";
//import semantic ui
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
//import query
import { FETCH_ALL_POSTS } from "../utils/graphql";
function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        // removing cache from local storage
        const data = proxy.readQuery({
          query: FETCH_ALL_POSTS,
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_ALL_POSTS });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <>
      <MyPopup content={commentId ? "Delete Comment" : "Delete Post"}>
        <Button
          basic
          as="div"
          color="blue"
          onClick={() => setConfirmOpen(true)}
          floated="right"
          size="small"
        >
          <Icon name="trash" style={{ margin: 0 }} size="small" />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        userName
        createdAt
        body
      }
      commentCount
    }
  }
`;
export default DeleteButton;
