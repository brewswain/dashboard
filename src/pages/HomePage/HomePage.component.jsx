import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./HomePage.style.scss";

import { SideBar } from "../../partials";
import { KanbanCardList, NotePad } from "../../components";

const HomePage = (currentUser) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {isLoggedIn ? (
        <div className="homepage__container">
          <SideBar isLoggedIn={isLoggedIn} />
          <Switch>
            <div className="homepage__content">
              <Route exact path="/" component={KanbanCardList} />
              <Route path="/notes" component={NotePad} />
            </div>
          </Switch>
        </div>
      ) : (
        <Redirect to="/sign-in" />
      )}
    </>
  );
};

export default HomePage;
