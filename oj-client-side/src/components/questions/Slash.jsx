import React from "react";
import { Link } from "react-router-dom";

function Slash(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <h2>{props.difficulty}</h2>
      <div>
        <h3>Submitions : {props.noOfSubmissions}</h3>
      </div>
      <div>
        <h3>Success : {props.noOfSuccess}</h3>
      </div>
      <div>
        <Link to={`/problem/${props.id}`}>Solve</Link>
      </div>
    </div>
  );
}

export default Slash;
