import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Problem from "./pages/Problem";
import FirstRoute from "./pages/FirstRoute";
import api from "./api/baseURl";

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
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<FirstRoute data={data} />} />
          <Route exact path="/problem/:id" element={<Problem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
