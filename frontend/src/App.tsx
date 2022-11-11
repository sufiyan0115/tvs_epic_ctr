import React from "react";
import LandingPage from "./pages/LandingPage";
import DraftTemplatePage from "./pages/DraftTemplatePage";
import PreviewTemplatePage from "./pages/PreviewTemplatePage";
import InputDialog from "./components/InputDialog";
import SignInLayout from "./components/SignIn/SignInLayout";
import SignUpLayout from "./components/SignUp/SignUpLayout";
import DraftListPage from "./pages/DraftListPage";
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
          <Route path="/signup" element={<SignUpLayout />}></Route>
          <Route
            path="/signin"
            element={user ? <Navigate replace to={"/"} /> : <SignInLayout />}
          ></Route>

          <Route
            path="/template/draft"
            element={
              user ? (
                <Navigate replace to={`/template/draft/${uuidV4()}`} />
              ) : (
                <SignInLayout />
              )
            }
          ></Route>
          <Route
            path="/template/draft/view"
            element={
              user ? (
                <DraftListPage></DraftListPage>
              ) : (
                <SignInLayout />
              )
            }
          ></Route>

          <Route
            path="/template/draft/:id"
            element={user ? <DraftTemplatePage /> : <SignInLayout />}
          ></Route>
          <Route
            path="/template/preview/:id"
            element={<PreviewTemplatePage />}
          ></Route>
          <Route path="/input-dialog" element={<InputDialog />}></Route>

          <Route path="*" element={<LandingPage></LandingPage>}></Route>
        </Routes>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
export default App;
