import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeEditor from "../CodeEditor";
import api from "../../api/baseURl";
import stubs from "./defaultStubbs";
import moment from "moment";
//import axios from "axios";

function Question(props) {
  const { data, id } = props;
  const [response, setResponse] = useState({});
  const [language, setLanguage] = useState("cpp");
  const [answer, setAnswer] = useState(false);
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  const renderTimeDetails = () => {
    //console.log("renderTimeDetails");
    if (!jobDetails) {
      return "";
    }
    let result = "";
    let { submittedAt, startedAt, completedAt } = jobDetails;
    submittedAt = moment(new Date(submittedAt)).toString();
    result += `Submitted At: ${submittedAt}`;
    if (!completedAt || !startedAt) {
      return result;
    }
    const start = moment(new Date(startedAt));
    const end = moment(new Date(completedAt));
    const executionTime = end.diff(start, "seconds", true);
    result += `
    Execution Time: ${executionTime}`;
    return result;
  };

  const navigate = useNavigate();

  function submitHandler() {
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
            setResponse(JSON.parse(jobOutput));
            setJobDetails(job);
            clearInterval(intervalId);
          } else {
            setStatus("Error: Please retry!");
            console.error(error);
            clearInterval(intervalId);
          }

          //console.log(JSON.parse(job.output));
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response.data);
        setResponse(err.response.data);
        setAnswer(true);
      });
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%", marginRight: "2rem" }}>
        <button onClick={() => navigate(-1)}>Back</button>
        <h1>{data.name}</h1>
        <h2>{data.difficulty}</h2>
        <p>{data.description}</p>
        <div>
          <h2>Example 1</h2>
          <div>{data.example[0].input}</div>
          <div>{data.example[0].output}</div>
          <div>{data.example[0].explaination}</div>
        </div>
        <div>
          <h2>Example 2</h2>
          <div>{data.example[1].input}</div>
          <div>{data.example[1].output}</div>
          <div>{data.example[1].explaination}</div>
        </div>

        <div>
          <h3>Submitions : </h3>
          {data.noOfSubmissions}
        </div>
        <div>
          <h3>Success : </h3>
          {data.noOfSuccess}
        </div>
      </div>
      <div style={{ width: "50%" }}>
        <div>
          <label>Language : </label>
          <select
            value={language}
            onChange={(e) => {
              let res = window.confirm(
                "WARNING: Switchin the language, will remove your code"
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
        <br />
        <CodeEditor code={code} setCode={setCode} />
        <div>
          <button onClick={submitHandler}>Submit</button>
        </div>
        <br />
        {answer && (
          <div>
            <div>
              <p>{status}</p>
              <p>{jobId && `JobID:${jobId}`}</p>
              <p>{renderTimeDetails()}</p>
            </div>
            <div>
              {response.msg && <div>Message : {response.msg}</div>}
              {response.stderr && <div>stderr : {response.stderr}</div>}
              {response.error && <div>error : {response.error.code}</div> && (
                <div>error : {response.error.signal}</div>
              )}
              {response.input && <div>Input : {response.input}</div>}
              {response.output && <div>Output : {response.output}</div>}
              {response.yourOutput && (
                <div>your Code's Output : {response.yourOutput}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Question;
