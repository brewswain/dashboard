import React from "react";

import "./HomePage.style.scss";

import { SideBar } from "../../partials";
import { KanbanCardList } from "../../components";

const HomePage = () => {
  return (
    <div className="homepage__container">
      <SideBar />
      <div className="homepage__content">
        <KanbanCardList />
      </div>
    </div>
  );
};

export default HomePage;
