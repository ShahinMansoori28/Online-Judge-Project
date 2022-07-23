import React from "react";
import Slash from "../components/questions/Slash";

function FirstRoute(props) {
  const { data } = props;
  return data.map((question) => (
    <Slash
      key={question._id}
      name={question.name}
      difficulty={question.difficulty}
      id={question._id}
      noOfSubmissions={question.noOfSubmissions}
      noOfSuccess={question.noOfSuccess}
    />
  ));
}

export default FirstRoute;
