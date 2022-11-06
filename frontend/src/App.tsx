import React from "react";
import LandingPage from "./pages/LandingPage";
import DraftTemplatePage from "./pages/DraftTemplatePage";
import PreviewTemplatePage from "./pages/PreviewTemplatePage";
import InputDialog from "./components/InputDialog";
import { Route, Routes, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

const App = () => {

  
  return (
    <>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route
            path="/template/draft"
            element={<Navigate to={`/template/draft/${uuidV4()}`} />}
          ></Route>
          <Route path="/template/draft/:id" element={<DraftTemplatePage  />}></Route>
          <Route path="/template/preview/:id" element={<PreviewTemplatePage />}></Route>
          <Route path="/input-dialog" element={<InputDialog />}></Route>
        </Routes>
    </>
  );
};
export default App;
