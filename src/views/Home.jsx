import React, { useState } from "react";
import HomeHead from "../components/HomeHead";
import _ from "../assets/utils";

const Home = () => {
  const [today, setToday] = useState(_.formatTime(null, "{0}{1}{2}"));

  return (
    <div className="home-box">
      {/* 头部 */}
      <HomeHead today={today} />
    </div>
  );
};

export default Home;
