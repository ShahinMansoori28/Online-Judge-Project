import React, { Fragment, useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import CodeEditor from "../CodeEditor";
import api from "../../api/baseURl";
import stubs from "./defaultStubbs";
import moment from "moment";
import classes from './Question.module.css'
import Loader from "../Loader/Loader";
import { useRef } from "react";

const RenderSubmittedTime = ({ jobDetails }) => {
    if (!jobDetails) {
        return "";
    }
    let { submittedAt } = jobDetails;
    submittedAt = moment(new Date(submittedAt)).toString();
    return (<div><span>Submitted At:</span> {submittedAt}</div>);
}

const RenderExecutionTime = ({ jobDetails }) => {
    if (!jobDetails) {
        return "";
    }
    let { startedAt, completedAt } = jobDetails;
    if (!completedAt || !startedAt) {
        return "";
    }
    const start = moment(new Date(startedAt));
    const end = moment(new Date(completedAt));
    const executionTime = end.diff(start, "seconds", true);
    return (<div><span>Execution Time:</span> {executionTime} s</div>);
}

function Question(props) {
    const { data, id } = props;
    const [response, setResponse] = useState({});
    const [language, setLanguage] = useState("cpp");
    const [answer, setAnswer] = useState(false);
    const [status, setStatus] = useState("");
    const [jobId, setJobId] = useState("");
    const [jobDetails, setJobDetails] = useState(null);
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        setCode(stubs[language]);
    }, [language]);

    // const renderTimeDetails = () => {
    //     if (!jobDetails) {
    //         return "";
    //     }
    //     let result = "";
    //     let { submittedAt, startedAt, completedAt } = jobDetails;
    //     submittedAt = moment(new Date(submittedAt)).toString();
    //     result += `Submitted At: ${submittedAt}`;
    //     if (!completedAt || !startedAt) {
    //         return result;
    //     }
    //     const start = moment(new Date(startedAt));
    //     const end = moment(new Date(completedAt));
    //     const executionTime = end.diff(start, "seconds", true);
    //     result += `
    // Execution Time: ${executionTime}`;
    //     return result;
    // };


    //const navigate = useNavigate();

    function submitHandler() {
        if (isLoading) return;
        setIsLoading(true);
        setJobId("");
        setStatus("");
        setResponse("");
        setJobDetails("");
        console.log(code);
        api
            .post(`/explore/problems/${id}/verdict`, {
                code,
                testCasesFile: data.testCasesFile,
                language,
            })
            .then((res) => {
                const { data } = res;
                console.log("res : ", res);
                setResponse(data);
                console.log("response: ", response);
                setStatus("pending");
                setJobId(data.jobId);
                console.log(jobId);
                setAnswer(true);
                let intervalId;

                intervalId = setInterval(async () => {
                    const { data: dataRes } = await api.get("/explore/problems/status", {
                        params: { id: data.jobId },
                    });
                    const { success, job, error } = dataRes;
                    console.log("Data res :  ", dataRes);

                    if (success) {
                        const { status: jobStatus, output: jobOutput } = job;
                        if (jobStatus === "pending") return;
                        setStatus(jobStatus);
                        console.log(status);
                        setResponse(JSON.parse(jobOutput));
                        setJobDetails(job);
                        clearInterval(intervalId);
                        setIsLoading(false);
                    } else {
                        setStatus("Error: Please retry!");
                        console.error(error);
                        clearInterval(intervalId);
                        setIsLoading(false);
                    }
                }, 1000);

                ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch((err) => {
                console.log(err.response.data);
                setResponse(err.response.data);
                setAnswer(true);
            });

    }

    return (
        <Fragment>
            <div style={{ display: "flex", paddingBottom: '7rem' }}>
                <div style={{ width: "50%", marginRight: "2rem" }}>
                    {/* <button onClick={() => navigate(-1)}>Back</button> */}
                    <div className={classes.heading}>
                        <div className={classes.name}>{data.name}</div>
                        <div className={classes.underName}>
                            <div className={classes.une} diff={data.difficulty}>{data.difficulty}</div>
                            <div className={classes.une}>Submitions : {data.noOfSubmissions}</div>
                            {data.noOfSubmissions !== 0 ?
                                <div className={classes.une}>Success : {((data.noOfSuccess / data.noOfSubmissions) * 100).toFixed(2)}</div>
                                : <div className={classes.une}>Success : {data.noOfSuccess}</div>
                            }
                        </div>
                    </div>
                    <p className={classes.p}>{data.description}</p>
                    <div className={classes.example}>
                        {data.example.map((ex, index) => (
                            <Fragment key={index}>
                                <h3 className={classes.name + ' ' + classes.ex}>Example {index + 1}</h3>
                                <div><span>Input : </span>{ex.input}</div>
                                <div><span>Output : </span>{ex.output}</div>
                                <div>{ex.explaination}</div>
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div style={{ width: "50%" }}>
                    <div>
                        <div className={classes.sel}>
                            <label>Language : </label>
                            <select
                                value={language}
                                onChange={(e) => {
                                    let res = window.confirm(
                                        "WARNING: Switching the language, will remove your code"
                                    );
                                    if (res) {
                                        setLanguage(e.target.value);
                                    }
                                }}
                            >
                                <option value="cpp">C++</option>
                                <option value="py">Python</option>
                            </select>
                        </div>
                        <CodeEditor code={code} setCode={setCode} />
                        <button className={classes.sbtn + ' ' + classes[(isLoading && 'disabledbtn')]} onClick={submitHandler}>
                            {isLoading ? 'Submitting ...' : 'Submit'}
                        </button>
                    </div>

                    {answer && (
                        <div className={classes.res}>
                            <div>
                                {response.status && <div><span>Status : </span>{response.status}</div>}
                                {response.msg && <div><span>Message : </span>{response.msg}</div>}
                                {response.stderr && <div><span>Stderr : </span>{response.stderr}</div>}
                                {response.error && <div><span>Error : </span>{JSON.stringify(response.error)}</div>}
                                {response.input && <div><span>Input : </span>{response.input}</div>}
                                {response.output && <div><span>Output : </span>{response.output}</div>}
                                {response.yourOutput && <div><span>Your Code's Output : </span>{response.yourOutput}</div>}
                                <RenderExecutionTime jobDetails={jobDetails} />
                                <RenderSubmittedTime jobDetails={jobDetails} />
                            </div>
                        </div>
                    )}
                    {isLoading && <Loader />}
                </div>
            </div>
            <div aria-hidden ref={ref}></div>
        </Fragment>
    );
}

export default Question;
