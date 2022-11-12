import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// We are taking in the component that should be rendered if the user is authed
// We are also passing the rest of the props to the <Route /> component such as
// exact & the path
const ProtectedRoute = (props:any) => {
  // Getting the value from our cool custom hook
  const { auth } = useAuth();
  console.log(auth);

  return auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
