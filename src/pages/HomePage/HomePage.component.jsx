import React from "react";

import "./HomePage.style.scss";

import { SideBar } from "../../partials";
import { CardList } from "../../components";

const HomePage = () => (
  <div className="homepage__container">
    <SideBar />
    <div className="homepage__content">
      <CardList />
    </div>
  </div>
);

export default HomePage;
