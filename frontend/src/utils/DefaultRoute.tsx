import { useAppSelector } from "../store/store";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const DefaultRoute = () => {
  const tokenInfo = useAppSelector((state) => state.auth.tokenInfo);
  if (tokenInfo) {
    return <Navigate replace to={"/home"} />;
  }
  return <Outlet />;
};

export default DefaultRoute;
