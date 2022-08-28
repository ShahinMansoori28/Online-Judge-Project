import React from "react";
import Slash from "../components/questions/Slash";
import classes from './FirstRoute.module.css'
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

function FirstRoute(props) {
  const { data } = props;
  const [filteredData, setFilteredData] = useState(data);

  const [easy, setEasy] = useState(false);
  const [medium, setMedium] = useState(false);
  const [hard, setHard] = useState(false);

  useEffect(() => {
    if (!easy && !medium && !hard) {
      setFilteredData(data);
      return;
    }
    setFilteredData(data.filter(element => {
      if (
        (easy && element.difficulty === 'Easy') ||
        (medium && element.difficulty === 'Medium') ||
        (hard && element.difficulty === 'Hard')
      ) return true;
      return false;
    }))
  }, [easy, medium, hard, data]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.prblms}>
        {filteredData.map((question) => (
          <Slash
            key={question._id}
            name={question.name}
            difficulty={question.difficulty}
            id={question._id}
            noOfSubmissions={question.noOfSubmissions}
            noOfSuccess={question.noOfSuccess}
          />
        ))}
      </div>
      <div className={classes.filterCover}>
        <div className={classes.filter}>
          <div className={classes.fHead}>
            <span>difficulty</span>
          </div>
          <div className={classes.cb}>
            <FormGroup>
              <FormControlLabel control={<Checkbox onChange={() => { setEasy(prev => !prev) }} checked={easy} />} label="Easy" />
              <FormControlLabel control={<Checkbox onChange={() => { setMedium(prev => !prev) }} checked={medium} />} label="Medium" />
              <FormControlLabel control={<Checkbox onChange={() => { setHard(prev => !prev) }} checked={hard} />} label="Hard" />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstRoute;
