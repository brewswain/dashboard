import React from "react";
import { Switch, Route } from "react-router-dom";

import "./HomePage.style.scss";

import { SideBar } from "../../partials";
import { KanbanCardList, NotePad } from "../../components";

const HomePage = (currentUser) => {
  return (
    <div className="homepage__container">
      <SideBar />
      <Switch>
        <div className="homepage__content">
          <Route exact path="/" component={KanbanCardList} />
          <Route path="/notes" component={NotePad} />
        </div>
      </Switch>
    </div>
  );
};

export default HomePage;
