import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

//import context
import { AuthContext } from "../context/auth";
//import Styles
import { Grid } from "semantic-ui-react";

//imoprt Graph ql
import { FETCH_ALL_POSTS } from "../utils/graphql";

//import components
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_ALL_POSTS);

  return (
    <Grid columns="three">
      <div className="page-title">
        <h4>Recent Posts</h4>
      </div>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h4>Loading Posts...</h4>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
