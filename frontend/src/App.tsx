import React from "react";
import LandingPage from "./pages/LandingPage";
import DraftTemplatePage from "./pages/DraftTemplatePage";
import PreviewDraftTemplatePage from "./pages/PreviewDraftTemplatePage";
import PreviewPendingTemplatePage from "./pages/PreviewPendingTemplatePage";
import PreviewRejectedTemplatePage from "./pages/PreviewRejectedTemplatePage";
import InputDialog from "./components/InputDialog";
import SignInLayout from "./components/SignIn/SignInLayout";
import SignUpLayout from "./components/SignUp/SignUpLayout";
import DraftListPage from "./pages/DraftListPage";
import PendingListPage from "./pages/PendingListPage";
import ProtectedRoute from "./components/utils/ProtectedRoute";
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
          <Route
            path="/signup"
            element={user ? <Navigate replace to={"/"} /> : <SignUpLayout />}
          ></Route>
          <Route
            path="/signin"
            element={user ? <Navigate replace to={"/"} /> : <SignInLayout />}
          ></Route>

          <Route element={<ProtectedRoute/>} >
            <Route
              path="/template/draft"
              element={<Navigate replace to={`/template/draft/${uuidV4()}`} />}
            />
            <Route
              path="/template/draft/preview"
              element={<DraftListPage />}
            ></Route>
            <Route
              path="/template/draft/preview/:id"
              element={<PreviewDraftTemplatePage  />}
            ></Route>
            <Route
              path="/template/draft/:id"
              element={<DraftTemplatePage />}
            ></Route>
            <Route
              path="/template/pending"
              element={<PendingListPage />}
            ></Route>
            <Route
              path="/template/pending/:id"
              element={<PreviewPendingTemplatePage />}
            ></Route>
            <Route
              path="/template/rejected"
              element={<DraftListPage />}
            ></Route>
            <Route
              path="/template/rejected/:id"
              element={<PreviewRejectedTemplatePage />}
            ></Route>
          </Route>

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
