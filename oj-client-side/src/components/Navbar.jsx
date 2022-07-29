import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (<div>
    <div>
      <h1> Online Judge {":)"} </h1>
    </div>
    <div>
      <Link to={`/leaderboard`}>LeaderBoard</Link>
    </div>
  </div>);
}

export default Navbar;
