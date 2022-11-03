import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LandingPage from "./pages/LandingPage";
import DraftTemplatePage from "./pages/DraftTemplatePage";
import InputDialog from "./components/InputDialog";
import { Route, Routes, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

const App = () => {
  // useEffect(()=>{
  //   const s = io("http://localhost:3000");

  //   return ()=>{
  //     s.disconnect()
  //   }

  // },[])

  return (
    <>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route
            path="/template"
            element={<Navigate to={`/template/${uuidV4()}`} />}
          ></Route>
          <Route path="/template/:id" element={<DraftTemplatePage />}></Route>
          <Route path="/input-dialog" element={<InputDialog />}></Route>
        </Routes>
    </>
  );
};
export default App;
