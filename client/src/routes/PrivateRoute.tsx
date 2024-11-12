import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <>{element}</> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
