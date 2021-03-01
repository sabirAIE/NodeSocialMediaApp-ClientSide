import React from "react";
import { BrowserRouter as Router, Rout, Route } from "react-router-dom";

import { AuthProvider } from "./context/auth";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

//components
import MenuBar from "./components/Menu";

//import custome Routes
import AuthRouter from "./utils/authRoute";
//import settings
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="ui container">
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRouter exact path="/login" component={Login} />
          <AuthRouter exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
