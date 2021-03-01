import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
//import Components
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
//import ui elements
import { Card, Icon, Label, Button } from "semantic-ui-react";

//realative imports
import MyPopup from "../utils/MyPopup";
//import Context
import { AuthContext } from "../context/auth";

function PostCard({
  post: {
    id,
    body,
    userName,
    createdAt,
    likes,
    comments,
    likeCount,
    commentCount,
  },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      {id ? (
        <>
          <Card.Content>
            <Card.Header>{userName}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>
              {moment(createdAt).fromNow(true)}
            </Card.Meta>
            <Card.Description>{body}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <LikeButton user={user} post={{ id, likes, likeCount }} />
            <MyPopup content="Comment on Post">
              <Button as="div" labelPosition="right">
                <Button color="blue" basic as={Link} to={`/posts/${id}`}>
                  <Icon name="comments" />
                </Button>
                <Label as="a" basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
            </MyPopup>
            {user && user.userName === userName && <DeleteButton postId={id} />}
          </Card.Content>
        </>
      ) : (
        <>
          <Card.Content>
            <Card.Header>Error</Card.Header>
            <Card.Description>Content Can not be Loaded.</Card.Description>
          </Card.Content>
        </>
      )}
    </Card>
  );
}

export default PostCard;
