import React from "react";
import "./styles.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Home } from "./pages/home"
import { Posts } from "./pages/posts";
import { Users } from "./pages/users";
import { Books } from "./pages/books";
import { Header } from "./components/Header"
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="layout">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/posts" exact>
            <Posts />
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/books" exact>
            <Books />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App
