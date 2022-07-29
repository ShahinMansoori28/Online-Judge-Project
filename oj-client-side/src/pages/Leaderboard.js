import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Showtable from "../components/questions/Showtable";
import api from "../api/baseURl";

const LeaderBoard = () => {
    const [job, setJob] = useState([]);
    const navigate = useNavigate();
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

    return (
        <div>
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
            <div>
                <Showtable data={job} />
            </div>
        </div>
    )
}

export default LeaderBoard
