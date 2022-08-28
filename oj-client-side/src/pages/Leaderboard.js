import React, { useEffect, useState } from "react";
import Showtable from "../components/questions/Showtable";
import api from "../api/baseURl";

const LeaderBoard = () => {
    const [job, setJob] = useState([]);
    useEffect(() => {
        api
            .get(`/explore/problems/leaderboard`)
            .then((res) => {
                //console.log("language : ", res.data[0].language);
                setJob(res.data);
            })
            .catch((err) => {
                console.log("error : ", err);
            });
    }, []);

    return <Showtable data={job} />
}

export default LeaderBoard
