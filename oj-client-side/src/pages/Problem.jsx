import Question from "../components/questions/Question";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/baseURl";

function Problem() {
    const { id } = useParams();
    const [ques, setQues] = useState({});
    useEffect(() => {
        api
            .get(`/explore/problems/${id}`)
            .then((res) => {
                setQues(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return ques._id ? (
        <Question key={ques._id} data={ques} id={id} />
    ) : (
        <h3>Loading...</h3>
    );
}

export default Problem;
