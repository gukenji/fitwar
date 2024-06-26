import { useAppSelector } from "../store/store";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const tokenInfo = useAppSelector((state) => state.auth.tokenInfo);
  if (!tokenInfo) {
    return <Navigate replace to={"/login"} />;
  }
  return <Outlet />;
};

export default PrivateRoute;
