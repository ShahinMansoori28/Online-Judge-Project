import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Problem from "./pages/Problem";
import Leaderboard from "./pages/Leaderboard";
import FirstRoute from "./pages/FirstRoute";
import api from "./api/baseURl";
import './App.css';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/explore/problems/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <BrowserRouter>
      <div  className="app">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<FirstRoute data={data} />} />
          <Route exact path="/problem/:id" element={<Problem />} />
          <Route exact path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
