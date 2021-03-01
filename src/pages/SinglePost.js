import React, { useRef, useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Card,
  Grid,
  Image,
  Icon,
  Label,
  Container,
  Form,
} from "semantic-ui-react";
import moment from "moment";

import MyPopup from "../utils/MyPopup";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  const postId = props.match.params.postId;
  const { data: { getPost } = {} } = useQuery(FETCH_ONE_POST, {
    variables: {
      postId,
    },
  });

  const [comment, setComment] = useState("");
  const [createComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  let postMarkup;
  function deletePostCallback() {
    props.history.push("/");
  }

  if (!getPost) {
    postMarkup = <p>Loading...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      userName,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                size="small"
                floated="right"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{userName}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton user={user} post={{ id, likes, likeCount }} />
                  <MyPopup content="Comment on Post">
                    <Button as="div" labelPosition="right">
                      <Button color="blue" basic>
                        <Icon name="comments" />
                      </Button>
                      <Label as="a" basic color="blue" pointing="left">
                        {commentCount}
                      </Label>
                    </Button>
                  </MyPopup>
                  {user && user.userName === userName && (
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  )}
                </Card.Content>
              </Card>

              {/* comment form */}

              {user && (
                <Card fluid>
                  <Card.Content>
                    <p>Write Comment</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          name="comment"
                          placeholder="comment..."
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          ref={commentInputRef}
                        />

                        <button
                          type="submit"
                          className="ui button blue"
                          disabled={comment.trim() === ""}
                          onClick={createComment}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}

              {/* loading all comments */}

              {comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.userName === comment.userName && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.userName}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  return postMarkup;
}

const FETCH_ONE_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      userName
      commentCount
      likeCount
      likes {
        userName
      }
      comments {
        id
        body
        userName
        createdAt
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      commentCount
      comments {
        id
        body
        createdAt
        userName
      }
    }
  }
`;
export default SinglePost;
