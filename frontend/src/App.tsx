import React from "react";
import LandingPage from "./pages/LandingPage";
import DraftTemplatePage from "./pages/DraftTemplatePage";
import PreviewTemplatePage from "./pages/PreviewTemplatePage";
import Signup from "./components/Register/Signup";
import InputDialog from "./components/InputDialog";
import { Route, Routes, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { user, tokenChecking } = useAuth();
  return (
    <>
      {!tokenChecking ? (
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/template/draft"
            element={<Navigate replace to={`/template/draft/${uuidV4()}`} />}
          ></Route>
          <Route
            path="/template/draft/:id"
            element={<DraftTemplatePage />}
          ></Route>
          <Route
            path="/template/preview/:id"
            element={<PreviewTemplatePage />}
          ></Route>
          <Route path="/input-dialog" element={<InputDialog />}></Route>
          <Route path="*" element={<div>Not logged in </div>}></Route>
        </Routes>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
export default App;
